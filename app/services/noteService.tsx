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

class NoteService {
  private apiUrl: string;
  private token : string = SessionStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzI3NDMyYjVkYzA4NjI1MjIwY2M3MjIiLCJpYXQiOjE3MzA2NDc0NzZ9.68149dyGYV3mb51tPwc75CZwjZhaCEjGbH_Q7c3OuQk'

  constructor() {
    this.apiUrl = `/notes`;
  }

  // Create a new note card
  async createNote(note: Note): Promise<any> {
    try {
      const response = await axiosConfig.post<Note>(`${this.apiUrl}/note`, note,
        {
        headers: { Authorization: `Bearer ${this.token}` },
      }
      );
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  // Get all note cards
  async getNotes(searchTerm?: string): Promise<any> {
    try {
      const response = await axiosConfig.get<any>(`${this.apiUrl}`, {
        params: { search: searchTerm },
        headers: { Authorization: `Bearer ${this.token}` },
      });
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  // Get a note card by ID
  async getNoteById(id: string): Promise<Note> {
    try {
      const response = await axiosConfig.get<Note>(`${this.apiUrl}/${id}`,
        {
        headers: { Authorization: `Bearer ${this.token}` },
      }
      );
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  // Update a note card by ID
  async updateNote(id: string, note: Partial<Note>): Promise<Note> {
    try {
      const response = await axiosConfig.patch<Note>(`${this.apiUrl}/${id}`, note,
        {
        headers: { Authorization: `Bearer ${this.token}` },
      }
      );
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  // Delete a note card by ID
  async deleteNote(id: string): Promise<void> {
    try {
      await axiosConfig.delete(`${this.apiUrl}/${id}`,
        {
        headers: { Authorization: `Bearer ${this.token}` },
      }
      );
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  // Share Password
  async sharePassword(passwordId: string): Promise<SharePasswordResponse> {
    try {
      const response = await axiosConfig.post<SharePasswordResponse>(`${this.apiUrl}/share/${passwordId}`, {},
        {
        headers: { Authorization: `Bearer ${this.token}` },
      }
      );
      return response.data;
    } catch (error: any) {
      console.error('Error generating share link:', error);
      throw error;
    }
  }

  // Export Notes as CSV
  async exportNotesAsCsv(ids: string): Promise<Blob> {
    try {
      const response = await axiosConfig.get(`${this.apiUrl}/export`, {
        params: { ids },
        responseType: 'blob',
        headers: { Authorization: `Bearer ${this.token}` },
      });
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  // Add to Favorites
  async addToFavorites(noteId: string): Promise<void> {
    try {
      await axiosConfig.post(`${this.apiUrl}/note/${noteId}/favorite`, {},
        {
        headers: { Authorization: `Bearer ${this.token}` },
      }
      );
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  // Error handling
  private handleError(error: AxiosError): void {
    console.error('An error occurred:', error,
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
  }
}

export default new NoteService();
