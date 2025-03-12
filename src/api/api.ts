import { handleFetchRequest } from './handle-fetch-request';

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export type TAgent = {
  name: string;
  url: string;
  id: string;
  status: string;
  options?: {
    fadeIn?: number;
    fadeOut?: number;
  };
};

export type TCreateAgent = {
  url: string;
  name: string;
  options?: {
    fadeIn?: number;
    fadeOut?: number;
  };
};

export const CreateAgent = {
  createAgent: async ({ url, name, options }: TCreateAgent) =>
    await handleFetchRequest<TAgent>(
      fetch(`${API_URL}/agents`, {
        method: 'POST',
        headers: {
          ...(API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {}),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url,
          name,
          options
        })
      })
    ).catch((error) => {
      if (error.message.includes('Invalid')) {
        throw new Error('Not a valid URL');
      } else if (
        error.message.includes('already in use') ||
        error.message.includes('Failed to connect')
      ) {
        throw new Error(error.message);
      } else {
        throw new Error('There was an error creating the agent');
      }
    })
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
    ).catch(() => {
      throw new Error('There was an error deleting the agent');
    })
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

export const UpdateAgent = {
  updateAgent: async ({
    id,
    options
  }: {
    id: string;
    options?: { fadeIn?: number; fadeOut?: number };
  }) =>
    await handleFetchRequest<TAgent>(
      fetch(`${API_URL}/agents/${id}`, {
        method: 'PUT',
        headers: {
          ...(API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {}),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fadeIn: options?.fadeIn,
          fadeOut: options?.fadeOut
        })
      })
    )
};
