import { useState } from 'react';
import { CreateAgent } from '../api/api';

type TCreateAgent = {
  url: string;
  name: string;
  onAgentUpdate: () => void;
  onClose: () => void;
};

export const useCreateAgent = () => {
  const [url, setUrl] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [urlError, setUrlError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);

  const resetModal = () => {
    setUrl('');
    setName('');
    setUrlError(null);
    setNameError(null);
  };

  const createAgent = async ({
    url,
    name,
    onAgentUpdate,
    onClose
  }: TCreateAgent) => {
    if (!url.startsWith('ws://')) {
      setUrlError('Please provide a valid websocket URL');
      return;
    }
    if (!name) {
      setNameError('Please provide a name');
      return;
    }

    try {
      await CreateAgent.createAgent({ url, name });
      resetModal();

      setTimeout(() => {
        onAgentUpdate();
      }, 500);

      onClose();
    } catch (error) {
      setUrlError('Error creating agent, make sure the URL is correct.');
    }
  };

  return {
    url,
    name,
    urlError,
    nameError,
    setUrl,
    setName,
    createAgent,
    resetModal
  };
};
