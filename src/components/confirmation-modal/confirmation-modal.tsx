import { CancelButton, DangerButton } from '../buttons/Buttons';

type TConfirmationModalProps = {
  isOpen: boolean;
  title: string;
  modalText: string;
  confirmText: string;
  error?: boolean;
  errorMessage?: string | null;
  onClose: () => void;
  onConfirm: () => void;
};

export const ConfirmationModal = ({
  isOpen,
  title,
  modalText,
  confirmText,
  error,
  errorMessage,
  onClose,
  onConfirm
}: TConfirmationModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent w-full">
      <div className="bg-zinc-800 rounded-md p-8 border-2 border-zinc-700">
        <h2 className="text-2xl text-white">{title}</h2>
        <p className="text-white mt-4">{modalText}</p>
        {error && <p className="text-red-500 mt-4">{errorMessage}</p>}
        <div className="mt-8 flex justify-end gap-4">
          <CancelButton onClick={onClose} children="Cancel" />
          <DangerButton onClick={onConfirm} children={confirmText} />
        </div>
      </div>
    </div>
  );
};
