import axios from "axios";
import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { colors } from "../constants";
import * as WebBrowser from "expo-web-browser";
import { AppContext } from "../AppContext";

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

function ConnectWallet({ setWalletConnected }) {
    const { accountId, setAccountId } = React.useContext(AppContext);

    function handleChange(value, setter) {
        setter(value);
    }

    async function connectWallet() {
        let response = await axios.get(
            `https://d18c-27-106-24-233.in.ngrok.io/connectwallet?accountId=${accountId}`
        );
        let { data } = response;
        if (data.connected) {
            setWalletConnected(true);
        } else {
            await WebBrowser.openBrowserAsync(data.sign_in_link);
        }
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

export default ConnectWallet;
