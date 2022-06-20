import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TodoContext } from '../../context/todoContext';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import AddTodoModal from './AddTodoModal';

const AddTodo = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const debouncedModalVisible = useDebouncedValue(modalVisible, 300);

  const { addTodo } = useContext(TodoContext);

  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const onSubmit = (text: string) => {
    addTodo(text);
    closeModal();
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Text style={styles.buttonText}>Add New Todo</Text>
        </TouchableOpacity>
      </View>
      {(debouncedModalVisible || modalVisible) && (
        <AddTodoModal
          isVisible={modalVisible}
          onClose={closeModal}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  button: {
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default AddTodo;
