import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Createdata from './Createdata';
import DataMahasiswa from './Listdata';
import Editdata from './Editdata';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGraduationCap, faPlusCircle, faUserPen } from '@fortawesome/free-solid-svg-icons';


function HomeScreen() {
  return (
  <Createdata/>
  );
}

function DataMahasiswaScreen() {
  return (
    <DataMahasiswa/>
  );
}

function EditScreen() {
  return (
    <Editdata/>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Add Data" component={HomeScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => ( 
          <FontAwesomeIcon icon={faPlusCircle} color={color} size={20}/>)}}/>
        <Tab.Screen name="List Data" component={DataMahasiswaScreen}
        options={{
          tabBarIcon: ({ color }) => ( 
          <FontAwesomeIcon icon={faGraduationCap} color={color} size={20}/>)}}/>
        <Tab.Screen name="Edit Data" component={EditScreen}
        options={{ headerShown: false,

          tabBarIcon: ({ color }) => ( 
          <FontAwesomeIcon icon={faUserPen} color={color} size={20}/>)}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}