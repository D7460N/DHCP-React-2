import axios from "axios";

export const getOptionTypes = async () => {
  try {
    // Use the correct endpoint as per db.json
    const response = await axios.get(`http://localhost:5110/optiontypes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching option types", error);
    throw error;
  }
};
