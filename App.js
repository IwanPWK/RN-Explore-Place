// import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import TabNavigation from "./App/Navigations/TabNavigation";
import Colors from "./App/Shared/Colors";
import { Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { useFonts } from 'expo-font';
import { UserLocationContext } from "./App/Context/UserLocationContext";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [fontsLoaded] = useFonts({
    'raleway': require('./assets/fonts/Raleway-Regular.ttf'),
    'raleway-bold': require('./assets/fonts/Raleway-SemiBold.ttf'),

  });



  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
     
//       setmapRegion({
//   latitude: location.coords.latitude,
//   longitude: location.coords.longitude,
//   latitudeDelta: mapRegion.latitudeDelta,
//   longitudeDelta: mapRegion.longitudeDelta,
// });
    })();
  }, []);
  // let text = "Waiting...";
  // if (errorMsg) {
  //   text(errorMsg);
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }
  return (
    <View style={styles.container}>
    <UserLocationContext.Provider value={{location, setLocation}}>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
       </UserLocationContext.Provider>
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Dimensions.get("screen").width * 0.11,
  },
});
