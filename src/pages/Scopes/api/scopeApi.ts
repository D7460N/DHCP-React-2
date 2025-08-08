import { Scope, ScopeUpdateRequest } from '../types/scope';

const API_URL = 'https://localhost:44377/api/Scopes';

export const getScopes = async (): Promise<Scope[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch scopes: ${response.statusText}`);
  }
  return await response.json();
};

export const getScopeById = async (id: string): Promise<Scope> => {
  const response = await fetch(`${API_URL}?name=${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch scopes: ${response.statusText}`);
  }
  return await response.json();
};

export const createScope = async (scope: Scope): Promise<Scope> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(scope),
  });
  if (!response.ok) {
    throw new Error(`Failed to create scopes: ${response.statusText}`);
  }
  return await response.json();
};

export const updateScope = async (id: string, scope: Scope): Promise<Scope> => {
  // Create a properly typed update payload
  const payload: ScopeUpdateRequest = {
    Name: id, // Original name used for identification
    UpdatedName: scope.Name // New name to update to
    };

    // Add other fields as UpdatedXXX properties if they exist in the scope object
    if (scope.Description !==undefined) {
      payload.UpdatedDescription = scope.Description;
    }

    if (scope.StartIPv4Address !== undefined) {
      payload.UpdatedStartIPv4Address = scope.StartIPv4Address;
    }

    if (scope.EndIPv4Address !==undefined) {
      payload.UpdatedEndIPv4Address = scope.EndIPv4Address;
    }

    // Add other optional fields as needed
    if (scope.Active !== undefined) {
      payload.UpdatedActive = scope.Active;
    }

  // Include ReturnListFlag if needed (API might require this for response formatting)
  payload.ReturnListFlag = true;

  const response = await fetch(`${API_URL}`, {
    method: 'PUT',
    headers: {
      "Content-Type": 'application/json',
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
      "X-Requested-With": "*",
      "Allow": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to update scope: ${response.statusText}`);
  }
  return await response.json();
};

export const deleteScope = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete scope: ${response.statusText}`);
  }
  return await response.json();
};
