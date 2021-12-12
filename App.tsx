import "react-native-gesture-handler";
import * as React from "react";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import store from "./store/store";

enableScreens();

export default function App() {
	const isLoadingComplete = useCachedResources();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<Provider store={store}>
				<Navigation />
			</Provider>
		);
	}
}
