import { useState } from 'react';
import toast from 'react-hot-toast';
import { DeleteAgent } from '../api/api';

type TDeleteAgentProps = {
  ids: string[];
};

export const useDeleteAgent = () => {
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const deleteAgent = async ({ ids }: TDeleteAgentProps) => {
    setDeleteLoading(true);
    try {
      await DeleteAgent.deleteAgent({ ids });

      toast.success('Agent successfully deleted');

      setDeleteLoading(false);
    } catch (error) {
      setDeleteLoading(false);
      toast.error(String(error));
    }
  };

  return { deleteLoading, deleteAgent };
};
