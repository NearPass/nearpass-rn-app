import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { timestampToDateTime } from "../utils/helper";
import { H5, H6 } from "./Headings";
import axios from "axios";
import { colors } from "../constants";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        flexDirection: "column",
    },
    h6: {
        fontSize: "12px",
        color: colors.gray[400],
    },
    h5: {
        fontSize: "24px",
        color: colors.gray[400],
    },
});

const Event = ({ event, navigation }) => {
    const { title, thumbnail, host, timestamp, attendees, id } = event;

    const [imageB64, setImageB64] = useState();

    useEffect(() => {
        if (thumbnail) {
            (async () => {
                try {
                    let image = await axios.get(
                        `https://ipfs.io/ipfs/${thumbnail.replace(
                            "ipfs://",
                            ""
                        )}`
                    );
                    // let image = await axios.get(
                    //     `https://ipfs.io/ipfs/${res.data.image.replace(
                    //         "ipfs://",
                    //         ""
                    //     )}`
                    // );
                    setImageB64(image.data);
                } catch (e) {
                    console.log(e);
                }
            })();
        }
    }, [thumbnail]);

    return (
        <View
            style={{
                flex: 1,
                flexDirection: "column",
                borderColor: colors.gray[300],
                borderWidth: 2,
                borderRadius: 5,
                marginBottom: 10,
            }}
            onTouchEnd={() =>
                navigation.navigate("VerifyTicket", { event: event })
            }
        >
            <View
                style={{
                    flex: 1,
                    height: 200,
                    borderWidth: 1,
                    borderColor: colors.gray[200],
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                    overflow: "hidden",
                    marginBottom: 5,
                }}
            >
                {imageB64 && (
                    <Image
                        source={{ uri: imageB64 }}
                        style={{ flex: 1, resizeMode: "cover" }}
                    />
                )}
            </View>
            <View
                style={{
                    flex: 1,
                    flexDirection: "column",
                    padding: 5,
                    backgroundColor: "white",
                }}
            >
                <H6
                    additionalStyles={{
                        color: colors.brand[600],
                        marginBottom: 3,
                    }}
                >
                    {timestampToDateTime(timestamp)}
                </H6>
                <H5
                    additionalStyles={{
                        color: colors.gray[700],
                        marginBottom: 3,
                    }}
                >
                    {title}
                </H5>
                <H6>
                    Hosted by:{" "}
                    {host && (
                        <Text style={{ color: colors.brand[500] }}>
                            {host.name}
                        </Text>
                    )}
                </H6>
            </View>
        </View>
    );
};
export default Event;
