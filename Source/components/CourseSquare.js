import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';

const CourseSquare = ({ name, location, rating, image_path, onPress }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <ImageBackground
        style={styles.stretch}
        source={{
          uri: `${image_path}`,
        }}
      >
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.body}>{location}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "transparent",
    width: 200,
    height: 110,
    borderWidth: 1.5,
    borderColor: "white",
    marginVertical: 5,
    marginHorizontal: 3,
  },
  stretch: {
    width: "100%",
    height: 107,
    resizeMode: "stretch",
    paddingTop: 28,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "white",
  },
  body: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 10,
    color: "white",
  },
});

export default CourseSquare;