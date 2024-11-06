import React from 'react';
import { Modal, View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-paper';

const BottomMenu = ({ handleCloseBottomSheet, isBottomSheetOpen, type='passwords' }: any) => {
  const windowHeight = Dimensions.get('window').height;

  // List items to render
  const items = [
    { id: "1", type: ['passwords'], title: "Launch Website", icon: "launch", action: "launch" },
    { id: "2", type: ['passwords', 'notes'], title: `Edit ${type}`, icon: "pencil", action: "edit" },
    { id: "3", type: ['passwords'], title: "Copy Password", icon: "content-copy", action: "copy_password" },
    { id: "4", type: ['passwords'], title: "Copy Username", icon: "content-copy", action: "copy_username" },
    { id: "5", type: ['passwords'], title: "Copy Website", icon: "content-copy", action: "copy_website" },
    { id: "6", type: ['passwords', 'notes'], title: `Delete ${type}`, icon: "delete", action: "delete" },
    { id: "7", type: ['passwords', 'notes'], title: `Share ${type}`, icon: "share-variant", action: "share" },
    { id: "8", type: ['passwords', 'notes'], title: `View ${type}`, icon: "eye", action: "view" },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isBottomSheetOpen}
      onRequestClose={handleCloseBottomSheet}
    >
      <View style={styles.overlay}>
        <View style={[styles.bottomSheet, { height: windowHeight * 0.6 }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Options</Text>
            <TouchableOpacity onPress={handleCloseBottomSheet}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
          
          {/* Divider */}
          <View style={styles.divider} />

          {/* List of items */}
          {items.map((item) => (
            <View key={item.id}> 
              {item.type.includes(type) && (
                <TouchableOpacity
                  key={item.id}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                  onPress={() => handleCloseBottomSheet(item.action)}
                >
                  <View style={styles.item}>
                    <Icon size={24} source={item.icon} />
                    <Text style={styles.itemText}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    color: 'red',
    fontWeight: 'bold',
  },
  divider: {
    opacity: 0.2,
    height: 1,
    backgroundColor: '#86827e',
    marginVertical: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  itemText: {
    fontSize: 16,
  },
});

export default BottomMenu;
