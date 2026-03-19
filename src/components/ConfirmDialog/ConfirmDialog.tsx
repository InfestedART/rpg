import './ConfirmDialog.css';
import Button from "../Button";

type ConfirmDialogProps = {
  isOpen: boolean
  title?: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmDialog = ({
  isOpen,
  title = 'Confirm Action',
  message,
  confirmLabel = 'Accept',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100">
      <div className="alert-container rounded-xl shadow-lg w-full max-w-sm p-6">
        
        <h2 className="alert-title text-lg font-semibold mb-2">{title}</h2>
        <p className="mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <Button
            onClick={onCancel}
            variant="primary"
          >
            {cancelLabel}
          </Button>

          <Button
            onClick={onConfirm}
            variant="danger"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;