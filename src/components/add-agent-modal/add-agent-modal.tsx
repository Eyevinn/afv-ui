import { useEffect, useRef, useState } from 'react';
import { CancelButton, PrimaryButton } from '../buttons/Buttons';
import { Input } from '../input/Input';
import { useCreateAgent } from '../../hooks/use-create-agent';

type AddAgentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAgentUpdate: () => void;
};

export const AddAgentModal = ({
  isOpen,
  onClose,
  onAgentUpdate
}: AddAgentModalProps) => {
  const [nameError, setNameError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { url, name, urlError, setUrl, setName, createAgent, resetModal } =
    useCreateAgent();

  const setInputRef = (index: number, el: HTMLInputElement | null) => {
    inputRefs.current[index] = el;
  };

  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleConnect = async () => {
    if (!url && !name) {
      return;
    }

    if (!url.startsWith('ws://')) {
      return;
    }

    if (!name) {
      return;
    }

    setNameError(null);

    await createAgent({
      url,
      name,
      onAgentUpdate,
      onClose
    });
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      } else {
        handleConnect();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const previousInput = inputRefs.current[index - 1];
      if (previousInput) {
        previousInput.focus();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleInputChange = (key: string, value: string) => {
    if (key === 'name') {
      setName(value);
    } else if (key === 'url') {
      setUrl(value);
    }
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-transparent"
      onClick={handleClickOutside}
    >
      <div className="bg-zinc-800 rounded-md p-6 w-full max-w-lg border-2 border-zinc-700">
        <h2 className="text-xl font-semibold text-white">Add Agent</h2>
        <div className="flex flex-col space-y-4 mt-4">
          <div className="flex flex-col space-y-2">
            <h3 className="text-white">Name</h3>
            <Input
              value={name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g. production name"
              error={!!nameError}
              ref={(el) => setInputRef(0, el)}
              onKeyDown={(e) => handleKeyDown(e, 0)}
            />
            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="text-white">WebSocket URL</h3>
            <Input
              value={url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              placeholder="URL starting with ws://"
              error={!!urlError}
              ref={(el) => setInputRef(1, el)}
              onKeyDown={(e) => handleKeyDown(e, 1)}
            />
            {urlError && <p className="text-red-500 text-sm">{urlError}</p>}
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <CancelButton onClick={handleClose}>Cancel</CancelButton>
          <PrimaryButton onClick={handleConnect}>Connect</PrimaryButton>
        </div>
      </div>
    </div>
  );
};
