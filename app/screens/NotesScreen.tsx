import axiosConfig from '../../axios-config';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { DataTable, TextInput } from 'react-native-paper';
import { IconButton } from 'react-native-paper';
const NotesScreen = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    axiosConfig
      .get(`/notes?search=${search}`, {
        
      })
      .then((res:{
        data: {
          data: any;
        };
      }) => {
        setNotes(res.data.data);
        
      });
  }, [search]);
  return (
       <View style={styles.container}>
       <TextInput
          mode="outlined"
          placeholder="Search"
          onChangeText={setSearch}
          value={search}
          />
      <ScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Title</DataTable.Title>
            <DataTable.Title>Content</DataTable.Title>
            <DataTable.Title>Owner</DataTable.Title>
            <DataTable.Title>Created At</DataTable.Title>
            <DataTable.Title>Actions</DataTable.Title>
          </DataTable.Header>

          {notes.map((item: any) => (
            <DataTable.Row key={item._id}>
              <DataTable.Cell>{item.title}</DataTable.Cell>
              <DataTable.Cell>{item.content}</DataTable.Cell>
              <DataTable.Cell>{item.ownerName}</DataTable.Cell>
              <DataTable.Cell>{new Date(item.createdAt).toLocaleString()}</DataTable.Cell>
              <DataTable.Cell>
                <IconButton
                  icon="dots-vertical"
                  size={24}
                  onPress={() => console.log(`Actions for ${item.title}`)}
                />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
});


export default NotesScreen
