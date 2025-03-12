import { CancelButton, DangerButton } from '../buttons/Buttons';
import Loader from '../loader/Loader';

type TConfirmationModalProps = {
  isOpen: boolean;
  title: string;
  modalText: string;
  confirmText: string;
  error?: boolean;
  errorMessage?: string | null;
  loading?: boolean;
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
  loading,
  onClose,
  onConfirm
}: TConfirmationModalProps) => {
  if (!isOpen) {
    return null;
  }

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-transparent w-full"
      onClick={handleClickOutside}
    >
      <div className="bg-zinc-800 rounded-md p-8 border-2 border-zinc-700">
        <h2 className="text-2xl text-white">{title}</h2>
        <p className="text-white mt-4">{modalText}</p>
        {error && <p className="text-red-500 mt-4">{errorMessage}</p>}
        <div className="mt-8 flex justify-end gap-4">
          <CancelButton onClick={onClose} children="Cancel" />
          <DangerButton onClick={onConfirm}>
            {loading ? <Loader /> : confirmText}
          </DangerButton>
        </div>
      </div>
    </div>
  );
};
