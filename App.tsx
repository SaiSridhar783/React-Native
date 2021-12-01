import 'react-native-gesture-handler';
import * as React from "react";
import { enableScreens } from "react-native-screens";
//import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

enableScreens();

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	if (!isLoadingComplete) {
		return null;
	} else {
		return <Navigation colorScheme={colorScheme} />;
	}
}
