import axiosConfig from '@/axios-config';
import axios from 'axios';
import { Alert } from 'react-native';
import SessionStorage from 'react-native-session-storage';

class CardService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = `/cards`; // Base URL for card-related endpoints
  }

  // Helper to retrieve token
  private async getToken() {
    return await SessionStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzI3NDMyYjVkYzA4NjI1MjIwY2M3MjIiLCJpYXQiOjE3MzA4MDMwMzJ9.ogqjDPWcvj1B5T3T9y1QCHgxNWIgIAQw48fQ8IxtJIo';
  }

  // Create a new card
  async createCard(card: any) {
    try {
      const token = await this.getToken();
      const response = await axiosConfig.post(`${this.apiUrl}`, card, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Get all cards
  async getCards() {
    try {
      const token = await this.getToken();
      const response = await axiosConfig.get(this.apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Get a specific card by ID
  async getCardById(id: string) {
    try {
      const token = await this.getToken();
      const response = await axiosConfig.get(`${this.apiUrl}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Update a card by ID
  async updateCard(id: string, card: any) {
    try {
      const token = await this.getToken();
      const response = await axiosConfig.patch(`${this.apiUrl}/${id}`, card, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Delete a card by ID
  async deleteCard(id: string) {
    try {
      const token = await this.getToken();
      const response = await axiosConfig.delete(`${this.apiUrl}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Export cards as CSV
  async exportCardsAsCsv(ids: string[]) {
    try {
      const token = await this.getToken();
      const response = await axiosConfig.get(`${this.apiUrl}/export`, {
        params: { ids },
        responseType: 'blob', // Ensures it gets a binary file
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Add a card to favorites
  async addToFavorites(cardId: string) {
    try {
      const token = await this.getToken();
      const response = await axiosConfig.post(`${this.apiUrl}/card/${cardId}/favorite`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Error handling
  private handleError(error: unknown) {
    console.error('An error occurred:', error);
    Alert.alert('Error', 'Something went wrong; please try again later.');
  }
}

export default new CardService();
