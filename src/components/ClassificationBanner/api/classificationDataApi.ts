import { ClassificationData } from '../types/ClassificationData';

const API_URL = 'https://github.com/DHCP_API/ClassificationBanner';

export const getClassificationData = async (): Promise<ClassificationData> => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) {
    throw new Error(`Filed to fetch option types: ${response.statusText}`);
  }
  return await response.json();
};
