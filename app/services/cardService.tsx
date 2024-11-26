import axiosConfig from "@/axios-config";
import { Alert } from "react-native";
import { useSelector } from "react-redux";

// Define the types for the Card service
interface Card {
  id: string;
  title: string;
  content: string;
}

interface ExportCardsResponse {
  data: Blob;
}

class CardService {
  private apiUrl: string = "/cards";

  // Create a new card
  async createCard(card: Card, token: any) {
    try {
      const response = await axiosConfig.post(`${this.apiUrl}`, card, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Get all cards
  async getCards(token: any) {
    try {
      const response = await axiosConfig.get<any>(this.apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Get a specific card by ID
  async getCardById(id: string, token: any) {
    try {
      const response = await axiosConfig.get<Card>(`${this.apiUrl}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Update a card by ID
  async updateCard(id: string, card: Partial<Card>, token: any) {
    try {
      const response = await axiosConfig.patch<Card>(
        `${this.apiUrl}/${id}`,
        card,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Delete a card by ID
  async deleteCard(id: string, token: any) {
    try {
      const response = await axiosConfig.delete(`${this.apiUrl}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Export cards as CSV
  async exportCardsAsCsv(ids: string[], token: any): Promise<any> {
    try {
      const response = await axiosConfig.get(`${this.apiUrl}/export`, {
        params: { ids },
        responseType: "blob", // Ensures it gets a binary file
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Add a card to favorites
  async addToFavorites(cardId: string, token: any) {
    try {
      const response = await axiosConfig.post(
        `${this.apiUrl}/card/${cardId}/favorite`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Error handling
  private handleError(error: any) {
    console.error("An error occurred:", error);
    Alert.alert("Error", "Something went wrong; please try again later.");
  }
}

export default new CardService();
