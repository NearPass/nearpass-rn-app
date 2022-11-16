import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React from "react";
import { AppContext } from "./AppContext";
import ConnectWallet from "./screens/ConnectWallet";
import * as SplashScreen from "expo-splash-screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreatedEventsStack from "./navigators/CreatedEventsStack";
import TicketStack from "./navigators/TicketStack";
import { colors } from "./constants";

const BottomTabs = createBottomTabNavigator();

const AppWrapper = () => {
    const [fontsLoaded] = useFonts({
        "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
        "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
        "Inter-ExtraBold": require("./assets/fonts/Inter-Bold.ttf"),
        Inter: require("./assets/fonts/Inter-Regular.ttf"),
        "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
        "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
        "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
    });

    React.useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);

    const onLayoutRootView = React.useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    const { walletConnected, setWalletConnected } =
        React.useContext(AppContext);

    console.log(walletConnected);

    return (
        <React.Fragment>
            {walletConnected ? (
                <NavigationContainer onReady={onLayoutRootView}>
                    <BottomTabs.Navigator
                        initialRouteName="CreatedEvents"
                        screenOptions={({ route }) => ({
                            tabBarLabelPosition: "beside-icon",
                            headerTitleAlign: "center",
                            tabBarIconStyle: {
                                display: "none",
                            },
                            tabBarActiveTintColor: colors.brand[500],
                        })}
                    >
                        <BottomTabs.Screen
                            name="Created Events"
                            component={CreatedEventsStack}
                        />
                        <BottomTabs.Screen
                            name="Tickets"
                            component={TicketStack}
                        />
                    </BottomTabs.Navigator>
                </NavigationContainer>
            ) : (
                <ConnectWallet setWalletConnected={setWalletConnected} />
            )}
        </React.Fragment>
    );
};

export default AppWrapper;
