import React, { useContext } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { TodoContext } from '../../context/todoContext';

const Search = () => {
  const { filterValue, setFilterValue } = useContext(TodoContext);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={filterValue}
        onChangeText={setFilterValue}
        placeholder="Search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#202020',
    color: 'black',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});

export default Search;
