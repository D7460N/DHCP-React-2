import axios from "axios";

export const getCloudProviders = async () => {
  try {
    // Use the correct endpoint as per db.json
    const response = await axios.get(`http://localhost:5110/cloudprovider`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cloud providers", error);
    throw error;
  }
};

export const getCloudProviderById = async (id: number) => {
  try {
    const response = await axios.get(`http://localhost:5110/cloudprovider/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cloud providers by ID:", error);
    throw error;
  }
};
