import { useEffect, useRef, useState } from 'react';
import { useCreateAgent } from '../../hooks/use-create-agent';
import { CancelButton, PrimaryButton } from '../buttons/Buttons';
import { Input } from '../input/Input';
import Loader from '../loader/Loader';

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
  const [fadeIn, setFadeIn] = useState<number | ''>('');
  const [fadeOut, setFadeOut] = useState<number | ''>('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { url, name, loading, setUrl, setName, createAgent } = useCreateAgent();

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
    await createAgent({
      url,
      name,
      options: {
        fadeIn: fadeIn ? Number(fadeIn) : undefined,
        fadeOut: fadeOut ? Number(fadeOut) : undefined
      },
      onAgentUpdate,
      handleCloseModal
    });
  };

  const handleCloseModal = () => {
    onClose();
    setName('');
    setUrl('');
    setFadeIn('');
    setFadeOut('');
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
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
    } else if (key === 'fadeIn') {
      setFadeIn(Number(value));
    } else if (key === 'fadeOut') {
      setFadeOut(Number(value));
    }
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
              type="text"
              value={name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g. production name"
              ref={(el) => setInputRef(0, el)}
              onKeyDown={(e) => handleKeyDown(e, 0)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="text-white">WebSocket URL</h3>
            <Input
              type="text"
              value={url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              placeholder="URL starting with ws://"
              ref={(el) => setInputRef(1, el)}
              onKeyDown={(e) => handleKeyDown(e, 1)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="text-white">Fade In Value (ms)</h3>
            <Input
              type="number"
              value={fadeIn}
              onChange={(e) => handleInputChange('fadeIn', e.target.value)}
              placeholder="Enter fade in value"
              ref={(el) => setInputRef(2, el)}
              onKeyDown={(e) => handleKeyDown(e, 2)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="text-white">Fade Out Value (ms)</h3>
            <Input
              type="number"
              value={fadeOut}
              onChange={(e) => setFadeOut(Number(e.target.value))}
              placeholder="Enter fade out value"
              ref={(el) => setInputRef(3, el)}
              onKeyDown={(e) => handleKeyDown(e, 3)}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <CancelButton onClick={handleCloseModal}>Cancel</CancelButton>
          <PrimaryButton onClick={handleConnect}>
            {loading ? <Loader /> : 'Connect'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
