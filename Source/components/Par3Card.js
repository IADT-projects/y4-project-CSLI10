import React, { useState } from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
 
const Par3Card = ({ scorecard, i, handleForm, nextHole, form }) => {
  const [oneScore, setOneScore] = useState(null);
  const [fairway, setFairway] = useState(null);
  const [green, setGreen] = useState(null);
  const [putts, setPutts] = useState(null);

  const getIconScore = (value) => {
    if (value === 1) return "numeric-1-circle";
    else if (value === 2) return "numeric-2-circle-outline";
    else if (value === 3) return "numeric-3";
    else if (value === 4) return "numeric-4-box-outline";
    else if (value === 5) return "numeric-5-box";
    else if (value === 6) return "numeric-6-box";
    else if (value === 7) return "numeric-7-box";
    else if (value === 8) return "numeric-8-box";
    else if (value === 9) return "numeric-9-box";
    else if (value === 10) return "numeric-10-box-multiple";
  };

  const getIconFairway = (value) => {
    if (value === "missed_left") return "arrow-top-left-thick";
    else if (value === "yes") return "check-bold";
    else if (value === "missed_right") return "arrow-top-right-thick";
  };

  const getIconGreen = (value) => {
    if (value === "no") return "close-circle-outline";
    else if (value === "yes") return "check-bold";
  };

  const getIconPutts = (value) => {
    if (value === 0) return "numeric-0-circle-outline";
    else if (value === 1) return "numeric-1-circle-outline";
    else if (value === 2) return "numeric-2-circle-outline";
    else if (value === 3) return "numeric-3-circle-outline";
    else if (value === 4) return "numeric-4-circle-outline";
  };

  const ShowScores = () => {
    if (form[i]["score"] !== null) {
      setOneScore(getIconScore(form[i]["score"]));
    } else if (form[i]["score"] === null) {
      setOneScore(null);
    }

    if (oneScore !== null) {
      return (
        <TouchableOpacity
          style={styles.oneScore}
          onPress={() => {
            setOneScore(null);
            handleForm("score", i, null);
          }}
        >
          <MaterialCommunityIcons name={oneScore} size={70} color="black" />
        </TouchableOpacity>
      );
    }
    return (
      <>
        <View style={styles.iconsRow}>
          <TouchableOpacity
            onPress={() => {
              setOneScore("numeric-1-circle");
              handleForm("score", i, 1);
            }}
          >
            <MaterialCommunityIcons
              name="numeric-1-circle"
              size={50}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOneScore("numeric-2-circle-outline");
              handleForm("score", i, 2);
            }}
          >
            <MaterialCommunityIcons
              name="numeric-2-circle-outline"
              size={50}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOneScore("numeric-3");
              handleForm("score", i, 3);
            }}
          >
            <MaterialCommunityIcons name="numeric-3" size={50} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOneScore("numeric-4-box-outline");
              handleForm("score", i, 4);
            }}
          >
            <MaterialCommunityIcons
              name="numeric-4-box-outline"
              size={50}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOneScore("numeric-5-box");
              handleForm("score", i, 5);
            }}
          >
            <MaterialCommunityIcons
              name="numeric-5-box"
              size={50}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOneScore("numeric-6-box");
              handleForm("score", i, 6);
            }}
          >
            <MaterialCommunityIcons
              name="numeric-6-box"
              size={50}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.iconsRow}>
          <TouchableOpacity
            onPress={() => {
              setOneScore("numeric-7-box");
              handleForm("score", i, 7);
            }}
          >
            <MaterialCommunityIcons
              name="numeric-7-box"
              size={50}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOneScore("numeric-8-box");
              handleForm("score", i, 8);
            }}
          >
            <MaterialCommunityIcons
              name="numeric-8-box"
              size={50}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOneScore("numeric-9-box");
              handleForm("score", i, 9);
            }}
          >
            <MaterialCommunityIcons
              name="numeric-9-box"
              size={50}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOneScore("numeric-10-box-multiple");
              handleForm("score", i, 10);
            }}
          >
            <MaterialCommunityIcons
              name="numeric-10-box-multiple"
              size={50}
              color="black"
            />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => setOneScore("numeric-2-circle-outline")}>
              <MaterialCommunityIcons name="dots-horizontal" size={50} color="black" />
          </TouchableOpacity> */}
        </View>
      </>
    );
  };

  const ShowFairways = () => {
    if (form[i]["fairway"] !== null) {
      setFairway(getIconFairway(form[i]["fairway"]));
    } else if (form[i]["fairway"] === null) {
      setFairway(null);
    }

    if (fairway !== null) {
      return (
        <>
          <View style={styles.fairwaysRow}>
            <Text style={styles.body}>Fairway Hit</Text>
            <View style={styles.extrasRow}>
              <TouchableOpacity
                onPress={() => {
                  setFairway(null);
                  handleForm("fairway", i, null);
                }}
              >
                <MaterialCommunityIcons
                  name={fairway}
                  size={40}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
        </>
      );
    }

    return (
      <>
        <View style={styles.fairwaysRow}>
          <Text style={styles.body}>Fairway Hit</Text>
          <View style={styles.extrasRow}>
            <TouchableOpacity
              onPress={() => {
                setFairway("arrow-top-left-thick");
                handleForm("fairway", i, "missed_left");
              }}
            >
              <MaterialCommunityIcons
                name="arrow-top-left-thick"
                size={40}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFairway("check-bold");
                handleForm("fairway", i, "yes");
              }}
            >
              <MaterialCommunityIcons
                name="check-bold"
                size={35}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFairway("arrow-top-right-thick");
                handleForm("fairway", i, "missed_right");
              }}
            >
              <MaterialCommunityIcons
                name="arrow-top-right-thick"
                size={40}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  const ShowGreens = () => {
    if (form[i]["green"] !== null) {
      setGreen(getIconGreen(form[i]["green"]));
    } else if (form[i]["green"] === null) {
      setGreen(null);
    }
    if (green !== null) {
      return (
        <>
          <View style={styles.greensRow}>
            <Text style={styles.body}>Green in Regulation</Text>
            <TouchableOpacity
              onPress={() => {
                setGreen(null);
                handleForm("green", i, null);
              }}
            >
              <MaterialCommunityIcons name={green} size={35} color="black" />
            </TouchableOpacity>
          </View>
        </>
      );
    }
    return (
      <>
        <View style={styles.greensRow}>
          <Text style={styles.body}>Green in Regulation</Text>
          <TouchableOpacity
            onPress={() => {
              setGreen("check-bold");
              handleForm("green", i, "yes");
            }}
          >
            <MaterialCommunityIcons name="check-bold" size={35} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setGreen("close-circle-outline");
              handleForm("green", i, "no");
            }}
          >
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={35}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const ShowPutts = () => {
    if (form[i]["putts"] !== null) {
      setPutts(getIconPutts(form[i]["putts"]));
    } else if (form[i]["putts"] === null) {
      setPutts(null);
    }
    if (putts !== null) {
      return (
        <>
          <View style={styles.puttsRow}>
            <Text style={styles.body}>Putts</Text>
            <View style={styles.extrasRow2}>
              <TouchableOpacity
                onPress={() => {
                  setPutts(null);
                  handleForm("putts", i, null);
                }}
              >
                <MaterialCommunityIcons name={putts} size={35} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </>
      );
    }

    return (
      <>
        <View style={styles.puttsRow}>
          <Text style={styles.body}>Putts</Text>
          <View style={styles.extrasRow2}>
            <TouchableOpacity
              onPress={() => {
                setPutts("numeric-0-circle-outline");
                handleForm("putts", i, 0);
              }}
            >
              <MaterialCommunityIcons
                name="numeric-0-circle-outline"
                size={35}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPutts("numeric-1-circle-outline");
                handleForm("putts", i, 1);
              }}
            >
              <MaterialCommunityIcons
                name="numeric-1-circle-outline"
                size={35}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPutts("numeric-2-circle-outline");
                handleForm("putts", i, 2);
              }}
            >
              <MaterialCommunityIcons
                name="numeric-2-circle-outline"
                size={35}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPutts("numeric-3-circle-outline");
                handleForm("putts", i, 3);
              }}
            >
              <MaterialCommunityIcons
                name="numeric-3-circle-outline"
                size={35}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPutts("numeric-4-circle-outline");
                handleForm("putts", i, 4);
              }}
            >
              <MaterialCommunityIcons
                name="numeric-4-circle-outline"
                size={35}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.hole}>Hole: {scorecard[i].hole}</Text>
      <View style={styles.row}>
        <Text style={styles.par}>Par {scorecard[i].par}</Text>
        <Text style={styles.par}>{scorecard[i].yards} yards</Text>
        <Text style={styles.par}>Index {scorecard[i].index}</Text>
      </View>
      <ShowScores />
      <ShowFairways />
      <ShowGreens />
      <ShowPutts />
      <View style={styles.divider} />
      <View style={styles.button}>
        <Button title="Enter Score" color="white" onPress={() => nextHole()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#000000",
    paddingBottom: 5,
  },
  extrasRow: {
    flexDirection: "row",
    paddingLeft: "13.5%",
  },
  extrasRow2: {
    flexDirection: "row",
    paddingLeft: "12.5%",
  },
  body: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
    paddingTop: 10,
    paddingRight: 30,
    marginBottom: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#F0f2ee",
    margin: 10,
  },
  hole: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    paddingLeft: "37%",
  },
  par: {
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
    color: "#4b4b4b",
  },
  stretch: {
    width: "100%",
    height: 250,
    resizeMode: "stretch",
  },
  row: {
    flexDirection: "row",
    marginLeft: "17%",
    paddingBottom: 10,
  },
  iconsRow: {
    flexDirection: "row",
    marginLeft: "10%",
  },
  fairwaysRow: {
    flexDirection: "row",
    marginLeft: "10%",
    paddingTop: 10,
  },
  greensRow: {
    flexDirection: "row",
    marginLeft: "10%",
  },
  puttsRow: {
    flexDirection: "row",
    marginLeft: "10%",
  },
  divider: {
    borderBottomColor: "#6e6e6e",
    borderBottomWidth: 1,
    marginTop: 15,
  },
  oneScore: {
    alignItems: "center",
  },
});

export default Par3Card;