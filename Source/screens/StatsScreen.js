import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Button, FlatList, ImageBackground } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie } from "victory-native";
import StatCard from '../components/StatCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const StatsScreen = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext);
  const image = {
    uri: "https://www.hartough.com/uploads/Thumbnails/11th-hole-white-dogwood-augusta-national-golf-club-1996.jpg",
  };
  // const {stats, setStats} = useState(null);
  // const {rounds, setRounds} = useState(null)
  const statsPie = [
    { x: "Eagle +", y: userInfo.stats.eagles + userInfo.stats.albatrosses },
    { x: "Bogey", y: userInfo.stats.bogeys },
    { x: "Birdie", y: userInfo.stats.birdies },
    { x: "Double +", y: userInfo.stats.double + userInfo.stats.triple_plus },
    { x: "Par", y: userInfo.stats.pars },
  ];

  // const scoresChart = [
  //   { date: userInfo.played_courses[0].round.date_played, score: userInfo.played_courses[0].round.total_score },
  //   { date: userInfo.played_courses[1].round.date_played, score: userInfo.played_courses[1].round.total_score }
  // ]

  const statsOptions = [
    { stat: "Scores", icon: "chart-bar" },
    { stat: "Score Distribution", icon: "chart-pie" },
    { stat: "Fairways Hit", icon: "arrow-decision-outline" },
    { stat: "Green in Regulation", icon: "chart-donut" },
    { stat: "Putts per Hole", icon: "sort-numeric-ascending" },
  ];

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.top}>
          <MaterialCommunityIcons
            name="chart-timeline-variant-shimmer"
            size={74}
            color="white"
          />
          <Text style={styles.title}>Statistics</Text>
        </View>

        <FlatList
          data={statsOptions}
          numColumns={2}
          keyExtractor={(item) => item.stat}
          renderItem={({ item }) => (
            <StatCard
              stat={item.stat}
              icon={item.icon}
              onPress={() =>
                navigation.navigate("SingleStatScreen", { stat: item.stat })
              }
            />
          )}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white'
  }, 
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 0,
    marginVertical: 1,
  },
});

export default StatsScreen;