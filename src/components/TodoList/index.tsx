import React, { useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { TodoContext } from '../../context/todoContext';
import TodoItem from '../TodoItem';

const TodoList = () => {
  const { todos } = useContext(TodoContext);

  return (
    <ScrollView style={styles.container} bounces={false}>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
});

export default TodoList;
