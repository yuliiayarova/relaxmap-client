export interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}
