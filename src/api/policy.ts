import axios from "axios";

export const createPolicy = async (data: any) => {
  try {
    // Use the correct endpoint as per db.json
    const response = await axios.post("http://localhost:5110/policy", data);
    return response.data;
  } catch (error) {
    console.error("Error creating policies", error);
    throw error;
  }
};

export const getPolicies = async () => {
  try {
    // Use the correct endpoint as per db.json
    const response = await axios.get("http://localhost:5110/policy");
    return response.data;
  } catch (error) {
    console.error("Error fetching policies:", error);
    throw error;
  }
};

export const getPolicyById = async (id: number) => {
  try {
    // Use the correct endpoint as per db.json
    const response = await axios.get(`http://localhost:5110/policy/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching policy by ID:", error);
    throw error;
  }
};

export const updatePolicy = async (id: number, updatePolicy: any) => {
  try {
    // Use the correct endpoint as per db.json
    const response = await axios.put(`http://localhost:5110/policy/${id}`, updatePolicy);
    return response.data;
  } catch (error) {
    console.error("Error updating policy:", error);
    throw error;
  }
};

export const deletePolicy = async (id: number) => {
  try {
    // Use the correct endpoint as per db.json
    const response = await axios.delete(`http://localhost:5110/policy/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting policy:", error);
    throw error;
  }
};
