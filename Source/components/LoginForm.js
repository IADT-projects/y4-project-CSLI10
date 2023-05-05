import React, { useState, useContext } from 'react';
import { View, Text, Modal, TextInput, StyleSheet, Button, ImageBackground } from 'react-native';
import { AuthContext } from '../context/AuthContext';
// import image from '../assets/12thGreenPic.png'

const LoginForm = ({ navigation, visible, onClose, image }) => {
  const { login, errorAuth } = useContext(AuthContext);

  const [emailValue, setEmailValue] = useState(null);
  const [passwordValue, setPasswordValue] = useState(null);

  return (
    <Modal visible={visible} animationType="slide">
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          style={styles.input}
          value={emailValue}
          onChangeText={setEmailValue}
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor="grey"
        />
        <TextInput
          style={styles.input}
          value={passwordValue}
          onChangeText={setPasswordValue}
          placeholder="Password"
          placeholderTextColor="grey"
        />
        <Text style={styles.error}>{errorAuth}</Text>
        <View style={styles.buttons}>
          <Button title="Cancel" color="white" onPress={onClose} />
          <Button
            title="Submit"
            color="white"
            onPress={() => {
              login(emailValue, passwordValue);
            }}
          />
        </View>
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
  image: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    borderRadius: 0,
    marginVertical: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    marginTop: -100,
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

export default LoginForm;