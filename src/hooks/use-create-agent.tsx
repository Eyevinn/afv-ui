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
    try {
      if (!url.length) {
        toast.error('Url cannot be empty');
        return;
      } else if (!name.length) {
        toast.error('Name cannot be empty');
        return;
      }
      setLoading(true);
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
