import * as React from "react";
import { Provider } from "react-redux";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import store from "./store/store";

export default function App() {
	const isLoadingComplete = useCachedResources();

	if (!isLoadingComplete) {
		return null;
	} else {
		return;
		<Provider store={store}>
			<Navigation />
		</Provider>;
	}
}
