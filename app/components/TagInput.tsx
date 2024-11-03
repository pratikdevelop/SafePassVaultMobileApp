import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet, GestureResponderEvent } from "react-native";
import { Button, Chip, Menu, Portal, Provider, TextInput } from "react-native-paper";

const TagInput = ({ selectedTags, tags, onTagRemove }: any) => {
  const [searchTerm, setSearchTerm] = useState<any>("");
  const [visible, setVisible] = useState(true);
  const [filteredTags, setFilteredTags] = useState<any>([]);
  useEffect(() => {
    setFilteredTags(tags);
  }, [tags]);

  const onSearchChange = (text: string) => {
    setSearchTerm(text)
    if (text) {
      const filtered = tags?.filter((tag: { name: string }) =>
        tag.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredTags(filtered);
    } else {
      setFilteredTags(tags);
    }
  };

  function closeMenu(): void {
    
  }

  function openMenu(event: GestureResponderEvent): void {
    setVisible(true)
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.chipContainer}>
        {selectedTags.map((tag: { _id: string; name: string }) => (
          <Chip key={tag._id} onClose={() => onTagRemove(tag)}>
            {tag.name}
          </Chip>
        ))}
      </View>
         
      <TextInput
        value={searchTerm}
        verticalAlign="middle"
        onChangeText={onSearchChange}
        placeholder="Search tags"
        style={styles.textInput}
      
      />
        <Menu visible={visible}
        onDismiss={closeMenu}
        anchorPosition="top"
        anchor={<Button onPress={openMenu}>Show menu</Button>}>


         <Menu.Item title="addtag" onPress={() => { /* Handle selection */ }} />
    <Menu.Item title="aaa" onPress={() => { /* Handle selection */ }} />
    <Menu.Item title="aaa4" onPress={() => { /* Handle selection */ }} />
    <Menu.Item title="new tag" onPress={() => { /* Handle selection */ }} />
    <Menu.Item title="bnmnbm" onPress={() => { /* Handle selection */ }} />
        </Menu>
    



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  input: {
    marginBottom: 8,
  },
  chip: {
    margin: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  menuItem: {
    padding: 8,
  },
});

export default TagInput;
