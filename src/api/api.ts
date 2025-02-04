import { handleFetchRequest } from './handle-fetch-request';

const API_URL =
  'https://eyevinnlab-afvbackend.eyevinn-web-runner.auto.prod.osaas.io';
const API_KEY = process.env.REACT_APP_API_KEY;

export type TAgent = {
  name: string;
  url: string;
  id: string;
  status: string;
};

export const CreateAgent = {
  createAgent: async ({ url, name }: { url: string; name: string }) =>
    await handleFetchRequest<TAgent>(
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
    )
};

export const DeleteAgent = {
  deleteAgent: async ({ ids }: { ids: string[] }) =>
    await handleFetchRequest<TAgent[]>(
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
    await handleFetchRequest<TAgent[]>(
      fetch(`${API_URL}/agents`, {
        method: 'GET',
        headers: {
          ...(API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {})
        }
      })
    )
};
