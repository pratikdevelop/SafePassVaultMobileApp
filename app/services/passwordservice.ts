import axiosConfig from "../../axios-config";
import CryptoJS from "react-native-crypto-js";
import randomstring from "randomstring";

const apiUrl = "/passwords";

const PasswordService = {
  // Removed token initialization here, will pass token as argument
  async fetchPasswords(search: string, token: string) {
    try {
      const { data } = await axiosConfig.get(`${apiUrl}?search=${search}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const decryptedPasswords = data.passwords.map(
        (res: {
          password: string | CryptoJS.lib.CipherParams;
          key: string | CryptoJS.lib.WordArray;
        }) => {
          try {
            const decryptedPassword = CryptoJS.AES.decrypt(
              res.password,
              res.key
            ).toString(CryptoJS.enc.Utf8);
            return { ...res, password: decryptedPassword };
          } catch (err) {
            console.error("Error decrypting password:", err);
            throw new Error("Failed to decrypt password");
          }
        }
      );
      return decryptedPasswords;
    } catch (error) {
      console.error("Error fetching passwords:", error);
      throw error;
    }
  },

  async addPassword(password: any, token: string) {
    try {
      password.key = randomstring.generate({
        length: 32,
        charset: "alphanumeric",
      });
      password.password = CryptoJS.AES.encrypt(
        password.password,
        password.key
      ).toString();

      const response = await axiosConfig.post(`${apiUrl}/password`, password, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const decryptedPassword = CryptoJS.AES.decrypt(
        response.data.password,
        response.data.key
      ).toString(CryptoJS.enc.Utf8);
      return { ...response.data, password: decryptedPassword };
    } catch (error) {
      console.error("Error adding password:", error);
      throw error;
    }
  },

  async deletePassword(id: any, token: string) {
    try {
      await axiosConfig.delete(`${apiUrl}/password/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Error deleting password:", error);
      throw error;
    }
  },

  async addToFavorites(passwordId: any, token: string) {
    try {
      const response = await axiosConfig.post(
        `${apiUrl}/password/${passwordId}/favorite`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding to favorites:", error);
      throw error;
    }
  },

  async updatePassword(_id: any, newPasswordObject: any, token: string) {
    try {
      const response = await axiosConfig.put(
        `${apiUrl}/password/${_id}`,
        newPasswordObject,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const decryptedPassword = CryptoJS.AES.decrypt(
        response.data.password,
        response.data.key
      ).toString(CryptoJS.enc.Utf8);
      return { ...response.data, password: decryptedPassword };
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  },

  async sharePassword(passwordId: any, token: string) {
    try {
      const response = await axiosConfig.post(
        `${apiUrl}/share/${passwordId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error generating share link:", error);
      throw error;
    }
  },

  async searchTags(name: any, token: string) {
    try {
      const response = await axiosConfig.get(`/tags/search/${name}`, {
        headers: { Authorization: `Bearer ${token}` },
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
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding tag:", error);
      throw error;
    }
  },

  async exportPasswordsAsCsv(ids: any, token: string) {
    try {
      const response = await axiosConfig.get(`${apiUrl}/export?ids=${ids}`, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error exporting passwords:", error);
      throw error;
    }
  },

  async addTagToPassword(passwordId: any, tagName: any, token: string) {
    try {
      const response = await axiosConfig.post(
        `${apiUrl}/add-tag`,
        { passwordId, tagName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding tag to password:", error);
      throw error;
    }
  },

  async postComment(passwordId: any, content: any, token: string) {
    try {
      const response = await axiosConfig.post(
        `${apiUrl}/${passwordId}/comments`,
        { content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error posting comment:", error);
      throw error;
    }
  },
};

export default PasswordService;
