import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';


const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export function useScreenInfo() {
  const [screenInfo, setScreenInfo] = useState({ window, screen });

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window, screen }) => {
      setScreenInfo({ window, screen });
    });
    return () => subscription?.remove();
  }, []);

  return {
    ...screenInfo,
    isPortrait: screenInfo.screen.height > screenInfo.screen.width
  }
}