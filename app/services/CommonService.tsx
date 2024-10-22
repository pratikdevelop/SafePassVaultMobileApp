import axiosConfig from '../../axios-config';

const CommonService = {
  searchTags: async () => {
    try {
      const response = await axiosConfig.get(`/tags`);
      return response.data;
    } catch (error) {
      console.error('Error searching tags:', error);
      throw error;
    }
  },

  addTag: async (payload: any) => {
    try {
      const response = await axiosConfig.post(`/tags/tag`, payload);
      return response.data;
    } catch (error) {
      console.error('Error adding tag:', error);
      throw error;
    }
  },
};

export default CommonService;
