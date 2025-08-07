import axios from "axios";

export const getCloudProviders = async () => {
  try {
    const response = await axios.get(`http://localhost:5110/api/CloudProvider`);
    return response.data;
  } catch (error) {
    console.error("Error fetching policies", error);
    throw error;
  }
};

export const getCloudProviderById = async (id: number) => {
  try {
    const response = await axios.get(`http://localhost:5110/api/CloudProvider/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching policy by ID:", error);
    throw error;
  }
};
