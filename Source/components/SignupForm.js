import React, { useState, useContext } from 'react';
import { View, Text, Modal, TextInput, StyleSheet, Button, ImageBackground, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
 
const SignupForm = ({ visible, onClose, image }) => {
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const favCourses = [];
  const playedCourses = [];
  const statsObject = {
    rounds_played: 0,
    total_score: 0,
    fairways_hit: 0,
    fairway_missed_right: 0,
    fairway_missed_left: 0,
    greens_hit: 0,
    putts: 0,
    albatrosses: 0,
    eagles: 0,
    birdies: 0,
    pars: 0,
    bogeys: 0,
    double: 0,
    triple_plus: 0,
  };

  const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;

  const handleSubmit = () => {
    if (!emailRegex.test(emailValue)) {
      setErrorMessage("Invalid email address");
    } else if (passwordValue.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
    } else if (nameValue.length < 4) {
      setErrorMessage("Name must be at least 4 characters long");
    } else {
      signUp();
    }
  };

  const signUp = () => {
    axios
      .post("https://golf-backend-app.vercel.app/api/users/register", {
        name: nameValue,
        email: emailValue,
        password: passwordValue,
        favourite_courses: favCourses,
        played_courses: playedCourses,
        stats: statsObject,
      })
      .then((response) => {
        console.log(response.data);
        login(emailValue, passwordValue);
        onClose();
      })
      .catch((err) => {
        console.error(err);
        console.log(err.response.data);
        // setErrorMessage("Invalid email or password");
      });
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        {/* <View style={styles.container}> */}
        <Text style={styles.title}>Sign up here</Text>
        <TextInput
          style={styles.input}
          value={nameValue}
          onChangeText={setNameValue}
          placeholder="Name"
          placeholderTextColor="grey"
        />
        <TextInput
          style={styles.input}
          value={emailValue}
          onChangeText={setEmailValue}
          placeholder="Email"
          placeholderTextColor="grey"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.input}
          value={passwordValue}
          onChangeText={setPasswordValue}
          placeholderTextColor="grey"
          textContentType="password"
          placeholder="Password"
        />
        <Text style={styles.error}>{errorMessage}</Text>
        <View style={styles.buttons}>
          <Button title="Cancel" onPress={onClose} color="white" />
          <Button title="Submit" onPress={handleSubmit} color="white" />
        </View>

        {/* </View> */}
      </ImageBackground>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  error: {
    color: "red",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    marginTop: -100,
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
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    width: "70%",
    marginBottom: 20,
    backgroundColor: "white",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default SignupForm;