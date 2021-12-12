import "react-native-gesture-handler";
import * as React from "react";

import useCachedResources from "./hooks/useCachedResources";
import { enableScreens } from "react-native-screens";
import Navigation from "./navigation";
import { Provider } from "react-redux";
import store from "./store/store";
import { init } from "./helpers/db";

enableScreens();

init()
	.then(console.log)
	.catch((err) => {
		console.log("DB init failed", err);
	});

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
