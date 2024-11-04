import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { DataTable, Snackbar, TextInput, IconButton } from "react-native-paper";
import NotesForm from "../components/NotesForm";
import noteService from "../services/noteService";
import BottomMenu from "../components/BottomDrawer";

const NotesScreen = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    getNotes();
  }, [search]);

  const getNotes = async () => {
    setLoading(true);
    try {
      const response = await noteService.getNotes(search);
      console.log("notes", response);
      setNotes(response.data);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Something went wrong, please try again later");
      setSnackbarVisible(true);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const createNote = () => setVisible(true);

  const handleCloseBottomSheet = (_action: string) => {
    if (_action === "delete") {
      setConfirmModel(true); // This function can be defined as per your requirement
    } else if (_action === "edit") {
      setVisible(true);
    } else if (_action === "passwordView") {
      setDrawerRef(true); // This function can be defined as per your requirement
    }
    setIsBottomSheetOpen(false);
  };

  const handleAddNote = async (data: any) => {
    setLoading(true);
    try {
      const response = await noteService.createNote(data);
      console.log("response", response);
      setSnackbarMessage("Note added successfully!");
      setSnackbarVisible(true);
      getNotes();
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Failed to add note.");
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
      setVisible(false);
    }
  };

  const toggleFavourite = async (_id: any) => {
    try {
      const response = await noteService.addToFavorites(_id);
      console.log("response", response);
      setSnackbarMessage("Note added to favorites");
      setSnackbarVisible(true);
      getNotes();
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Something went wrong");
      setSnackbarVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <TextInput
            mode="outlined"
            placeholder="Search"
            onChangeText={setSearch}
            value={search}
            style={styles.searchInput}
          />
          <ScrollView>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Favorites</DataTable.Title>
                <DataTable.Title>Title</DataTable.Title>
                <DataTable.Title>Content</DataTable.Title>
                <DataTable.Title>Owner</DataTable.Title>
                <DataTable.Title>Created At</DataTable.Title>
                <DataTable.Title>Actions</DataTable.Title>
              </DataTable.Header>

              {notes?.map((item: any) => (
                <DataTable.Row key={item?._id}>
                  <DataTable.Cell>
                    <IconButton
                      icon="star"
                      iconColor={item.isFavorite ? "yellow" : "gray"}
                      size={24}
                      onPress={() => toggleFavourite(item._id)}
                    />
                  </DataTable.Cell>
                  <DataTable.Cell>{item?.title}</DataTable.Cell>
                  <DataTable.Cell>{item?.content}</DataTable.Cell>
                  <DataTable.Cell>{item?.ownerName}</DataTable.Cell>
                  <DataTable.Cell>
                    {item?.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : null}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <IconButton
                      icon="dots-vertical"
                      size={24}
                      onPress={() => {
                        setNote(item);
                        setIsBottomSheetOpen(true);
                      }}
                    />
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </ScrollView>

          <NotesForm
            visible={visible}
            onDismiss={() => setVisible(false)}
            onSubmit={handleAddNote}
          />

          <BottomMenu
            handleCloseBottomSheet={handleCloseBottomSheet}
            isBottomSheetOpen={isBottomSheetOpen}
            type="notes"
          />

          <Snackbar
            visible={snackbarVisible}
            duration={2000}
            onDismiss={() => setSnackbarVisible(false)}
            action={{
              label: "Close",
              onPress: () => setSnackbarVisible(false),
            }}
          >
            {snackbarMessage}
          </Snackbar>
        </View>
      )}

      <IconButton
        icon="plus"
        size={28}
        containerColor="blue"
        iconColor="white"
        style={styles.newPasswordButton}
        onPress={createNote}
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

export default NotesScreen;

// Stub functions
function setConfirmModel(value: boolean) {
  console.log("Confirm model set to:", value);
}

function setDrawerRef(value: boolean) {
  console.log("Drawer reference set to:", value);
}
