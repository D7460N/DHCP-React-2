import axios from "axios";

interface DropdownItem {
  id: number;
  name: string;
}


const API_BASE_URL = "http://localhost:5110/api";

export const getResourceTypes = async (): Promise<DropdownItem[]> => {
  try {
    // Use the correct endpoint as per db.json
    const response = await axios.get<DropdownItem[]>(`${API_BASE_URL}/ResourceType`);
    return response.data;
  } catch (error) {
    console.error("Error fetching resource types:", error);
    throw error;
  }
};

// If you have a by-cloud endpoint in db.json, update here. Otherwise, leave as is or remove if not used.
