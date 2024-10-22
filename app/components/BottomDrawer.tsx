import React, { useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import  Icon from 'react-native-vector-icons/FontAwesome';

const BottomDrawerExample = ({closeMenu}: any) => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleAction = (action: string) => {
    console.log(`Action selected: ${action}`);
    // Add your action handling logic here
    closeMenu(action);
    bottomSheetRef.current?.close(); // Close the bottom sheet after an action
  };

  useEffect(()=>{
    bottomSheetRef.current?.snapToPosition(7,);
  },[])

  // Sample data for the bottom sheet
  const items = [
    { id: '1', title: 'Launch Website', icon:'facebook', action: 'launch' },
    { id: '2', title: 'Edit password', icon: 'pencil', action: 'edit' },
    { id: '3', title: 'copy password', icon: 'copy', action: 'copy_password' },
    { id: '4', title: 'Copy Username', icon: 'copy', action: 'copy_username' },
    { id: '5', title: 'Copy website', icon: 'copy', action: 'copy_website' },
    { id: '6', title: 'Delete password', icon: 'trash', action: 'delete' },
    { id: '7', title: 'Share password', icon: 'share', action: 'share' },
    { id: '8', title: 'View password', icon: 'eye', action: 'passwordView' },
  ];

  // renders
  return (
    <View style={styles.container}>
      <BottomSheet
      index={0}
        ref={bottomSheetRef}
        snapPoints={['100%']} // Adjust the height of the bottom sheet
    enablePanDownToClose={true}
        style={{borderRadius:0, backgroundColor:'white', borderTopColor:"gray"}}
        onChange={handleSheetChanges}
      >
        <BottomSheetFlatList

          data={items}
          style={{borderCurve:"circular", borderRadius:0}}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity key={item.id} onPress={() => handleAction(item.action)}>
              <View style={styles.item} >
                <Icon 
                name={item.icon}
                size={20}
                color={'#d33e3'}
                
                ></Icon>
               
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
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row",
    paddingVertical: 20,
    paddingHorizontal: 10,
    gap:15,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 16,
  },
});

export default BottomDrawerExample;
