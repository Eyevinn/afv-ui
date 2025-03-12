import { useState } from 'react';
import toast from 'react-hot-toast';
import { UpdateAgent } from '../api/api';

type TUpdateAgentProps = {
  id: string;
  options: { fadeIn: number; fadeOut: number };
};

export const useUpdateAgent = () => {
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  const updateAgent = async ({ id, options }: TUpdateAgentProps) => {
    setSaveLoading(true);
    try {
      await UpdateAgent.updateAgent({ id, options });
      setTimeout(() => {
        setSaveLoading(false);
      }, 500);
      toast.success('Agent successfully updated');
    } catch (error) {
      setSaveLoading(false);
      toast.error(String(error));
    }
  };

  return { saveLoading, updateAgent };
};
