import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TextInput, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import CardService from '../services/cardService';
import { useIsFocused } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import CardForm from '../components/cardForm';
import MenuDrawer from 'react-native-side-drawer';

const CardComponent = ({ navigation }: any) => {
  const [cards, setCards] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCards, setSelectedCards] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const isFocused = useIsFocused(); // React Navigation hook for reloading on focus

  useEffect(() => {
    if (isFocused) {
      fetchCards();
      setSidebarOpen(false)
      setModalVisible(false)
    }
  }, [isFocused]);

  const fetchCards = async () => {
    try {
      const response = await CardService.getCards();
      setCards(response);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const toggleSelectCard = (cardId: any) => {
    setSelectedCards((prevSelected: any) => 
      prevSelected.includes(cardId) ? prevSelected.filter((id: any) => id !== cardId) : [...prevSelected, cardId]
    );
  };

  const deleteCard = async (cardId: any) => {
    const ids = cardId ? [cardId] : selectedCards;
    try {
      await CardService.deleteCard(ids.join(','));
      fetchCards(); // Refresh list after deletion
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const openCardFormDialog = (card: null) => {
    navigation.navigate('CardForm', { card });
  };

  const updateFavorites = async (cardId: any) => {
    const ids = cardId ? [cardId] : selectedCards;
    try {
      await CardService.addToFavorites(ids.join(','));
      fetchCards();
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const exportCardsAsCsv = async () => {
    const ids = selectedCards.join(',');
    try {
      const csvBlob = await CardService.exportCardsAsCsv(ids);
      // handle CSV export for React Native
    } catch (error) {
      console.error('Error exporting cards:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      
      {/* Search and Actions */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
        <TextInput
          placeholder="Search the password"
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={{ flex: 1, padding: 8, borderWidth: 1, marginRight: 8 }}
        />
      </View>
      {/* Card List */}
      <FlatList
        data={cards}
        keyExtractor={(item: any) => item._id.toString()}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 16,
              backgroundColor: selectedCards.includes(item._id) ? '#e0e0e0' : '#fff',
              borderBottomWidth: 1,
            }}
            onPress={() => toggleSelectCard(item._id)}
          >
            <Text>{item.cardHolderName}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Button title="Edit" onPress={() => openCardFormDialog(item)} />
              <Button title="Favorite" onPress={() => updateFavorites(item._id)} />
              <Button title="Delete" onPress={() => deleteCard(item._id)} />
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Card Details Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
            <Text>Card Details</Text>
            {/* Display selected card details here */}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <MenuDrawer
        open={isSidebarOpen}
        position={"left"}
        drawerContent={CardForm({
          isSidebarOpen,
        })}
        drawerPercentage={100}
        animationTime={250}
        overlay={true}
        opacity={0.4}
      />

       <IconButton
              icon="plus"
              size={28}
              containerColor="blue"
              iconColor="white"
              style={styles.newPasswordButton}
              onPress={()=>{
                setSidebarOpen(true);
              }}
            />
    </View>
  );
};
const styles = StyleSheet.create({
  newPasswordButton: {
    borderRadius: 20,
    position: "absolute",
    bottom: 10,
    right: 20,
    color: "#ff55d3",
    alignItems: "center",
  },
  newPasswordButtonText: {
    color: "white",
    fontWeight: "bold",
  },
})
export default CardComponent;
