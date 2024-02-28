import { NavigationContainer } from "@react-navigation/native";
import FeedScreen from "../screens/FeedScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreatePostScreen from "../screens/CreatePostScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { FontAwesome } from "@expo/vector-icons";
import UpdateProfileScreen from "../screens/UpdateProfileScreen";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingScreen from "../screens/OnBoardingScreen";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#fef5ea",
              },
            }}
          />
          <Stack.Screen name="Update Profile" component={UpdateProfileScreen} />
          <Stack.Screen
            name="Feed"
            component={FeedScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <FontAwesome
                  onPress={() => navigation.navigate("Profile")}
                  name="user"
                  size={24}
                  color="gray"
                />
              ),
            })}
          />
          <Stack.Screen name="Create Post" component={CreatePostScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Feed"
            component={FeedScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <FontAwesome
                  onPress={() => navigation.navigate("Profile")}
                  name="user"
                  size={24}
                  color="gray"
                />
              ),
            })}
          />
          <Stack.Screen name="Create Post" component={CreatePostScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Update Profile" component={UpdateProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default Navigator;
