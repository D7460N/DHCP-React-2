import axios from "axios";

interface DropdownItem {
  id: number;
  name: string;
}

const API_BASE_URL = "http://localhost:5110/api";

export const getResourceTypes = async (): Promise<DropdownItem[]> => {
  try {
    const response = await axios.get<DropdownItem[]>(`${API_BASE_URL}/ResourceType`);
    return response.data;
  } catch (error) {
    console.error("Error fetching resource types:", error);
    throw error;
  }
};

export const getResourceTypesByCloudProvider = async (providerId: string | number): Promise<DropdownItem[]> => {
  try {
    const response = await axios.get<DropdownItem[]>(
      `${API_BASE_URL}/ResourceType/by-cloud?providerId=${providerId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching resource types by cloud provider:", error);
    throw error;
  }
};
