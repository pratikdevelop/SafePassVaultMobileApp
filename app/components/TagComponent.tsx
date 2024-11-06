// import { TextField } from "@mui/material";
// import Autocomplete from "@mui/material/Autocomplete";
import React, { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { MultiSelectDropdown } from 'react-native-paper-dropdown';

const TagComponent = ({
  tags,
  control,
  setValue,
}: {
  setValue: UseFormSetValue<any>;
  tags: {
    _id: string,
    label: string
  }[];
  control: any;
}) => {
  const [selectedTagsIds, setSelectedTags] = useState<any[]>([]);

  // Populate the selected tags when the component mounts or when tags change
  useEffect(() => {
    console.log('forn', control._formValues.tags);
    
    const tagsId = control._formValues.tags.map((tag: any) => {
      return tag._id;
    });
    // Filter the full tag objects based on the selected IDs
    setSelectedTags(tagsId);
  }, [control._formValues.tags, tags]);

  // Handle tag change and update the form state
  const handleChange = (newValue: any) => {
    console.log('sesele', newValue);
    
    setSelectedTags(newValue); // Update selected tags in local state
    setValue("tags", newValue); // Update selected tags in form state
  };

  return (
    <View
      style={{
        padding: 16,
        flex: 1,
        width: "100%",
        backgroundColor: "white",
      }}
    >
      {/* <Autocomplete
        value={selectedTags} // Value is the array of selected tags
        onChange={handleChange}
        multiple // Allow multiple selections
        options={tags} // Available tags
        getOptionLabel={(option) => option.label} // Label to display for each tag
        isOptionEqualToValue={(option, value) => option._id === value._id} // Compare tags by their _id
        renderInput={(params) => <TextField {...params} label="Select Tags" />}
      /> */}

<Dropdown
        placeholder="Select Tags"
        mode="modal"
        value={selectedTagsIds} data={tags} labelField={'label'} valueField={'_id'} onChange={handleChange }        />
    </View>
  );
};

export default TagComponent;
