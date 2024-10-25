import React from 'react'
import { Portal, Dialog, Button, Text } from 'react-native-paper'

const Confirmation = ({confirmModel, title, description,handleConfirm, cancel}: any) => {
  return (
    <Portal>
    <Dialog visible={confirmModel}>
      <Dialog.Title>
        <Text variant="titleLarge">{title}</Text>
      </Dialog.Title>
      <Dialog.Content>
        <Text variant="bodyMedium">
          {description}
        </Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={handleConfirm}>Yes</Button>
        <Button
          onPress={cancel}
        >
          No
        </Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
  )
}

export default Confirmation