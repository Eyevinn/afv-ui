import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { TAgent } from '../../api/api';
import { useDeleteAgent } from '../../hooks/use-delete-agent';
import { useUpdateAgent } from '../../hooks/use-update-agent';
import { DeleteIconButton } from '../buttons/Buttons';
import { ConfirmationModal } from '../confirmation-modal/confirmation-modal';
import { SettingsAccordion } from '../settings-accordion/SettingsAccordion';

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
  const [settingsOpen, setSettingsOpen] = useState<boolean>(true);
  const [isScreenSmall, setIsScreenSmall] = useState<boolean>(false);
  const [fadeValues, setFadeValues] = useState({
    fadeIn: agent.options?.fadeIn || 0,
    fadeOut: agent.options?.fadeOut || 0
  });

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth <= 1550);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { saveLoading, updateAgent } = useUpdateAgent();
  const { deleteLoading, deleteAgent } = useDeleteAgent();

  const handleSave = async () => {
    await updateAgent({
      id: agent.id,
      options: {
        fadeIn: fadeValues.fadeIn,
        fadeOut: fadeValues.fadeOut
      }
    });
  };

  const handleDeleteAgent = async (id: string) => {
    await deleteAgent({ ids: [id] });
    onAgentsUpdate();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError(false);
    setErrorMessage(null);
  };

  return (
    <div className="bg-zinc-800 h-fit text-white cursor-pointer rounded-md py-4 px-8 border-2 border-zinc-600">
      <div
        className="flex flex-row justify-between text-xl w-full"
        onClick={() => setOpen(!open)}
      >
        {agent.name || agent.url}
        {open ? <IconChevronUp /> : <IconChevronDown />}
      </div>

      {/* Accordion Content with Smooth Transition */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mt-4 text-sm flex flex-col gap-2">
          <div
            className={`flex items-start ${isScreenSmall ? 'space-x-12' : ''}`}
          >
            <div
              className={`${isScreenSmall ? '' : 'w-1/2'} text-left font-semibold whitespace-nowrap`}
            >
              URL:
            </div>
            <div className={`${isScreenSmall ? '' : 'w-1/2'} text-left`}>
              {agent.url}
            </div>
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

          {/* Settings Accordion */}
          <SettingsAccordion
            settingsOpen={settingsOpen}
            loading={saveLoading}
            previousOptions={agent.options}
            fadeValues={fadeValues}
            setSettingsOpen={setSettingsOpen}
            handleSave={handleSave}
            setFadeValues={setFadeValues}
          />

          <div className="self-end mt-4">
            <DeleteIconButton onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Delete Agent"
        modalText={`Are you sure you want to remove the ${agent.name} agent?`}
        confirmText="Yes, delete agent"
        error={error}
        loading={deleteLoading}
        errorMessage={errorMessage}
        onClose={handleCloseModal}
        onConfirm={() => handleDeleteAgent(agent.id)}
      />
    </div>
  );
};
