import React, { FC, useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomSheet from '../BottomSheet';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
};

const AddTodoModal: FC<Props> = ({ onClose, isVisible, onSubmit }) => {
  const [todoContent, setTodoContent] = useState('');

  const onAddTodoPress = () => {
    if (todoContent.trim().length > 0) {
      return onSubmit(todoContent.trim());
    }

    Alert.alert('Error', 'Todo content cannot be empty');
    setTodoContent('');
  };

  useEffect(() => {
    return () => {
      setTodoContent('');
    };
  }, [isVisible]);

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      onOutsideClick={onClose}
      height={200}
    >
      <View style={styles.container}>
        <Text style={styles.label}>Todo Content</Text>
        <TextInput
          style={styles.input}
          value={todoContent}
          onChangeText={setTodoContent}
          onSubmitEditing={onAddTodoPress}
          placeholder="eg. Go to grocery store"
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.75}
          onPress={onAddTodoPress}
        >
          <Text style={styles.buttonText}>Add ToDo</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: '#000',
    padding: 13,
    borderRadius: 5,
    marginTop: 'auto',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#fff',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#202020',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});

export default AddTodoModal;
