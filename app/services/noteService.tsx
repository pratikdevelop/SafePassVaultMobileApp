import axiosConfig from "@/axios-config";
import { AxiosError } from "axios";
import SessionStorage from "react-native-session-storage";
import CommonService from "./CommonService";
import { useSelector } from "react-redux";

export interface SharePasswordResponse {
  shareLink: string;
}

const NoteService = {
  // Removed token initialization here, will pass token as argument

  // Create a new note card
  async createNote(note: any, token: string): Promise<any> {
    try {
      const response = await axiosConfig.post<any>("/notes/note", note, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  },

  // Get all note cards
  async getNotes(searchTerm?: string, token?: string): Promise<any> {
    try {
      const response = await axiosConfig.get<any[]>("/notes", {
        params: { search: searchTerm },
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  },

  // Get a note card by ID
  async getNoteById(id: string, token: string): Promise<any> {
    try {
      const response = await axiosConfig.get<any>(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  },

  // Update a note card by ID
  async updateNote(
    id: string,
    note: Partial<any>,
    token: string
  ): Promise<any> {
    try {
      const response = await axiosConfig.patch<any>(`/notes/${id}`, note, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  },

  // Delete a note card by ID
  async deleteNote(id: string, token: string): Promise<void> {
    try {
      await axiosConfig.delete(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  },

  // Share Password
  async sharePassword(
    passwordId: string,
    token: string
  ): Promise<SharePasswordResponse> {
    try {
      const response = await axiosConfig.post<SharePasswordResponse>(
        `/notes/share/${passwordId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  },

  // Export Notes as CSV
  async exportNotesAsCsv(ids: string, token: string): Promise<Blob> {
    try {
      const response = await axiosConfig.get(`/notes/export`, {
        params: { ids },
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  },

  // Add to Favorites
  async addToFavorites(noteId: string, token: string): Promise<void> {
    try {
      await axiosConfig.post(
        `/notes/note/${noteId}/favorite`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  },

  // Error handling
  handleError(error: AxiosError): void {
    console.error("An error occurred:", error);
    // Additional error handling logic can be added here if necessary
  },

  async postComment(_id: any, newComment: string, token: string) {
    try {
      const response = await axiosConfig.post(
        `/notes/${_id}/comments`,
        { content: newComment },
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

  async addTag(_id: any, newTag: string, token: string): Promise<any> {
    try {
      const response = await axiosConfig.post(
        `/notes/add-tag`,
        { noteId: _id, tagName: newTag },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding tag to note:", error);
      throw error;
    }
  },
};

export default NoteService;
