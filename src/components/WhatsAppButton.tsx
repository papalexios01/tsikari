import { contact } from '@/data/content';
import { getLocale } from '@/lib/locale';

export default function WhatsAppButton() {
  const greek = getLocale() === 'el';
  const message = greek
    ? 'Γεια σας! Θα ήθελα πληροφορίες για διαμονή στο Αρχοντικό Τσικάρη.'
    : 'Hello! I would like to enquire about a stay at Archontiko Tsikari.';
  const url = contact.whatsapp + '?text=' + encodeURIComponent(message);

  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
       className="ts-wa" aria-label={greek ? 'Επικοινωνία μέσω WhatsApp' : 'Chat with Archontiko Tsikari on WhatsApp'}
       title={greek ? 'Μιλήστε μαζί μας στο WhatsApp' : 'Message us on WhatsApp'}>
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" fill="currentColor" width="29" height="29">
        <path d="M16.03 2.67A13.3 13.3 0 0 0 4.55 22.72L2.7 29.33l6.79-1.79A13.3 13.3 0 1 0 16.03 2.67Zm0 24.12a10.74 10.74 0 0 1-5.48-1.5l-.39-.23-4.02 1.06 1.07-3.92-.25-.4a10.8 10.8 0 1 1 9.07 4.99Zm5.92-8.1c-.33-.17-1.94-.96-2.24-1.07-.3-.11-.52-.17-.74.17-.22.33-.85 1.07-1.04 1.29-.2.22-.39.25-.72.09-.33-.17-1.4-.51-2.67-1.65-.98-.87-1.65-1.95-1.84-2.28-.2-.33-.02-.5.15-.66.15-.14.33-.39.5-.58.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.58-.08-.16-.74-1.79-1.01-2.45-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.57.09-.88.42-.3.33-1.16 1.14-1.16 2.77 0 1.63 1.19 3.2 1.36 3.42.16.22 2.34 3.57 5.67 5.01.79.34 1.41.54 1.9.69.8.25 1.53.21 2.11.13.65-.1 1.94-.8 2.21-1.57.28-.78.28-1.44.2-1.57-.09-.14-.3-.22-.63-.39Z"/>
      </svg>
      <span className="ts-wa__label">{greek ? 'WhatsApp' : 'WhatsApp'}</span>
    </a>
  );
}
