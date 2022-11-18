import * as React from "react";
import AppContextProvider from "./AppContext";
import AppWrapper from "./AppWrapper";
import { LogBox } from "react-native";

export default function App() {
    LogBox.ignoreAllLogs();

    return (
        <AppContextProvider>
            <AppWrapper />
        </AppContextProvider>
    );
}
