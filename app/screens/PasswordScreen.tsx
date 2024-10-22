/* eslint-disable @typescript-eslint/no-unused-vars */
import BottomDrawerExample from '@/app/components/BottomDrawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  TextInput,
  IconButton,
  List, 
  Text,
} from 'react-native-paper';
import PasswordViewScreen from './PasswordViewScreen';


import service from '../services/passwordservice'; // Adjust the import path as necessary
import PasswordForm from '@/app/components/PasswordForm';
const PasswordScreen = ({ navigation }: any) => {
  const Drawer = createDrawerNavigator();
  const [passwords, setPasswords] = useState<any[]>([]);
  const [search, setSearch] = useState<string | undefined>();
  const [visibleMenu, setVisibleMenu] = useState<string | null>(null);
  const [password, setPassword] = useState<any>(null);
  const [openDrawer, setDrawerOpen] = useState<boolean>(false);
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    getPasswords();
  }, [search]);

  const getPasswords = async () => {
    try {
      const data = await service.fetchPasswords(search);
      setPasswords(data);
    } catch (error) {
      console.error('Error fetching passwords:', error);
    }
  };

  const openMenu = (item: any) => {
    if (item._id === visibleMenu) {
      setVisibleMenu(null);
    } else {
      setVisibleMenu(item._id);
      setPassword(item);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!openDrawer);
  };

  const closeMenu = (_action: string) => {
    if (_action === 'delete') {
      // Handle delete action if needed
    } else if (_action === 'edit') {
      // Handle edit action if needed
      setShowModel(true);
    }else if(_action === 'passwordView') {
      setDrawerOpen(true);
    }
    setVisibleMenu(null);
  };

  const createPassword = ()=>{
  setPassword(null);setDrawerOpen(false); setShowModel(true)
  }

  const toggleFavourite = async (passwordId: string) => {
    try {
      await service.fetchPasswords(passwordId);
      getPasswords();
    } catch (error) {
      console.error('Error fetching passwords:', error);
    }
  };

  function hideDialog(): void {
    setShowModel(false);
  }

  return( 
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <TextInput
          mode="outlined"
          placeholder="Search"
          onChangeText={setSearch}
          value={search}
          style={styles.searchInput}
        />
        {
          passwords.length > 0 ? <>
          {passwords.map((item) => (
          <List.Item
            key={item._id}
            titleStyle={{ fontWeight: 'bold', textTransform: 'capitalize' }}
            title={`${item.name}`}
            description={item.website}
            left={(props: any) => (
              <IconButton
                icon="star"
                iconColor={item.isFavorite ? 'yellow' : 'gray'}
                size={24}
                onPress={() => toggleFavourite(item._id)}
              />
            )}
            right={(props: any) => (
              <IconButton icon='dots-vertical' mode='contained' onPress={() => openMenu(item)}>
              </IconButton>
            )}
          />
        ))}
          </>
          :
          <View style={{display:"flex", alignItems:"center", justifyContent:"center"}}>

          <Text>No passwords found</Text>
          </View>
        }
        
      </View>
      <PasswordForm visible={showModel} onDismiss={hideDialog} password={password} />
      <PasswordViewScreen
        open={openDrawer}
        toggleDrawer={toggleDrawer}
        password={password}
      />
      {visibleMenu ? <BottomDrawerExample closeMenu={closeMenu} /> : null}

      <IconButton
        icon='plus'
        size={28}
        containerColor='blue'
        iconColor='white'
        style={styles.newPasswordButton}
        onPress={createPassword}
      >
        
      </IconButton>
    </View>
)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  searchInput: {
    marginBottom: 20,
  },
  newPasswordButton: {
    borderRadius: 20,
    position: 'absolute',
    bottom: 10,
    right: 20,
    color: '#ff55d3',
    alignItems: 'center',
  },
  newPasswordButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PasswordScreen;
