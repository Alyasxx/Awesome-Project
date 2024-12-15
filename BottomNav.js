import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChartPie, faHomeAlt, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WebView } from 'react-native-webview';
import Edit from './Editwallet';
import AnalyticsPage from './Analytics';
import Create from './Createwallet';
import List from './Listwallet';
import { faMapLocation } from '@fortawesome/free-solid-svg-icons/faMapLocation';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return <Edit />;
}

function AnalyticsScreen() {
  return <AnalyticsPage />;
}

function WebScreen() {
  return <WebView source={{ uri: 'https://alyasxx.github.io/WebGIS-PGPBL/' }} />;
}

function ListScreen() {
  return <List />;
}   

function CreateScreen() {
  return <Create />;
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#FF5E78', // Set background color of the tab bar to pink
          },
          tabBarActiveTintColor: '#fff', // Active tab icon color
          tabBarInactiveTintColor: '#f4f4f4', // Inactive tab icon color
          headerStyle: {
            backgroundColor: '#FF5E78', // Set background color for headers (if visible)
          },
          headerTintColor: '#fff', // Header text color
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faList} color={color} size={20} />,
          }}
        />
        <Tab.Screen
          name="Analytics"
          component={AnalyticsScreen}
          options={{
            tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faChartPie} color={color} size={20} />,
          }}
        />
        <Tab.Screen
          name="ATM's Loc"
          component={WebScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faMapLocation} color={color} size={20} />,
          }}
        />
        <Tab.Screen
          name="List"
          component={ListScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faHomeAlt} color={color} size={20} />,
          }}
        />
        <Tab.Screen
          name="Create"
          component={CreateScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faPlusCircle} color={color} size={20} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}