// import { Stack } from "expo-router";
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
import { Provider, useDispatch } from "react-redux";
import store from "@/Redux/store";
import MainRootLayout from "./MainRootLayout";


// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  // const [loaded, error] = useFonts({
  //   'monitoricaReg': require('../assets/fonts/monitoricaRg.ttf'),
  //   'monitoricaBold': require('../assets/fonts/monitoricaBd.ttf'),
  //   'poetsen': require('../assets/fonts/poetsenOne.ttf'),
  //   'montserratMed': require('../assets/fonts/Montserrat-Medium.ttf'),
  //   'montserratBold': require('../assets/fonts/Montserrat-Bold.ttf'),
  // })

  // useEffect(() => {
  //   if (loaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded, error]);

  // if (!loaded && !error) {
  //   return null;
  // }
  return <Provider store={store}>
  
    <MainRootLayout />
  </Provider>;
}
