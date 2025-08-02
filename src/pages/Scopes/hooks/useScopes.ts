import { useState, useEffect, useCallback } from 'react';
import { getScopes } from '../api/scopeApi';
import { Sope } from '../types/scope';

export const useScopes = () => {
  const [scopes, setScopes] = useState<Scope[]?([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchScopes = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getScopes();
      setScopes(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
      setIsLoading(false);
      }
    }, []);

  useEffect(() => {
    fetchScopes();
  }, [fetchScopes]);

  return {
    scopes,
    isLoading,
    error,
    refreshScopes: fetchScopes
  };
};
