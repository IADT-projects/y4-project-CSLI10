import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Icon, Item, Input } from 'native-base';

const SearchCourses = () => {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <Item style={styles.item}>
        <Icon name='search' />
        <Input
          placeholder='Search'
          value={search}
          onChangeText={(text) => setSearch(text)}
          style={styles.input}
          rounded
        />
      </Item>
    </View>
  );
}; 

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  item: {
    backgroundColor: 'lightgray',
    borderRadius: 25,
  },
  input: {
    padding: 10,
  },
});

export default SearchCourses;