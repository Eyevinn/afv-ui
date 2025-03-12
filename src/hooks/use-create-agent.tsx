import { useState } from 'react';
import toast from 'react-hot-toast';
import { CreateAgent } from '../api/api';

type TCreateAgentProps = {
  url: string;
  name: string;
  options: {
    fadeIn?: number;
    fadeOut?: number;
  };
  onAgentUpdate: () => void;
  handleCloseModal: () => void;
};

export const useCreateAgent = () => {
  const [url, setUrl] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const createAgent = async ({
    url,
    name,
    options,
    onAgentUpdate,
    handleCloseModal
  }: TCreateAgentProps) => {
    setLoading(true);
    try {
      await CreateAgent.createAgent({ url, name, options });

      setTimeout(() => {
        onAgentUpdate();
        setLoading(false);
      }, 500);

      toast.success('Agent successfully created');

      handleCloseModal();
    } catch (error) {
      setLoading(false);
      toast.error(String(error));
    }
  };

  return {
    url,
    name,
    loading,
    setUrl,
    setName,
    createAgent
  };
};
