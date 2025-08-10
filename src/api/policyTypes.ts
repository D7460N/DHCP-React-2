import axios from "axios";

export const getPolicyTypes = async () => {
  try {
    // Use the correct endpoint as per db.json
    const response = await axios.get("http://localhost:5110/policytype");
    return response.data;
  } catch (error) {
    console.error("Error fetching policy types:", error);
    throw error;
  }
};
