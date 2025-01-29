import { useEffect, useState } from 'react';
import { GetAgents, TAgent } from '../api/api';

type TUseFetchAgents = {
  setAgents: React.Dispatch<React.SetStateAction<TAgent[] | null>>;
  agentsUpdated: boolean;
};

export const useFetchAgents = ({
  setAgents,
  agentsUpdated
}: TUseFetchAgents) => {
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const agents = await GetAgents.getAllAgents();
        setAgents(agents);
      } catch (error) {
        setError(true);
        setErrorMessage('There was an error when fetching the agents.');
      }
    };

    fetchAgents();

    // Fetch agents every 5 seconds to make sure that agent status is up to date
    const interval = setInterval(fetchAgents, 5000);

    return () => clearInterval(interval);
  }, [agentsUpdated]);

  return { error, errorMessage };
};
