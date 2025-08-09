import axios from "axios";

export const getServers = async () => {
  try {
  const response = await axios.get("http://localhost:5110/api/admin/Servers");
    return response.data;
  } catch (error) {
    console.error("Error fetching servers:", error);
    throw error;
  }
};
