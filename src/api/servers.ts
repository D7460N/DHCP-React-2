import axios from "axios";

export const getServers = async () => {
  try {
    // Use the correct endpoint as per db.json
    const response = await axios.get("http://localhost:5110/servers");
    return response.data;
  } catch (error) {
    console.error("Error fetching servers:", error);
    throw error;
  }
};
