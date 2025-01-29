import { useEffect, useRef, useState } from 'react';
import { CreateAgent } from '../../api/api';
import { CancelButton, PrimaryButton } from '../buttons/Buttons';
import { Input } from '../input/Input';

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
  const [url, setUrl] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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
      setNameError('Please provide a name');
      setUrlError('Please provide a valid websocket URL');
      return;
    }

    if (!url.startsWith('ws://')) {
      setUrlError('Please provide a valid websocket URL');
      return;
    }

    if (!name) {
      setNameError('Please provide a name');
      return;
    }

    setNameError(null);
    setUrlError(null);

    try {
      await CreateAgent.createAgent({ url, name });
      setUrl('');
      setName('');

      // Timeout needed to allow the agent to connect before updating the list
      setTimeout(() => {
        onAgentUpdate();
      }, 500);

      onClose();
    } catch (error) {
      setUrlError('Error creating agent, make sure the URL is correct');
    }
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClose = () => {
    setNameError(null);
    setUrlError(null);
    onClose();
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
      if (nameError) {
        setNameError(null);
      }
      setName(value);
    } else if (key === 'url') {
      if (urlError) {
        setUrlError(null);
      }
      setUrl(value);
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
