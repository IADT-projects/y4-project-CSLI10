import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Button, Image, ActivityIndicator, ScrollView, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

const ShowCourseScreen = ({ navigation, route }) => {
  const { userInfo } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const { id } = route.params;
  const image = {
    uri: "https://www.hartough.com/uploads/Thumbnails/11th-hole-white-dogwood-augusta-national-golf-club-1996.jpg",
  };
  // const {course}  = route.params;

  useEffect(() => {
    axios
      .get(`https://golf-backend-app.vercel.app/api/courses/${id}`)
      .then((response) => {
        console.log(response.data);
        setCourse(response.data);
        console.log(id);
        console.log(course);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh]);

  const makeFav = () => {
    let favs = userInfo.favourite_courses;
    favs.push(id);
    axios
      .put(`https://golf-backend-app.vercel.app/api/users/${userInfo._id}`, {
        favourite_courses: favs,
      })
      .then((response) => {
        console.log("favourited");
        console.log(response.data);
        setRefresh(refresh + 1);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteFav = () => {
    let index = null;
    let favs = userInfo.favourite_courses;

    for (let i = 0; i < userInfo.favourite_courses.length; i++) {
      if (userInfo.favourite_courses[i] === id) {
        index = i;
      }
    }

    favs.splice(index, 1);

    axios
      .put(`https://golf-backend-app.vercel.app/api/users/${userInfo._id}`, {
        favourite_courses: favs,
      })
      .then((response) => {
        console.log("unfavourited");
        console.log(response.data);
        setRefresh(refresh + 1);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const FollowButton = () => {
    if (userInfo.favourite_courses.includes(id)) {
      return (
        <TouchableOpacity style={styles.following} onPress={() => deleteFav()}>
          <Text style={styles.followedText}>
            Favourited{" "}
            <MaterialCommunityIcons name="heart" size={15} color="white" />
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.follow} onPress={() => makeFav()}>
          <Text style={styles.followText}>
            Favourite{" "}
            <MaterialCommunityIcons
              name="heart-outline"
              size={15}
              color="black"
            />
          </Text>
        </TouchableOpacity>
      );
    }
  };

  if (course != null) {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.card}>
            <Image
              style={styles.stretch}
              source={{
                uri: `${course.image_path[1]}`,
              }}
            />
            <View style={styles.rowHeart}>
              <Text style={styles.name}>{course.name}</Text>
              {/* <HeartButton /> */}
            </View>
            {/* <Text style={styles.name}>{course.name}</Text> 
        <HeartButton /> */}
            <FollowButton />
            <Text style={styles.location}>{course.location}</Text>
            <Text style={styles.location}>Rating: {course.rating}</Text>
            <Text style={styles.description} numberOfLines={0}>
              {course.description}
            </Text>
            <Text style={styles.scorecard}>Scorecard</Text>
            <View style={styles.rowScore}>
              <View style={styles.header}>
                <Text style={[styles.cell, styles.headerText]}>Hole</Text>
                <Text style={[styles.cell, styles.headerText]}>Index</Text>
                <Text style={[styles.cell, styles.headerText]}>Par</Text>
                <Text style={[styles.cell, styles.headerText]}>Yards</Text>
              </View>
              <ScrollView horizontal>
                <View>
                  <FlatList
                    horizontal={true}
                    scrollEnabled={false}
                    data={course.scorecard}
                    keyExtractor={(item) => item.hole.toString()}
                    renderItem={({ item }) => (
                      <Text style={[styles.cell2, styles.item]}>
                        {" "}
                        {item.hole}{" "}
                      </Text>
                    )}
                  />
                  <FlatList
                    horizontal={true}
                    scrollEnabled={false}
                    data={course.scorecard}
                    keyExtractor={(item) => item.hole.toString()}
                    renderItem={({ item }) => (
                      <Text style={[styles.cell2, styles.item]}>
                        {" "}
                        {item.index}{" "}
                      </Text>
                    )}
                  />
                  <FlatList
                    horizontal={true}
                    scrollEnabled={false}
                    data={course.scorecard}
                    keyExtractor={(item) => item.hole.toString()}
                    renderItem={({ item }) => (
                      <Text style={[styles.cell2, styles.item]}>
                        {" "}
                        {item.par}{" "}
                      </Text>
                    )}
                  />
                  <FlatList
                    horizontal={true}
                    scrollEnabled={false}
                    data={course.scorecard}
                    keyExtractor={(item) => item.hole.toString()}
                    renderItem={({ item }) => (
                      <Text style={[styles.cell2, styles.item]}>
                        {" "}
                        {item.yards}{" "}
                      </Text>
                    )}
                  />
                </View>
              </ScrollView>
            </View>
            {/* <View style={styles.divider} /> */}
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("HoleScreen", { course: course })
                }
              >
                <Text style={styles.play}>
                  Play{" "}
                  <MaterialCommunityIcons
                    name="play-circle"
                    size={20}
                    color="black"
                  />
                </Text>
              </TouchableOpacity>
              {/* <Button title={'Play'} onPress={() => navigation.navigate('HoleScreen', { course: course })}/>
          <Button title={'Website'}/> */}
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={"black"} size={80} />
      </View>
    );
  }
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  divider: {
    borderBottomColor: '#6e6e6e',
    borderBottomWidth: 1,
    marginTop: 0,
  },
  follow: {
    marginLeft: 10,
    marginVertical: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: 'black',
    backgroundColor: 'white',
    height: 30,
    width: 100
  },
  following: {
    marginLeft: 10,
    marginVertical: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: 'black',
    backgroundColor: 'black',
    height: 30,
    width: 100
  },
  followText: {
    fontSize: 14,
    // fontWeight: 'bold'
  },
  followedText: {
    color: 'white',
    fontSize: 14
  },
  scorecard: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: '35%',
    marginBottom: 10,
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 0,
    marginVertical: 1,
  },
  play: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '95%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    margin: 10
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    paddingLeft: 10
  },
  location: {
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#4b4b4b'
  },
  description: {
    fontSize: 14,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10, 
    paddingBottom: 10
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    backgroundColor: 'white',
    height: 50
  },
  stretch: {
    width: '100%',
    height: 250,
    resizeMode: 'stretch',
  },
  row: {
    flexDirection: 'row',
    marginLeft: '40%',
    marginVertical: 10
  },
  cardContainer: {
    height: 200,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 1,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
  },
  cell2: {
    width: 45,
    alignItems: 'center',
    fontWeight: 'bold',
    justifyContent: "center",
    backgroundColor: "#F0f0f0",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
  },
  headerText: {
    fontWeight: "bold",
  },
  rowScore: {
    flexDirection: 'row',
    margin: 10
  },
  rowHeart: {
    flexDirection: 'row'
  },
  heart: {
    paddingTop: 7,
    alignItems: 'flex-end'
  }
});

export default ShowCourseScreen;