import React, { useState ,useEffect, useContext, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, ImageBackground, ActivityIndicator } from 'react-native';
// import courses from "../assets/list_courses.json"; 
import CourseSquare from "../components/CourseSquare"
import PlayCard from '../components/PlayCard';
import axios from "axios";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import RoundReview from '../components/RoundReview';
import PreviousRound from '../components/PreviousRound';

const PreviousRoundsScreen = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext);
  const [courses, setCourses] = useState(null);
  const [coursesList, setCoursesList] = useState(null);
  const [playedCourses, setPlayedCourses] = useState(
    userInfo.played_courses.reverse()
  );
  const image = {
    uri: "https://www.hartough.com/uploads/Thumbnails/11th-hole-white-dogwood-augusta-national-golf-club-1996.jpg",
  };
  //   const playedCourses = userInfo.played_courses.reverse();

  useEffect(() => {
    axios
      .get("https://golf-backend-app.vercel.app/api/courses")
      .then((response) => {
        // console.log(response.data);
        setCourses(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const getCourse = (id) => {
    let course = null;
    for (let i = 0; i < courses.length; i++) {
      if (courses[i]._id === id) {
        course = courses[i];
      }
    }

    return course;
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
            <Text style={styles.start}>Previous Rounds</Text>
          </View>

          {/* <PlayCard course={favCourse} onPress={() => navigation.navigate('HoleScreen', { course: favCourse })}/> 
      <PlayCard course={favCourse} onPress={() => navigation.navigate('HoleScreen', { course: favCourse })}/>  */}
          <View style={styles.list}>
            <FlatList
              data={playedCourses}
              keyExtractor={(item) => item.round_id.toString()}
              renderItem={({ item }) => (
                <View style={styles.roundCard}>
                  <PreviousRound
                    round={item.round}
                    course={getCourse(item.course)}
                  />
                </View>
              )}
            />
          </View>
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
  roundCard: {
    margin: 10,
    width: "100%",
  },
  list: {
    width: "100%",
  },
  start: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "white",
  },
  top: {
    paddingTop: 160,
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

export default PreviousRoundsScreen;