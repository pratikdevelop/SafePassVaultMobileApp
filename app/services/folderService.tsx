// FolderService.ts

import axiosConfig from '@/axios-config';
import axios, { AxiosResponse } from 'axios';
import SessionStorage from 'react-native-session-storage';

// Define the Folder model
export interface Folder {
  _id?: string;
  user?: string;
  name?: string;
  isSpecial?: boolean;
  type?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Get the API URL from environment variables
const apiUrl = `/folders`; // Define API_URL in your environment

class FolderService {
  private apiUrl = apiUrl;

  // Method to retrieve the token
  private async getToken(): Promise<string> {
    return (
      (await SessionStorage.getItem("token")) ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzI3NDMyYjVkYzA4NjI1MjIwY2M3MjIiLCJpYXQiOjE3MzA4MDMwMzJ9.ogqjDPWcvj1B5T3T9y1QCHgxNWIgIAQw48fQ8IxtJIo"
    );
  }

  // Create a new folder
  public async createFolder(folder: Folder): Promise<Folder | undefined> {
    try {
      const token = await this.getToken();
      const response: AxiosResponse<Folder> = await axiosConfig.post(this.apiUrl, folder, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Get all folders for the logged-in user
  public async getUserFolders(): Promise<Folder[] | undefined> {
    try {
      const token = await this.getToken();
      const response: AxiosResponse<Folder[]> = await axiosConfig.get(this.apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Get folders by type
  public async getFoldersByType(type?: string): Promise<Folder[] | undefined> {
    try {
      const token = await this.getToken();
      const response: AxiosResponse<Folder[]> = await axiosConfig.get(`${this.apiUrl}/type/${type}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Get folder by ID
  public async getFolderById(folderId: string): Promise<Folder | undefined> {
    try {
      const token = await this.getToken();
      const response: AxiosResponse<Folder> = await axiosConfig.get(`${this.apiUrl}/${folderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Update a folder
  public async updateFolder(folderId: string, folder: Folder): Promise<Folder | undefined> {
    try {
      const token = await this.getToken();
      const response: AxiosResponse<Folder> = await axiosConfig.put(`${this.apiUrl}/${folderId}`, folder, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Delete a folder
  public async deleteFolder(folderId: string): Promise<void> {
    try {
      const token = await this.getToken();
      await axiosConfig.delete(`${this.apiUrl}/${folderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  // Error handling method
  private handleError(error: any): void {
    console.error("An error occurred:", error);
    // Optionally handle the error based on response status or message
  }
}

// Export an instance of the service
export default new FolderService();
