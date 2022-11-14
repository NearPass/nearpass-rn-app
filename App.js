import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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

const Stack = createNativeStackNavigator();

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
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
