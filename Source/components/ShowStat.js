import React, { useState, useEffect, useContext, useMemo } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie, VictoryLabel } from "victory-native";
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'native-base';

const ShowStat = ({ stat }) => {
  const { userInfo } = useContext(AuthContext);
  // const {stat}  = route.params;
  const totalFairways =
    userInfo.stats.fairway_missed_right +
    userInfo.stats.fairway_missed_left +
    userInfo.stats.fairways_hit;
  // const {stats, setStats} = useState(null);
  const { isLoading, setIsLoading } = useState(true);
  const scoresChart = useMemo(() => {
    let scoresArray = [];
    for (let i = 0; i < userInfo.played_courses.length; i++) {
      scoresArray.push({
        date: userInfo.played_courses[i].round.date_played,
        score: userInfo.played_courses[i].round.total_score,
      });
    }
    return scoresArray;
  }, []);
  const puttsChart = useMemo(() => {
    let puttsArray = [];
    for (let i = 0; i < userInfo.played_courses.length; i++) {
      puttsArray.push({
        date: userInfo.played_courses[i].round.date_played,
        score:
          Math.round((userInfo.played_courses[i].round.putts / 18) * 10) / 10,
      });
    }
    return puttsArray;
  }, []);
  // const {rounds, setRounds} = useState(null)
  const statsPie = [
    { x: "Eagle +", y: userInfo.stats.eagles + userInfo.stats.albatrosses },
    { x: "Bogey", y: userInfo.stats.bogeys },
    { x: "Birdie", y: userInfo.stats.birdies },
    { x: "Par", y: userInfo.stats.pars },
    { x: "Double +", y: userInfo.stats.double + userInfo.stats.triple_plus },
  ];

  const fairwaysPie = [
    { x: "Right", y: userInfo.stats.fairway_missed_right },
    { x: "Hit", y: userInfo.stats.fairways_hit },
    { x: "Left", y: userInfo.stats.fairway_missed_left },
  ];

  const percentage = Math.round(
    (userInfo.stats.greens_hit / (userInfo.stats.rounds_played * 18)) * 100
  );
  const radius = 100; // circle radius
  const circumference = radius * 2 * Math.PI; // circle circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference; // stroke dash offset

  while (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={"black"} size={50} />
      </View>
    );
  }

  if (stat === "Scores") {
    return (
      <View style={styles.scores}>
        <View style={styles.row}>
          <Text style={styles.title}>{stat} </Text>
          <MaterialCommunityIcons name="chart-bar" size={64} color="black" />
        </View>
        <ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}>
          <VictoryChart
            theme={VictoryTheme.material}
            width={100 + scoresChart.length * 50}
            domainPadding={{ x: 30 }}
          >
            <VictoryBar
              data={scoresChart}
              style={{ data: { fill: "#779dfa" }, labels: { fill: "black" } }}
              labels={({ datum }) => datum.score}
              labelComponent={<VictoryLabel dy={-5} />}
              // barRatio={1}
              barWidth={40}
              grouped={false}
              // animate={{
              //   duration: 2000,
              //   onLoad: { duration: 1000 },
              // }}
              alignment="middle"
              x="date"
              y="score"
            />
          </VictoryChart>
        </ScrollView>
        <Text style={styles.scoreText}>
          Average Score Overall:{" "}
          {Math.round(
            userInfo.stats.total_score / userInfo.stats.rounds_played
          )}
        </Text>
      </View>
    );
  } else if (stat === "Putts per Hole") {
    return (
      <View style={styles.scores}>
        <View style={styles.row}>
          <Text style={styles.title}>{stat} </Text>
          <MaterialCommunityIcons name="chart-bar" size={64} color="black" />
        </View>
        <ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}>
          <VictoryChart
            theme={VictoryTheme.material}
            width={100 + puttsChart.length * 50}
            domainPadding={{ x: 30 }}
          >
            <VictoryBar
              data={puttsChart}
              style={{ data: { fill: "#779dfa" }, labels: { fill: "black" } }}
              labels={({ datum }) => datum.score}
              labelComponent={<VictoryLabel dy={-5} />}
              barWidth={40}
              // animate={{
              //   duration: 2000,
              //   onLoad: { duration: 1000 },
              // }}
              alignment="middle"
              x="date"
              y="score"
            />
          </VictoryChart>
        </ScrollView>
        <Text style={styles.scoreText}>
          Average Putts:{" "}
          {Math.round(
            (userInfo.stats.putts / userInfo.stats.rounds_played / 18) * 10
          ) / 10}
        </Text>
      </View>
    );
  }
  //       if(stat === "Scores"){
  //         return (
  //             <MyTable data={scoresChart} />
  //         )
  //   }
  else if (stat === "Score Distribution") {
    return (
      <>
        <View style={styles.row}>
          <Text style={styles.title}>{stat} </Text>
          <MaterialCommunityIcons name="golf" size={64} color="black" />
        </View>
        <VictoryPie
          width={350}
          theme={VictoryTheme.material}
          colorScale={["#1cb41c", "#E83b3b", "gold", "#34aff6", "#A82eb9"]}
          data={statsPie}
          style={{ labels: { fill: "black" } }}
          labels={({ datum }) =>
            `${Math.round(
              (datum.y / (userInfo.stats.rounds_played * 18)) * 100
            )}%`
          }
          labelComponent={<VictoryLabel dy={0} dx={0} />}
          animate={{
            duration: 2000,
          }}
        />
        <View style={styles.row}>
          <Svg width={120} height={50}>
            <Circle
              cx={25}
              cy={25}
              r={15} // subtract 10 from radius to create space for stroke width
              fill="#1cb41c"
              strokeWidth={1} // circle stroke width
              stroke="grey"
            />
            <SvgText
              x={45}
              y={30}
              fontSize={12}
              fill="#000" // percentage text color
              textAnchor="right"
              alignmentBaseline="right"
            >
              Eagle +
            </SvgText>
          </Svg>
          <Svg width={120} height={50}>
            <Circle
              cx={25}
              cy={25}
              r={15} // subtract 10 from radius to create space for stroke width
              fill="#E83b3b"
              strokeWidth={1} // circle stroke width
              stroke="grey"
            />
            <SvgText
              x={45}
              y={30}
              fontSize={12}
              fill="#000" // percentage text color
              textAnchor="right"
              alignmentBaseline="right"
            >
              Bogey
            </SvgText>
          </Svg>
          <Svg width={120} height={50}>
            <Circle
              cx={25}
              cy={25}
              r={15} // subtract 10 from radius to create space for stroke width
              fill="gold"
              strokeWidth={1} // circle stroke width
              stroke="grey"
            />
            <SvgText
              x={45}
              y={30}
              fontSize={12}
              fill="#000" // percentage text color
              textAnchor="right"
              alignmentBaseline="right"
            >
              Birdie
            </SvgText>
          </Svg>
        </View>
        <View style={styles.row}>
          <Svg width={120} height={50}>
            <Circle
              cx={25}
              cy={25}
              r={15} // subtract 10 from radius to create space for stroke width
              fill="#34aff6"
              strokeWidth={1} // circle stroke width
              stroke="grey"
            />
            <SvgText
              x={45}
              y={30}
              fontSize={12}
              fill="#000" // percentage text color
              textAnchor="right"
              alignmentBaseline="right"
            >
              Par
            </SvgText>
          </Svg>
          <Svg width={120} height={50}>
            <Circle
              cx={25}
              cy={25}
              r={15} // subtract 10 from radius to create space for stroke width
              fill="#A82eb9"
              strokeWidth={1} // circle stroke width
              stroke="grey"
            />
            <SvgText
              x={45}
              y={30}
              fontSize={12}
              fill="#000" // percentage text color
              textAnchor="right"
              alignmentBaseline="right"
            >
              Double +
            </SvgText>
          </Svg>
        </View>
      </>
    );
  } else if (stat === "Fairways Hit") {
    return (
      <>
        <View style={styles.rowFairway}>
          <Text style={styles.title}>{stat} </Text>
          <MaterialCommunityIcons name="golf-tee" size={64} color="black" />
        </View>

        <VictoryPie
          width={400}
          height={400}
          theme={VictoryTheme.material}
          colorScale={["#E83b3b", "#1cb41c", "gold"]}
          data={fairwaysPie}
          startAngle={90}
          endAngle={-90}
          style={{ labels: { fill: "black" } }}
          labels={({ datum }) =>
            `${Math.round((datum.y / totalFairways) * 100)}%`
          }
          labelComponent={<VictoryLabel dy={0} dx={-10} />}
          animate={{
            duration: 2000,
          }}
        />
        <View style={styles.rowFairway}>
          <Svg width={120} height={50}>
            <Circle
              cx={25}
              cy={25}
              r={15} // subtract 10 from radius to create space for stroke width
              fill="gold"
              strokeWidth={1} // circle stroke width
              stroke="grey"
            />
            <SvgText
              x={45}
              y={30}
              fontSize={12}
              fill="#000" // percentage text color
              textAnchor="right"
              alignmentBaseline="right"
            >
              Missed Left
            </SvgText>
          </Svg>
          <Svg width={120} height={50}>
            <Circle
              cx={25}
              cy={25}
              r={15} // subtract 10 from radius to create space for stroke width
              fill="#1cb41c"
              strokeWidth={1} // circle stroke width
              stroke="grey"
            />
            <SvgText
              x={45}
              y={30}
              fontSize={12}
              fill="#000" // percentage text color
              textAnchor="right"
              alignmentBaseline="right"
            >
              Fairway Hit
            </SvgText>
          </Svg>
          <Svg width={120} height={50}>
            <Circle
              cx={25}
              cy={25}
              r={15} // subtract 10 from radius to create space for stroke width
              fill="#E83b3b"
              strokeWidth={1} // circle stroke width
              stroke="grey"
            />
            <SvgText
              x={45}
              y={30}
              fontSize={12}
              fill="#000" // percentage text color
              textAnchor="right"
              alignmentBaseline="right"
            >
              Missed Right
            </SvgText>
          </Svg>
        </View>
      </>
    );
  } else if (stat === "Green in Regulation") {
    return (
      <>
        <View style={styles.rowFairway}>
          <Text style={styles.title}>{stat} </Text>
          <MaterialCommunityIcons name="target" size={64} color="black" />
        </View>
        <View style={{ alignItems: "center" }}>
          <Svg width={radius * 2} height={radius * 2}>
            <Circle
              cx={radius}
              cy={radius}
              r={radius - 10} // subtract 10 from radius to create space for stroke width
              // fill="#ccc" // grey color
              strokeWidth={10} // circle stroke width
              stroke="grey"
            />
            <Circle
              cx={radius}
              cy={radius}
              r={radius - 10} // subtract 10 from radius to create space for stroke width
              fill="transparent"
              stroke="#45bb2b" // circle stroke color
              strokeWidth={10} // circle stroke width
              strokeDasharray={`${circumference}, ${circumference}`}
              strokeDashoffset={strokeDashoffset + 25}
            />

            <SvgText
              x={radius}
              y={radius}
              fontSize={24}
              fontWeight={"bold"}
              fill="#000" // percentage text color
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {`${percentage}%`}
            </SvgText>
          </Svg>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    width: 175,
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
  scoreText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 100,
    marginTop: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 15,
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
  row: {
    flexDirection: "row",
  },
  rowFairway: {
    flexDirection: "row",
    marginTop: -100,
    marginBottom: 25,
  },
  scores: {
    marginTop: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ShowStat;