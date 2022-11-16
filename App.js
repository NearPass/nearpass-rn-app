import * as React from "react";
import AppContextProvider from "./AppContext";
import AppWrapper from "./AppWrapper";

export default function App() {
    return (
        <AppContextProvider>
            <AppWrapper />
        </AppContextProvider>
    );
}
