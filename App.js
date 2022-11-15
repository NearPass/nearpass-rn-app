import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { colors } from "./constants";
import useWallet from "./utils/useWallet";
import Icon from "react-native-vector-icons/AntDesign";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreatedEvents from "./screens/CreatedEvents";
import Ticket from "./screens/Ticket";
import CreatedEventsStack from "./navigators/CreatedEventsStack";
import TicketStack from "./navigators/TicketStack";

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: "100%",
        borderRadius: 5,
        color: colors.brand[500],
        borderColor: colors.gray[400],
    },
    button: {
        backgroundColor: colors.brand[600],
        padding: 10,
        borderRadius: 5,
        shadowColor: colors.brand[200],
        shadowOffset: 10,
        shadowOpacity: 100,
        shadowRadius: 100,
    },
});

function HomeScreen({ navigation }) {
    const [accountId, setAccountId] = React.useState();
    let { signIn } = useWallet();

    function handleChange(value, setter) {
        setter(value);
    }

    function connectWallet() {
        // signIn();
    }

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                padding: 20,
                justifyContent: "center",
                backgroundColor: colors.gray[50],
            }}
        >
            <Text
                style={{
                    fontFamily: "Inter-SemiBold",
                    fontSize: 28,
                    fontStyle: "italic",
                }}
            >
                NearPass
            </Text>
            <TextInput
                onChangeText={(value) => handleChange(value, setAccountId)}
                style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={connectWallet}>
                <Text style={{ color: colors.white }}>Connect Wallet</Text>
            </TouchableOpacity>
        </View>
    );
}

const BottomTabs = createBottomTabNavigator();

export default function App() {
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

    return (
        <NavigationContainer onReady={onLayoutRootView}>
            <BottomTabs.Navigator
                initialRouteName="CreatedEvents"
                screenOptions={({ route }) => ({
                    tabBarLabelPosition: "beside-icon",
                    headerTitleAlign: "center",
                    tabBarIcon: ({ color, size }) => {
                        const Icons = {
                            HomeScreen: "user",
                            Settings: "setting",
                            Feed: "earth",
                        };
                        return (
                            <Icon
                                color={color}
                                name={Icons[route.name]}
                                size={size}
                            />
                        );
                    },
                    tabBarActiveTintColor: colors.brand[500],
                })}
            >
                <BottomTabs.Screen
                    name="Created Events"
                    component={CreatedEventsStack}
                />
                <BottomTabs.Screen name="Tickets" component={TicketStack} />
            </BottomTabs.Navigator>
        </NavigationContainer>
    );
}
