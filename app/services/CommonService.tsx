import SessionStorage from "react-native-session-storage";
import axiosConfig from "../../axios-config";

const CommonService = {
  async getToken() {
    return (
      (await SessionStorage.getItem("token")) ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzI3NDMyYjVkYzA4NjI1MjIwY2M3MjIiLCJpYXQiOjE3MzA4MDMwMzJ9.ogqjDPWcvj1B5T3T9y1QCHgxNWIgIAQw48fQ8IxtJIo"
    );
  },
  searchTags: async () => {
    try {
      const token = await CommonService.getToken();
      const response = await axiosConfig.get(`/tags`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching tags:", error);
      throw error;
    }
  },

  addTag: async (payload: any) => {
    try {
      const token = await CommonService.getToken();
      const response = await axiosConfig.post(`/tags/tag`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding tag:", error);
      throw error;
    }
  },
};

export default CommonService;
