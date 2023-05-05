import React, { useState, useContext } from 'react';
import { View, Text, Modal, TextInput, StyleSheet, Button, ImageBackground } from 'react-native';
import RoundReview from './RoundReview';

const SubmitRoundForm = ({ navigation, visible, onClose, submitRound, form, course, }) => {
  const imageForm = {
    uri: "https://cdn11.bigcommerce.com/s-k5xb3d5nlu/images/stencil/original/products/1018/4626/ANGC13Ri2570-Picture-Frame-Wall-Layouts-24x36-Rich-image1__58726.1647991906.jpg?c=2&imbypass=on&imbypass=on",
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <ImageBackground
          source={imageForm}
          resizeMode="cover"
          style={styles.image}
        >
          <Text style={styles.title}>Submit Round</Text>
          <RoundReview form={form} course={course} />
          <View style={styles.buttons}>
            <Button title="Cancel" onPress={onClose} color="white" />
            <Button
              title="Submit"
              onPress={() => {
                submitRound();
              }}
              color="white"
            />
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
}; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 0,
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 0,
    marginVertical: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default SubmitRoundForm;