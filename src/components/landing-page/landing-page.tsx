import { AgentListItem } from '../agent-list-item/agent-list-item';
import { PrimaryButton } from '../buttons/Buttons';
import { useEffect, useState } from 'react';
import { AddAgentModal } from '../add-agent-modal/add-agent-modal';
import { TAgent } from '../../api/api';
import { useFetchAgents } from '../../hooks/use-fetch-agents';

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [agents, setAgents] = useState<TAgent[] | null>(null);
  const [agentsUpdated, setAgentsUpdated] = useState<boolean>(false);

  const { error, errorMessage } = useFetchAgents({
    setAgents,
    agentsUpdated
  });

  // Change to logger once available
  useEffect(() => {
    if (error) {
      console.error(errorMessage);
    }
  }, [error, errorMessage]);

  return (
    <div className="mt-4 ml-8 w-full mr-8">
      <h1 className="text-3xl text-white">Audio Follow Video Agents</h1>
      <div className="mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-2xl text-white">Agents</h2>
          <PrimaryButton
            onClick={() => setIsModalOpen(true)}
            children="Add Agent"
          />
        </div>
        <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {agents?.map((agent, index) => (
            <AgentListItem
              key={index}
              agent={agent}
              onAgentsUpdate={() => setAgentsUpdated(!agentsUpdated)}
            />
          ))}
        </div>
      </div>
      <AddAgentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAgentUpdate={() => setAgentsUpdated(!agentsUpdated)}
      />
    </div>
  );
}
