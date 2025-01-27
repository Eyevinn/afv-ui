import { handleFetchRequest } from './handle-fetch-request';

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export type TAgent = {
  name: string;
  url: string;
  id: string;
  status: string;
};

export const CreateAgent = {
  createWsConnection: async ({ url, name }: { url: string; name: string }) => {
    handleFetchRequest<TAgent>(
      fetch(`${API_URL}/agents`, {
        method: 'POST',
        headers: {
          ...(API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {}),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url,
          name
        })
      })
    );
  }
};

export const DeleteAgent = {
  createWsConnection: async ({ ids }: { ids: string[] }) =>
    handleFetchRequest<TAgent[]>(
      fetch(`${API_URL}/agents`, {
        method: 'DELETE',
        headers: {
          ...(API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {}),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ids
        })
      })
    )
};

export const GetAgents = {
  getAllAgents: async () =>
    handleFetchRequest<TAgent[]>(
      fetch(`${API_URL}/agents`, {
        method: 'GET',
        headers: {
          ...(API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {})
        }
      })
    )
};
