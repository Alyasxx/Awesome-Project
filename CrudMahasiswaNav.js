import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserGraduate, faPlusCircle, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WebView } from 'react-native-webview';
import HomePage from './Homepage';
import AnalyticsPage from './Analytics';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return <HomePage />;
}

function AnalyticsScreen() {
  return <AnalyticsPage />;
}

function WebScreen() {
  return <WebView source={{ uri: 'https://alyasxx.github.io/WebGIS-PGPBL/' }} />;
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faPlusCircle} color={color} size={20} />,
          }}
        />
        <Tab.Screen
          name="Analytics"
          component={AnalyticsScreen}
          options={{
            tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faUserGraduate} color={color} size={20} />,
          }}
        />
        <Tab.Screen
          name="GitHub"
          component={WebScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faGithub} color={color} size={20} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}