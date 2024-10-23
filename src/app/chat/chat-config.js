import { api } from "@/config/axios.config";
import axiosInstance from "@/lib/axios";

export const getContacts = async () => {
  const response = await api.get("/chat");
  return response.data;
};

export const getMessages = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/chat/${id}`);
    console.log("Response from getMessages:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};
export const deleteMessage = async (obj) => {
  console.log("Object to be sent:", obj); // Add this log statement
  try {
    await axiosInstance.delete(`api/chat/messages/${obj.selectedChatId}`, {
      data: obj,
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    // Handle error gracefully (e.g., display an error message to the user)
  }
};

export const getProfile = async () => {
  const response = await axiosInstance.get("api/chat/profile-data");

  return response.data;
};

export const sendMessage = async (msg) => {
  const response = await axiosInstance.post("api/chat/messages", msg);
  return response.data;
};
