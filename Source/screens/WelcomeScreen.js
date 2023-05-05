import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, TouchableOpacity } from 'react-native';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const WelcomeScreen = ({ navigation }) => {
    const [loginVisible, setLoginVisible] = useState(false);
    const [signupVisible, setSignupVisible] = useState(false);

    const handleOpenLogin = () => {
      setLoginVisible(true);
    };

    const handleOpenSignup = () => {
      setSignupVisible(true);
    };

    const handleCloseLogin = () => {
      setLoginVisible(false);
    };

    const handleCloseSignup = () => {
      setSignupVisible(false);
    };

    const image = {
      uri: "https://cdn11.bigcommerce.com/s-k5xb3d5nlu/images/stencil/original/products/975/3679/Picture-Frame-Wall-Layouts-ANGC112-2580-__43338.1647993352.jpg?c=2&imbypass=on&imbypass=on",
    };
    const imageForm = {
      uri: "https://cdn11.bigcommerce.com/s-k5xb3d5nlu/images/stencil/original/products/1018/4626/ANGC13Ri2570-Picture-Frame-Wall-Layouts-24x36-Rich-image1__58726.1647991906.jpg?c=2&imbypass=on&imbypass=on",
    };

    return (
      // <View style={styles.container}>
      <ImageBackground
        source={imageForm}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.title}>HoleScope</Text>
        {/* <Button title="Log In" style={styles.button} onPress={handleOpenLogin} color="white"/> */}
        <TouchableOpacity style={styles.button} onPress={handleOpenSignup}>
          <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleOpenLogin}>
          <Text style={styles.text}>Log In</Text>
        </TouchableOpacity>
        <LoginForm
          visible={loginVisible}
          onClose={handleCloseLogin}
          navigation={navigation}
          image={imageForm}
        />
        {/* <Button title="Sign Up" style={styles.button} onPress={handleOpenSignup} color="white"/> */}

        <SignupForm
          visible={signupVisible}
          onClose={handleCloseSignup}
          image={imageForm}
        />
      </ImageBackground>

      // </View>
    );
}; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "#148eb0"
  },
  title: {
    fontSize: 40,
    marginBottom: 70,
    fontWeight: 'bold',
    color: "white",
    marginTop: 10,
  },
  button: {
    marginTop: 10,
    width: 200, // Change the width to adjust the size
    height: 50, // Change the height to adjust the size
    alignItems: 'center'
  },
  text: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold'
  },
  card: {
    // backgroundColor: 'black',
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
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 0,
    marginVertical: 1,
  },
});

export default WelcomeScreen;