import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import { Chip } from "react-native-paper";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

const TagInput = ({ selectedTags, tags, onTagRemove }: any) => {
  const searchTerm = useRef<any>("");
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const dropdownController = useRef<any>(null);

  const [filteredTags, setFilteredTags] = useState<any>([]);
  const onOpenSuggestionsList = useCallback(() => {}, []);

  useEffect(() => {
    const UPDATEDTags = tags.map((tag: any) => {
      return {
        id: tag._id,
        title: tag.name,
      };
    });
    setFilteredTags(UPDATEDTags);
  }, [tags]);

  const onSearchChange = (text: string) => {
    if (text) {
      const filtered = tags?.filter((tag: { name: string }) =>
        tag.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredTags(filtered);
    } else {
      setFilteredTags(tags);
    }
    console.log('ff', filteredTags);
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.chipContainer}>
        {selectedTags.map((tag: { _id: string; name: string }) => (
          <Chip key={tag._id} onClose={() => onTagRemove(tag)}>
            {tag.name}
          </Chip>
        ))}
      </View>
      {visible && (
        <AutocompleteDropdown
          ref={searchTerm}
          controller={(controller) => {
            dropdownController.current = controller;
            console.log("ff", dropdownController);
            
          }}
          dataSet={filteredTags}
          onChangeText={onSearchChange}
          onSelectItem={(item) => {
            item && selectedTags(item);
          }}
          onClear={() => searchTerm.current = null}
          onOpenSuggestionsList={onOpenSuggestionsList}
          loading={loading}
          useFilter={true}
          textInputProps={{
            placeholder: "Search Tags",
            style: {
              color: "#gray",
              paddingLeft: 18,
              backgroundColor: "white",
            },
          }}
          rightButtonsContainerStyle={{
            right: 8,
            height: 30,
            alignSelf: "center",
          }}
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: "gray",
          }}
          containerStyle={{ flexGrow: 1, flexShrink: 1 }}
          renderItem={(item) => (
            <>
              <Text>{item.title}</Text>
            </>
          )}
          inputHeight={50}
          showChevron={false}
          closeOnBlur={false}
        />
      )}
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
});

export default TagInput;
