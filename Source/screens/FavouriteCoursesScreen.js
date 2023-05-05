import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
// import courses from "../assets/list_courses.json";
import CourseSquare from "../components/CourseSquare";
import PlayCard from "../components/PlayCard";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

const FavouriteCoursesScreen = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext);
  const [courses, setCourses] = useState(null);
  const [coursesList, setCoursesList] = useState(null);
  const image = {
    uri: "https://www.hartough.com/uploads/Thumbnails/11th-hole-white-dogwood-augusta-national-golf-club-1996.jpg",
  };

  useEffect(() => {
    axios
      .get("https://golf-backend-app.vercel.app/api/courses")
      .then((response) => {
        // console.log(response.data);
        setCourses(response.data);
        getFavs(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const getFavs = (courses) => {
    let favArray = [];
    if (courses) {
      for (let i = 0; i < userInfo.favourite_courses.length; i++) {
        for (let j = 0; j < courses.length; j++) {
          if (courses[j]._id === userInfo.favourite_courses[i]) {
            favArray.push(courses[j]);
            console.log(courses[j].name);
          }
        }
      }
      // setTimeout(1000, getFavs);
      setCoursesList(favArray);
    }
  };

  if (!courses) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={"black"} size={50} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.top}>
            <MaterialCommunityIcons name="golf" size={84} color="white" />
            <Text style={styles.start}>Favourite Courses</Text>
          </View>

          {/* <PlayCard course={favCourse} onPress={() => navigation.navigate('HoleScreen', { course: favCourse })}/> 
      <PlayCard course={favCourse} onPress={() => navigation.navigate('HoleScreen', { course: favCourse })}/>  */}
          <FlatList
            data={coursesList}
            keyExtractor={(item) => item.name.toString()}
            renderItem={({ item }) => (
              <PlayCard
                course={item}
                onPress={() =>
                  navigation.navigate("HoleScreen", { course: item })
                }
              />
            )}
          />
        </ImageBackground>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  start: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "white",
  },
  top: {
    paddingTop: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "white",
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  image: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    borderRadius: 0,
    marginVertical: 1,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 40,
    backgroundColor: "white",
    height: 40,
  },
});

export default FavouriteCoursesScreen;
