import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const StatCard = ({ stat, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Text style={styles.name}>{stat}</Text>
      <MaterialCommunityIcons name={icon} size={110} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    width: 180,
    height: 160,
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  body: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 10,
  },
});

export default StatCard;