document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-event-inquiry]');
  if (!form) return;

  const name = form.elements.namedItem('name');
  const phone = form.elements.namedItem('phone');
  const message = form.elements.namedItem('message');
  const submit = form.querySelector('button[type="submit"]');
  const status = form.querySelector('[data-inquiry-status]');
  let pending = false;

  const validate = (field, valid, text) => {
    field.setCustomValidity(valid ? '' : text);
    field.setAttribute('aria-invalid', valid ? 'false' : 'true');
    const error = document.getElementById(field.getAttribute('aria-describedby'));
    error.textContent = valid ? '' : text;
    error.hidden = valid;
    return valid;
  };
  const validateName = () => validate(name, name.value.trim().length > 0, 'Please enter your full name.');
  const validatePhone = () => {
    const digits = phone.value.replace(/\D/g, '');
    return validate(phone, /^[+\d\s().-]+$/.test(phone.value.trim()) && digits.length >= 7 && digits.length <= 15,
      'Please enter a valid phone number, including the area code.');
  };
  name.addEventListener('input', validateName);
  phone.addEventListener('input', validatePhone);

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (pending) return;
    const nameValid = validateName();
    const phoneValid = validatePhone();
    if (!nameValid || !phoneValid || !form.reportValidity()) {
      form.reportValidity();
      return;
    }
    if (form.elements.namedItem('_honey').value) return;

    pending = true;
    submit.disabled = true;
    submit.textContent = 'Sending…';
    form.setAttribute('aria-busy', 'true');
    status.textContent = '';
    status.removeAttribute('data-state');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(form.dataset.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: name.value.trim(),
          phone: phone.value.trim(),
          message: message.value.trim(),
          _subject: 'Private event inquiry — Tarra & Sura',
          _template: 'table',
          _honey: ''
        }),
        signal: controller.signal
      });
      const result = await response.json();
      // HTTP 200 alone does not mean the service accepted the inquiry.
      if (!response.ok || ![true, 'true'].includes(result.success) || /activat|confirm.{0,20}email/i.test(result.message || '')) {
        throw new Error('Inquiry was not accepted');
      }
      form.reset();
      status.dataset.state = 'success';
      status.textContent = 'Thank you. We’ve received your inquiry and our team will be in touch shortly.';
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'private_event_inquiry', inquiry_type: 'private_events' });
    } catch {
      status.dataset.state = 'error';
      status.textContent = 'We couldn’t confirm your inquiry. Please try again or email events@tarrachicago.com. Your details are still here.';
    } finally {
      clearTimeout(timeout);
      pending = false;
      submit.disabled = false;
      submit.textContent = 'Send Inquiry';
      form.removeAttribute('aria-busy');
    }
  });
});
