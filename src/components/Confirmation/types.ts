export type ConfirmationType = 'info' | 'warning' | 'error' | 'success' | 'confirm';

export interface ConfirmationOptions {
  type: ConfirmationType;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}

export interface ConfirmationContextType {
  showConfirmation: (options: ConfirmationOptions) => Promise<boolean>;
  showSuccess: (message: string, title?: string) => void;
  showError: (message: string, title?: string) => void;
  showInfo: (message: string, title?: string) => void;
}