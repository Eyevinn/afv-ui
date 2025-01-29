import { useState } from 'react';
import { TAgent, DeleteAgent } from '../../api/api';
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react';
import { DeleteIconButton } from '../buttons/Buttons';
import { ConfirmationModal } from '../confirmation-modal/confirmation-modal';

type TAgentListItemProps = {
  agent: TAgent;
  onAgentsUpdate: () => void;
};

const renderAgentStatusColor = (status: string) => {
  switch (status) {
    case 'Connected':
      return 'text-green-400';
    case 'Reconnecting':
      return 'text-amber-400';
    case 'Disconnected':
      return 'text-red-400';
  }
};

export const AgentListItem = ({
  agent,
  onAgentsUpdate
}: TAgentListItemProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDeleteAgent = async (id: string) => {
    try {
      await DeleteAgent.deleteAgent({ ids: [id] });
      onAgentsUpdate();
      setIsModalOpen(false);
    } catch (error) {
      setError(true);
      setErrorMessage('There was an error when deleting the agent.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError(false);
    setErrorMessage(null);
  };

  return (
    <div className="bg-zinc-800 h-fit text-white cursor-pointer rounded-md py-4 px-8 border-2 border-zinc-600 ">
      <div
        className="flex flex-row justify-between text-xl w-full"
        onClick={() => setOpen(!open)}
      >
        {agent.name}
        {open ? <IconChevronUp /> : <IconChevronDown />}
      </div>
      {open && (
        <div className="mt-4 text-sm flex flex-col gap-2">
          <div className="flex items-start">
            <div className="w-1/2 text-left font-semibold whitespace-nowrap">
              URL:
            </div>
            <div className="w-1/2 text-left">{agent.url}</div>
          </div>
          <div className="flex items-start">
            <div className="w-1/2 text-left font-semibold whitespace-nowrap">
              Connection Status:
            </div>
            <div
              className={`${renderAgentStatusColor(
                agent.status
              )} flex-grow text-left min-w-[100px] pl-2`}
            >
              {agent.status}
            </div>
          </div>
          <div className="self-end">
            <DeleteIconButton onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Delete Agent"
        modalText={`Are you sure you want to remove the ${agent.name} agent?`}
        confirmText="Yes, delete agent"
        error={error}
        errorMessage={errorMessage}
        onClose={handleCloseModal}
        onConfirm={() => handleDeleteAgent(agent.id)}
      />
    </div>
  );
};
