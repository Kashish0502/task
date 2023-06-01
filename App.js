import {  StyleSheet } from 'react-native';
import Screen2 from "./Screens/Screen2"
import Screen3 from "./Screens/Screen3"
import Screen1 from "./Screens/Screen1"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
    headerShown: false
  }} >
        <Stack.Screen name="Screen1"  component={Screen1} />
        <Stack.Screen name="Screen2"  component={Screen2} />
        <Stack.Screen name="Screen3"  component={Screen3} />
      </Stack.Navigator>     
    </NavigationContainer>
  );
}

