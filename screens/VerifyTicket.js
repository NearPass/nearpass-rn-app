import { Camera, CameraType } from "expo-camera";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { H5, H6 } from "../components/Headings";
import { colors } from "../constants";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import { AppContext } from "../AppContext";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    camera: {
        width: 300,
        height: 300,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        backgroundColor: colors.brand[600],
        padding: 10,
        borderRadius: 5,
        shadowColor: colors.brand[200],
        shadowOffset: 10,
        shadowOpacity: 100,
        shadowRadius: 100,
        marginBottom: 10,
    },
});

const VerifyTicket = ({ route }) => {
    const { event } = route.params;
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [scanCode, setScanCode] = useState(false);
    const [verifyTx, setVerifyTx] = useState(null);
    const { accountId } = useContext(AppContext);
    const [verificationStatus, setVerificationStatus] =
        useState("Waiting for Ticket");

    useEffect(() => {
        async function startCamera() {
            if (!permission.granted) {
                const { status } = await requestPermission();
            }
        }
        startCamera();
    }, []);

    function toggleCameraType() {
        setType((current) =>
            current === CameraType.back ? CameraType.front : CameraType.back
        );
    }

    async function verifyTicket(ticketId) {
        setScanCode(false);
        setVerificationStatus("Verifying on-chain...");
        console.log(ticketId);
        let url = new URL(
            `https://nearpass-server-production.up.railway.app/redeem?accountId=${encodeURIComponent(
                accountId
            )}&ticketId=${encodeURIComponent(ticketId)}`
        );
        let response = await axios.get(url.toString());
        let { error } = response.data;
        if (error) {
            setVerificationStatus("Ticket might be used!");
        } else {
            setVerificationStatus("Ticket Verified!");
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 15, alignItems: "center" }}>
                <H5 additionalStyles={{ color: colors.gray[500] }}>
                    {`Verifying Tickets for `}
                </H5>
                <H5 additionalStyles={{ color: colors.brand[500] }}>
                    {event.title}
                </H5>
            </View>
            <View
                style={{
                    height: 300,
                    borderRadius: 5,
                    marginBottom: 15,
                    backgroundColor: "red",
                    overflow: "hidden",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Camera
                    barCodeScannerSettings={{
                        barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                    }}
                    onBarCodeScanned={(scanningResult) => {
                        if (scanCode) {
                            verifyTicket(scanningResult.data);
                        }
                    }}
                    style={styles.camera}
                    type={type}
                ></Camera>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setScanCode(true)}
                >
                    <Text style={{ color: colors.white }}>Verify Ticket</Text>
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center" }}>
                <H5>
                    Verification Status:{" "}
                    <H5 additionalStyles={{ color: colors.gray[600] }}>
                        {verificationStatus}
                    </H5>
                </H5>
                {verifyTx && <H5>Verify Tx Hash: {verifyTx}</H5>}
            </View>
        </View>
    );
};

export default VerifyTicket;
