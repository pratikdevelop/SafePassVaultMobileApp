import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { View } from "react-native";

const TagComponent = ({
  tags,
  control,
  setValue,
}: {
  setValue: UseFormSetValue<any>;
  tags: any[];
  control: any;
}) => {
  const [selectedTags, setSelectedTags] = useState<any[]>([]);

  // Populate the selected tags when the component mounts or when tags change
  useEffect(() => {
    const tagsId = control._formValues.tags.map((tag: any) => {
      return tag._id;
    });
    // Filter the full tag objects based on the selected IDs
    const selectedTags = tags?.filter((tag) => tagsId.includes(tag._id));
    setSelectedTags(selectedTags);
  }, [control._formValues.tags, tags]);

  // Handle tag change and update the form state
  const handleChange = (event: any, newValue: any) => {
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
      <Autocomplete
        value={selectedTags} // Value is the array of selected tags
        onChange={handleChange}
        multiple // Allow multiple selections
        options={tags} // Available tags
        getOptionLabel={(option) => option.label} // Label to display for each tag
        isOptionEqualToValue={(option, value) => option._id === value._id} // Compare tags by their _id
        renderInput={(params) => <TextField {...params} label="Select Tags" />}
      />
    </View>
  );
};

export default TagComponent;
