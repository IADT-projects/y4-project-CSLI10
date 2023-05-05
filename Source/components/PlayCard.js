import React from "react";
import { Text, StyleSheet, TouchableOpacity, View, ImageBackground } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PlayCard = ({ onPress, navigation, course }) => {
  // const {course} = route.params
  return (
    <View style={styles.cardContainer} onPress={onPress}>
      <ImageBackground
        style={styles.stretch}
        source={{
          uri: `${course.image_path[1]}`,
        }}
      >
        <View style={styles.row}>
          <View>
            <Text style={styles.name}>{course.name}</Text>
            <Text style={styles.body}>{course.location}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.playB} onPress={onPress}>
          <View style={styles.playRow}>
            <Text style={styles.play}>Play </Text>
            <MaterialCommunityIcons name="play" size={30} color="white" />
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    padding: 0,
    width: 400,
    height: 160,
    borderWidth: 1.5,
    borderColor: "white",
    justifyContent: "center",
    marginVertical: 5,
  },
  stretch: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "auto",
    marginBottom: 10,
    color: "white",
  },
  play: {
    fontSize: 20,
    // textAlign: 'center',
    marginBottom: 10,
    paddingTop: 3,
    color: "white",
  },
  body: {
    fontSize: 16,
    // textAlign: 'center',
    marginBottom: 10,
    color: "white",
  },
  row: {
    paddingLeft: 10,
    paddingRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 60,
  },
  playRow: {
    flexDirection: "row",
    justifyContent: "left",
  },
  playB: {
    alignItems: "flex-end",
    paddingRight: 10,
  },
});

export default PlayCard;
