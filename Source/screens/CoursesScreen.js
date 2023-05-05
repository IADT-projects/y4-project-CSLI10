import React, { useState ,useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, ImageBackground, ActivityIndicator, Keyboard } from 'react-native';
// import courses from "../assets/list_courses.json"; 
import CourseSquare from "../components/CourseSquare"
import axios from "axios";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CoursesScreen = ({ navigation }) => {
  const [courses, setCourses] = useState(null);
  const [coursesList, setCoursesList] = useState(null);
  const [value, setValue] = useState("");
  const image = {
    uri: "https://www.hartough.com/uploads/Thumbnails/11th-hole-white-dogwood-augusta-national-golf-club-1996.jpg",
  };
  const imageForm = {
    uri: "https://cdn11.bigcommerce.com/s-k5xb3d5nlu/images/stencil/original/products/1018/4626/ANGC13Ri2570-Picture-Frame-Wall-Layouts-24x36-Rich-image1__58726.1647991906.jpg?c=2&imbypass=on&imbypass=on",
  };

  useEffect(() => {
    axios
      .get("https://golf-backend-app.vercel.app/api/courses")
      .then((response) => {
        // console.log(response.data);
        setCourses(response.data);
        getCourses(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const getCourses = (courses) => {
    if (courses) {
      setCoursesList(
        courses.filter(
          (course) =>
            course.name.toLowerCase().includes(value.toLowerCase()) ||
            course.location.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const searchCourses = () => {
    if (courses) {
      setCoursesList(
        courses.filter(
          (course) =>
            course.name.toLowerCase().includes(value.toLowerCase()) ||
            course.location.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
    Keyboard.dismiss();
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
            <Text style={styles.text}>Golf Courses</Text>
            <SearchBar
              setValue={setValue}
              value={value}
              searchCourses={searchCourses}
            />
          </View>

          <FlatList
            data={coursesList}
            numColumns={2}
            keyExtractor={(item) => item.name.toString()}
            renderItem={({ item }) => (
              <CourseSquare
                name={item.name}
                location={item.location}
                rating={item.rating}
                image_path={item.image_path[0]}
                onPress={() =>
                  navigation.navigate("ShowCourseScreen", { id: item._id })
                }
              />
            )}
          />
        </ImageBackground>
        {/* <Text style={styles.text}>Courses in Ireland</Text>
        <SearchBar />
        <FlatList
          data={courses}
          numColumns={2}
          keyExtractor={(item) => item.name.toString()}
          renderItem={({ item }) => (
            <CourseSquare name={item.name} location={item.location} rating={item.rating} image_path={item.image_path[0]} onPress={() => navigation.navigate('ShowCourseScreen', { id: item._id })} />
          )}
        /> */}
      </View>
    );
  }
};

const SearchBar = ({ setValue, value, searchCourses }) => {
  // const [search, setSearch] = useState('');

  return (
    <View style={styles.container2}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholder="Search Courses..."
      />
      <Button
        color="white"
        title="Search"
        onPress={() => searchCourses(value)}
      />
      {/* <TouchableOpacity>
        <Text style={styles.search}>Search <MaterialCommunityIcons name="send" size={14} color="white" /></Text>
      // </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  top: {
    paddingTop: 130,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 0,
    marginBottom: 10,
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

export default CoursesScreen;