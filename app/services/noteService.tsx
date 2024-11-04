import axiosConfig from "@/axios-config";
import { AxiosError } from "axios";
import SessionStorage from 'react-native-session-storage';

export interface Note {
  id?: string;
  title?: string;
  content?: string;
  // Define other note properties as needed
}

export interface SharePasswordResponse {
  shareLink: string;
}

const apiUrl = '/notes';

const NoteService = {
  // Helper to retrieve token
  async getToken() {
    return await SessionStorage.getItem('token');
  },

  // Create a new note card
  async createNote(note: Note): Promise<Note> {
    try {
      const token = await this.getToken();
      const response = await axiosConfig.post<Note>(`${apiUrl}/note`, note, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  },

  // Get all note cards
  async getNotes(searchTerm?: string): Promise<Note[]> {
    try {
      const token = await this.getToken();
      const response = await axiosConfig.get<Note[]>(`${apiUrl}`, {
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
  async getNoteById(id: string): Promise<Note> {
    try {
      const token = await this.getToken();
      const response = await axiosConfig.get<Note>(`${apiUrl}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  },

  // Update a note card by ID
  async updateNote(id: string, note: Partial<Note>): Promise<Note> {
    try {
      const token = await this.getToken();
      const response = await axiosConfig.patch<Note>(`${apiUrl}/${id}`, note, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  },

  // Delete a note card by ID
  async deleteNote(id: string): Promise<void> {
    try {
      const token = await this.getToken();
      await axiosConfig.delete(`${apiUrl}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  },

  // Share Password
  async sharePassword(passwordId: string): Promise<SharePasswordResponse> {
    try {
      const token = await this.getToken();
      const response = await axiosConfig.post<SharePasswordResponse>(`${apiUrl}/share/${passwordId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  },

  // Export Notes as CSV
  async exportNotesAsCsv(ids: string): Promise<Blob> {
    try {
      const token = await this.getToken();
      const response = await axiosConfig.get(`${apiUrl}/export`, {
        params: { ids },
        responseType: 'blob',
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  },

  // Add to Favorites
  async addToFavorites(noteId: string): Promise<void> {
    try {
      const token = await this.getToken();
      await axiosConfig.post(`${apiUrl}/note/${noteId}/favorite`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  },

  // Error handling
  handleError(error: AxiosError): void {
    console.error('An error occurred:', error);
    // Additional error handling logic can be added here if necessary
  }
};

export default NoteService;
