import axios from "axios";

export const getOptionTypes = async () => {
  try {
    const response = await axios.get(`http://localhost:5110/api/admin/OptionTypes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching option types", error);
    throw error;
  }
};
