import React, { useEffect, useRef, useState } from "react";
import { Animated,Button,Dimensions, StyleSheet, Text, View } from "react-native";
import * as BootSplash from "react-native-bootsplash";
import { NavigationContainer } from "@react-navigation/native";
import { MainScreen, ProfileScreen } from '../MainScreen';
import bootSplashLogo from "../../assets/images/BootSplashLogo/SmartCampusMauaLogo_1024x1024.png";


const fakeApiCallWithoutBadNetwork = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

import { RootStack } from '../../navigation/RootStackNavigator'

export const RootScreen = () => {
  const [bootSplashIsVisible, setBootSplashIsVisible] = useState(true);
  const [bootSplashLogoIsLoaded, setBootSplashLogoIsLoaded] = useState(false);
  const opacity = useRef(new Animated.Value(1));
  const translateY = useRef(new Animated.Value(0));

  const init = async () => {
    // You can uncomment this line to add a delay on app startup
    // await fakeApiCallWithoutBadNetwork(3000);
    try {
      await BootSplash.hide();

      Animated.stagger(250, [
        Animated.spring(translateY.current, {
          useNativeDriver: true,
          toValue: -150,
        }),
        Animated.spring(translateY.current, {
          useNativeDriver: true,
          toValue: Dimensions.get("window").height,
        }),
      ]).start();

      Animated.timing(opacity.current, {
        useNativeDriver: true,
        toValue: 0,
        duration: 130,
        delay: 750,
      }).start(() => {
        setBootSplashIsVisible(false);
      });
    } catch (error) {
      setBootSplashIsVisible(false);
    }
  };

  useEffect(() => {
    bootSplashLogoIsLoaded && init();
  }, [bootSplashLogoIsLoaded]);


  const isLoggedIn = true

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          // Screens for logged in users
          <RootStack.Group>
            <RootStack.Screen name="Main" component={MainScreen} />
          </RootStack.Group>
        ) : (
          // Auth screens
          <RootStack.Group screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="SignIn" component={SignInScreen} />
            <RootStack.Screen name="SignUp" component={SignUpScreen} />
          </RootStack.Group>
        )}
        {/* Common modal screens */}
        <RootStack.Group screenOptions={{ presentation: 'modal' }}>
          <RootStack.Screen name="Help" component={HelpModal} />
          <RootStack.Screen name="Invite" component={InviteModal} />
        </RootStack.Group>
      </RootStack.Navigator>


      {bootSplashIsVisible && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.bootsplash,
            { opacity: opacity.current },
          ]}
        >
          <Animated.Image
            source={bootSplashLogo}
            fadeDuration={0}
            // resizeMode="contain"
            onLoadEnd={() => setBootSplashLogoIsLoaded(true)}
            style={[
              styles.logo,
              { transform: [{ translateY: translateY.current }] },
            ]}
          />
        </Animated.View>
      )}
    </NavigationContainer>
  );
};




// const SignInScreen = () => {
//   return (
//     <View>
//       <Text>SignIn</Text>
//     </View>
//   )
// }

const SignUpScreen = () => {
  return (
    <View>
      <Text>SignUp</Text>
    </View>
  )
}

const HelpModal = () => {
  return (
    <View>
      <Text>Help</Text>
    </View>
  )
}

const InviteModal = () => {
  return (
    <View>
      <Text>Invite</Text>
    </View>
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#455",
  },
  bootsplash: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  logo: {
    height: 100,
    width: 100,
  },
});







type AppScreenProps = {
  navigation: any
}

function AppScreen({ navigation }: AppScreenProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      />
    </View>
  );
}

type LoginScreenProps = {
  route: any;
  navigation: any;
}
function SignInScreen({ route, navigation }: LoginScreenProps) {
  /* 2. Get the param */
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}