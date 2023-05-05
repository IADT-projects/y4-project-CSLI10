import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, HStack } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';

const MeScreen = ({ navigation, route }) => {

  const {logout, getUser, userInfo} = useContext(AuthContext)

  const image = {
    uri: "https://www.hartough.com/uploads/Thumbnails/11th-hole-white-dogwood-augusta-national-golf-club-1996.jpg",
  };

  useEffect(() => {
    getUser(userInfo._id);
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Me</Text> */}
      <ImageBackground source={image} resizeMode="cover" style={styles.card}>
        {/* <View style={styles.buttonBig}> */}
        <MaterialCommunityIcons name="golf-cart" size={64} color="white" />
        <Text style={styles.text}>Hi {userInfo.name}!</Text>
        {/* </View> */}
        {/* <TouchableOpacity style={styles.button}> 
         <Text style={styles.settings}><Icon style={styles.icon} name="create" size={20}/> Edit Profile</Text>  
      </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("StatsScreen")}
        >
          <Text style={styles.settings}>
            <Icon style={styles.icon} name="trending-up" size={20} /> Stats
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("FavouriteCoursesScreen")}
        >
          <Text style={styles.settings}>
            <Icon style={styles.icon} name="heart" size={20} /> Favourite
            Courses
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("PreviousRoundsScreen")}
        >
          <Text style={styles.settings}>
            <Icon style={styles.icon} name="ios-play-back-outline" size={20} />{" "}
            Previous Rounds
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            logout();
          }}
        >
          <Text style={styles.settings}>
            <Icon style={styles.icon} name="log-out-outline" size={20} /> Sign
            Out
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
  
 
const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    alignItems: 'center',
  }, 
  card: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 1,
  },
  button: {
    justifyContent: 'center',  
    backgroundColor: '#FFFFFF', 
    borderRadius: 10,
    marginTop: 2,
    padding: 10,
    width: 400,
    height: 50
  },
  buttonBig: {
    justifyContent: 'center',  
    alignItems: 'center',
    backgroundColor: 'black', 
    margin: 5,
    padding: 10,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'white',

    width: 150,
    height: 150
  },
  text: { 
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 10
  },
  settings: {
    fontSize: 20
  },
  icon: {
    
  }
});

export default MeScreen;