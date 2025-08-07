import axios from "axios";

export const getServers = async () => {
  try {
    const response = await axios.get("https://localhost:44377/api/admin/Servers");
    return response.data;
  } catch (error) {
    console.error("Error fetching serers:", error);
    throw error;
  }
};
