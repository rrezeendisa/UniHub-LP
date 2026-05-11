const GOOGLE_FORMS_URL =
  'https://docs.google.com/forms/d/14uMkbQr9VorZrOxxcA7ny_srsV0mEMt9cpa1exRKnTY/edit'

export function openFeedbackForm() {
  window.open(GOOGLE_FORMS_URL, '_blank', 'noopener,noreferrer')
}
