import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StoreProvider, useStore } from './src/store';
import { C } from './src/theme';
import Toast from './src/components/Toast';
import Splash from './src/screens/Splash';
import Onboarding from './src/screens/Onboarding';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Live from './src/screens/Live';
import SessionReport from './src/screens/SessionReport';
import History from './src/screens/History';
import Alerts from './src/screens/Alerts';
import AlertDetail from './src/screens/AlertDetail';
import Notifications from './src/screens/Notifications';
import Profile from './src/screens/Profile';




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const icons = { Home: 'home', Live: 'videocam', History: 'time', Alerts: 'notifications', Profile: 'person' };

function Tabs() {
  const { unread } = useStore();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: C.pri,
        tabBarInactiveTintColor: C.mut,
        tabBarStyle: { backgroundColor: '#fff', borderTopColor: C.line },
        tabBarIcon: ({ color, size }) => <Ionicons name={icons[route.name]} size={size} color={color} />,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Live" component={Home}
        listeners={({ navigation }) => ({ tabPress: (e) => { e.preventDefault(); navigation.navigate('LiveSession'); } })} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Alerts" component={Alerts} options={{ tabBarBadge: unread > 0 ? unread : undefined }} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <StatusBar style="dark" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
            <Stack.Screen name="Splash" component={Splash} options={{ animation: 'fade' }} />
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Main" component={Tabs} />
            <Stack.Screen name="LiveSession" component={Live} options={{ animation: 'slide_from_bottom' }} />
            <Stack.Screen name="SessionReport" component={SessionReport} />
            <Stack.Screen name="AlertDetail" component={AlertDetail} />
            <Stack.Screen name="Notifications" component={Notifications} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </StoreProvider>
    </SafeAreaProvider>
  );
}
