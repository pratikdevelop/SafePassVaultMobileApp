import axiosConfig from "../../axios-config";

const CommonService = {
  async searchTags(token: string) {
    try {
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
  async addTag(payload: any, token: string) {
    try {
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
