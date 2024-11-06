import React, { useEffect, useState } from "react";
import { View } from "react-native";
import folderService from "../services/folderService";
// import { Autocomplete, TextField } from "@mui/material";
import { UseFormSetValue } from "react-hook-form";

const FolderComponent = ({
  type,
  setValue,
  control,
}: {
  type: string;
  setValue: UseFormSetValue<any>;
  control: any;
}) => {
  const [folders, setFolders] = useState<any>([]);
  useEffect(() => {
    console.log("dd", control);

    const getFolderByType = async (type: string) => {
      try {
        const response = await folderService.getFoldersByType(type);
        setFolders(response);
      } catch (error: any) {
        console.error("error For fetching the folders", error.message);
        // handle the error
        setFolders([]);
      }
    };
    getFolderByType(type);
  }, [type]);

  const handleChange = (event: any, newValue: any) => {
    setValue("folderId", newValue._id);
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
        value={
          folders.find(
            (option: any) => option._id === control._formValues.folderId
          ) || null
        } // Ensure it is never undefined
        getOptionLabel={(option) => option.label}
        onChange={handleChange}
        options={folders}
        size="medium"
        renderInput={(params) => (
          <TextField {...params} label="Select Folder" />
        )}
      /> */}
    </View>
  );
};

export default FolderComponent;
