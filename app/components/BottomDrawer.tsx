import React, { useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Icon } from "react-native-paper";

const BottomMenu = ({ closeMenu, bottomSheetRef }: any) => {
  const items: any[] = [
    { id: "1", title: "Launch Website", icon: "folderopen", action: "launch" },
    { id: "2", title: "Edit password", icon: "edit", action: "edit" },
    { id: "3", title: "copy password", icon: "copy1", action: "copy_password" },
    { id: "4", title: "Copy Username", icon: "copy1", action: "copy_username" },
    { id: "5", title: "Copy website", icon: "copy1", action: "copy_website" },
    { id: "6", title: "Delete password", icon: "delete", action: "delete" },
    { id: "7", title: "Share password", icon: "sharealt", action: "share" },
    { id: "8", title: "View password", icon: "eye", action: "passwordView" },
  ];

  return (
    <View style={styles.container}>
      <BottomSheet
        index={0}
        ref={bottomSheetRef}
        snapPoints={["100%"]}
        style={{
          borderRadius: 0,
          backgroundColor: "white",
          borderTopColor: "gray",
        }}
      >
        <BottomSheetFlatList
          data={items}
          style={{ borderCurve: "circular", borderRadius: 0 }}
          keyExtractor={(item: { id: any; }) => item.id}
          renderItem={({ item }: any) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>  closeMenu(item.action)}
            >
              <View style={styles.item}>
                <Icon  color={"#d33e3"} size={24} source={item.icon}></Icon>

                <Text style={styles.title}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 10,
    gap: 15,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 16,
  },
});

export default BottomMenu;
