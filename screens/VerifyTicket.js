import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { H5, H6 } from "../components/Headings";
import { colors } from "../constants";
import { BarCodeScanner } from "expo-barcode-scanner";

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
});

const VerifyTicket = ({ route }) => {
    const { event } = route.params;
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

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
                        console.log(scanningResult.data);
                    }}
                    style={styles.camera}
                    type={type}
                ></Camera>
            </View>
            <View>
                <H5>
                    Verification Status:{" "}
                    <H5 additionalStyles={{ color: colors.gray[600] }}>
                        No Ticket Detected
                    </H5>
                </H5>
            </View>
        </View>
    );
};

export default VerifyTicket;