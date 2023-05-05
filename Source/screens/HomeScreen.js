import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VStack, Center, Skeleton, ScrollView } from 'native-base';

const HomeScreen = ( { navigation } ) => (
  <View style={styles.container}>
    <Text style={styles.text}>Feed</Text> 
    <ScrollView>
    <VStack space={4} > 
      <Center w="400">
      <VStack w="90%" maxW="400" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
      borderColor: 'coolGray.500'
    }} _light={{ 
      borderColor: 'coolGray.200'
    }}>
        <Skeleton h="20" />
        <Skeleton.Text px="2"/>
        <Skeleton px="2" my="4" rounded="md" startColor="coolGray.300"/>
      </VStack>
    </Center>

    <Center w="400"> 
      <VStack w="90%" maxW="400" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
      borderColor: 'coolGray.500' 
    }} _light={{
      borderColor: 'coolGray.200' 
    }}> 
        <Skeleton h="20" />
        <Skeleton.Text px="2"/>
        <Skeleton px="2" my="4" rounded="md" startColor="coolGray.300"/>
      </VStack>
    </Center>

    <Center w="400">
      <VStack w="90%" maxW="400" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{ 
      borderColor: 'coolGray.500'
    }} _light={{ 
      borderColor: 'coolGray.200'
    }}>
        <Skeleton h="20" />
        <Skeleton.Text px="2"/>
        <Skeleton px="2" my="4" rounded="md" startColor="coolGray.300"/>
      </VStack>
    </Center>
    </VStack>
    </ScrollView> 

  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10
  },
});

export default HomeScreen;