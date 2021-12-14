import "react-native-gesture-handler";
import * as React from "react";
import { Provider } from "react-redux";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import store from "./store/store";
import * as Notifications from "expo-notifications";
import { enableScreens } from "react-native-screens";

enableScreens();

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
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
