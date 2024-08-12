import axiosInstance from "./axios";

const apiService = {
  getData: async (endpoint, params) => {
    try {
      const res = await axiosInstance.get(endpoint, { params });
      return res;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  addData: async (endpoint, data) => {
    try {
      const res = await axiosInstance.post(endpoint, data);
      return res.data;
    } catch (error) {
      console.error("Error adding data:", error);
      throw error;
    }
  },
  updateData: async (endpoint, id, data) => {
    try {
      const res = await axiosInstance.put(`${endpoint}/${id}`, data);
      return res.data;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  },
  deleteData: async (endpoint, id) => {
    try {
      const res = await axiosInstance.delete(`${endpoint}/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error;
    }
  },
};

export default apiService;
