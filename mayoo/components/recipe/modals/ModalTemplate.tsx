import React, { ReactNode } from 'react';
import {
  Modal,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

interface RecipeSavedProps {
  children: ReactNode;
  visible: boolean;
  onClose: (event: NativeSyntheticEvent<any>) => void;
}

const ModalTemplate: React.FC<RecipeSavedProps> = ({
  children,
  visible,
  onClose,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <ScrollView contentContainerStyle={styles.main}>
        <View style={styles.mainView}>{children}</View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  main: {height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)'},
  mainView: {
    elevation: 30,
    borderWidth: 2,
    borderColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '90%',
    maxHeight: 400,
    width: '95%',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 50,
  },
});

export default ModalTemplate;
