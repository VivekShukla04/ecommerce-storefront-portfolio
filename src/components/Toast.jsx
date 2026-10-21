import { useCart } from '../context/useCart';

export default function Toast() {
  const { toast, dismissToast } = useCart();
  if (!toast) return null;

  return (
    <div className="toast-region" role="status" aria-live="polite">
      <div key={toast.id} className={`toast toast--${toast.tone}`}>
        <span className="toast__icon" aria-hidden="true">
          {toast.tone === 'info' ? '›' : '✓'}
        </span>
        <span className="toast__message">{toast.message}</span>
        <button type="button" className="toast__close" onClick={dismissToast} aria-label="Dismiss">
          &times;
        </button>
      </div>
    </div>
  );
}
