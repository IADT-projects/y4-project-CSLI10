import React from "react";
import { Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, View, } from "react-native";

const RoundReview = ({ form, course }) => {
  const ScoreText = () => {
    let showScore = 0;
    let total = 0;
    for (let i = 0; i < form.length; i++) {
      if (form[i].score) {
        showScore += form[i].score - course.scorecard[i].par;
        total += form[i].score;
      }
    }
    // setScore(showScore);
    if (showScore === 0) {
      return <Text style={styles.score}>{total} (E) </Text>;
    } else if (showScore < 0) {
      return (
        <Text style={styles.score}>
          {" "}
          {total} ({showScore}){" "}
        </Text>
      );
    } else if (showScore > 0) {
      return (
        <Text style={styles.score}>
          {" "}
          {total} (+{showScore}){" "}
        </Text>
      );
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View>
        <Text style={styles.name}>{course.name}</Text>
        <ScoreText />
      </View>

      <View style={styles.row}>
        <View style={styles.header}>
          <Text style={[styles.cell, styles.headerText]}>Hole</Text>
          <Text style={[styles.cell, styles.headerText]}>Par</Text>
          <Text style={[styles.cell, styles.headerText]}>Index</Text>
          <Text style={[styles.cell, styles.headerText]}>Score</Text>
          <Text style={[styles.cell, styles.headerText]}>Putts</Text>
        </View>
        <ScrollView horizontal>
          <View>
            <FlatList
              horizontal={true}
              scrollEnabled={false}
              data={form}
              keyExtractor={(item) => item.hole.toString()}
              renderItem={({ item }) => (
                <Text style={[styles.cell2, styles.item]}> {item.hole} </Text>
              )}
            />
            <FlatList
              horizontal={true}
              scrollEnabled={false}
              data={course.scorecard}
              keyExtractor={(item) => item.hole.toString()}
              renderItem={({ item }) => (
                <Text style={[styles.cell2, styles.item]}> {item.par} </Text>
              )}
            />
            <FlatList
              horizontal={true}
              scrollEnabled={false}
              data={course.scorecard}
              keyExtractor={(item) => item.hole.toString()}
              renderItem={({ item }) => (
                <Text style={[styles.cell2, styles.item]}> {item.index} </Text>
              )}
            />
            <FlatList
              horizontal={true}
              scrollEnabled={false}
              data={form}
              keyExtractor={(item) => item.hole.toString()}
              renderItem={({ item }) => (
                <Text style={[styles.cell2, styles.item]}> {item.score} </Text>
              )}
            />
            <FlatList
              horizontal={true}
              scrollEnabled={false}
              data={form}
              keyExtractor={(item) => item.hole.toString()}
              renderItem={({ item }) => (
                <Text style={[styles.cell2, styles.item]}> {item.putts} </Text>
              )}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    height: 200,
  },
  // item: {
  //   borderRadius: 100,
  //   borderWidth: 1,
  //   fontWeight: 'bold'
  // },
  cardContainer: {
    width: "95%",
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 1,
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
    width: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0f0f0",
    borderWidth: 1,
    fontWeight: "bold",
    borderColor: "#ccc",
    padding: 5,
  },
  headerText: {
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
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
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  score: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },
  body: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 10,
  },
  row: {
    marginLeft: 0,
    marginRight: 0,
    flexDirection: "row",
  },
});

export default RoundReview;
