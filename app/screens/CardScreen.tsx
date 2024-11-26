import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  IconButton,
  TextInput,
  Snackbar,
  DataTable,
} from "react-native-paper";
import CardService from "../services/cardService";
import CardForm from "../components/cardForm";
// import CardView from "../components/CardView"; // Assumes you have a CardView component
import MenuDrawer from "react-native-side-drawer";
import { useSelector } from "react-redux";

const CardComponent = ({ navigation }: any) => {
  const token = useSelector((state: any) => state.auth.token);
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCards, setSelectedCards] = useState<any>([]);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [drawerCard, setDrawerCard] = useState<any>(null);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchCards();
  }, [searchTerm]);

  const fetchCards = async () => {
    setLoading(true);
    try {
      const response = await CardService.getCards(token);
      console.log("ccc", response.cards);

      setCards(response.cards); // Assuming response is an array of cards
    } catch (error) {
      console.error("Error fetching cards:", error);
      setSnackbarMessage("Something went wrong, please try again later");
      setSnackbarVisible(true);
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectCard = (cardId: any) => {
    setSelectedCards((prevSelected: any) =>
      prevSelected.includes(cardId)
        ? prevSelected.filter((id: any) => id !== cardId)
        : [...prevSelected, cardId]
    );
  };

  const openCardFormDialog = () => {
    setSidebarOpen(true); // Open sidebar to add a new card or edit existing
  };

  const openCardDetails = (card: any) => {
    setDrawerCard(card);
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarVisible(false);
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          mode="outlined"
          placeholder="Search"
          onChangeText={setSearchTerm}
          value={searchTerm}
          style={styles.searchInput}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <ScrollView>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Holder name</DataTable.Title>
                  <DataTable.Title>Card Number</DataTable.Title>
                  <DataTable.Title>Expiration</DataTable.Title>
                  <DataTable.Title>Actions</DataTable.Title>
                </DataTable.Header>

                {cards
                  ?.filter((card: any) =>
                    card.cardHolderName.includes(searchTerm)
                  )
                  .map((item: any, index) => (
                    <DataTable.Row key={index + 1}>
                      <DataTable.Cell>{item.cardHolderName}</DataTable.Cell>
                      <DataTable.Cell>{item.cardNumber}</DataTable.Cell>
                      <DataTable.Cell>{item.expiryDate}</DataTable.Cell>
                      <DataTable.Cell>
                        <IconButton
                          icon="dots-vertical"
                          size={24}
                          onPress={() => openCardDetails(item)} // View card details
                        />
                        {/* <IconButton
                        icon="star"
                        size={24}
                        onPress={() => toggleSelectCard(item._id)} // Add to favorites
                      /> */}
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
              </DataTable>
            </ScrollView>

            <MenuDrawer
              open={isSidebarOpen}
              position={"right"}
              drawerContent={<CardForm />}
              drawerPercentage={70}
              animationTime={250}
              overlay={true}
              opacity={0.4}
            />

            <MenuDrawer
              open={drawerVisible}
              position={"right"}
              drawerContent={
                <></>
                // <CardView card={drawerCard} closeDrawer={handleCloseDrawer} />
              }
              drawerPercentage={70}
              animationTime={250}
              overlay={true}
              opacity={0.4}
            />
          </>
        )}
      </View>

      <Snackbar
        visible={snackbarVisible}
        duration={2000}
        onDismiss={handleSnackbarClose}
        action={{
          label: "Close",
          onPress: handleSnackbarClose,
        }}
      >
        {snackbarMessage}
      </Snackbar>

      <IconButton
        icon="plus"
        size={28}
        containerColor="blue"
        iconColor="white"
        style={styles.newPasswordButton}
        onPress={openCardFormDialog} // Open card form dialog
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    position: "relative",
  },
  searchInput: {
    marginBottom: 16,
  },
  newPasswordButton: {
    borderRadius: 20,
    position: "absolute",
    bottom: 10,
    right: 20,
    color: "#ff55d3",
    alignItems: "center",
  },
});

export default CardComponent;
