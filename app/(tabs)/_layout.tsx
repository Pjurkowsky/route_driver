import { Tabs } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'routes':
              iconName = 'directions';
              break;
            case 'history':
              iconName = 'history';
              break;
            case 'notifications':
              iconName = 'notifications';
              break;
            case 'profile':
              iconName = 'person';
              break;
            default:
              iconName = 'error';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ focused }) => (
          <Text style={{ fontSize: 12, color: focused ? '#000' : '#888' }}>
            {route.name.charAt(0).toUpperCase() + route.name.slice(1)}
          </Text>
        ),
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          paddingTop: 5,
          paddingBottom: 5,
          height: 60,
        },
      })}
    >
      <Tabs.Screen name="routes" />
      <Tabs.Screen name="history" />
      <Tabs.Screen name="notifications" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen
        name="map/[id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
