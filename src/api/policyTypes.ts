import axios from "axios";

export const getPolicyTypes = async () => {
  try {
    const response = await axios.get("http://localhost:5110/api/policyType");
    return response.data;
  } catch (error) {
    console.error("Error fetching policy types:", error);
    throw error;
  }
};
