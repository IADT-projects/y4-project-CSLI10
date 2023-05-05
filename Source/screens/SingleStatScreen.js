import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import ShowStat from '../components/ShowStat';

const SingleStatScreen = ({ navigation, route }) => {
  const { stat } = route.params;
  const image = {
    uri: "https://www.hartough.com/uploads/Thumbnails/11th-hole-white-dogwood-augusta-national-golf-club-1996.jpg",
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.card}>
          {/* <Text style={styles.title}>{stat}</Text> */}
          <ShowStat stat={stat} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 0,
    marginVertical: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20
  },
  card: {
    height: '80%',
    width: '95%',
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    margin: 10,
    // paddingRight: 20,
    // paddingLeft: 20
  },
});

export default SingleStatScreen; 