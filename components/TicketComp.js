import axios from "axios";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { colors } from "../constants";
import { H5, H6 } from "./Headings";

const TicketComp = ({ ticket, navigation }) => {
    const { event, name, email, id } = ticket;

    const [image, setImage] = useState();

    useEffect(() => {
        if (ticket) {
            (async () => {
                try {
                    let image = await axios.get(
                        `https://ipfs.io/ipfs/${ticket.event.thumbnail.replace(
                            "ipfs://",
                            ""
                        )}`
                    );
                    // let image = await axios.get(
                    //     `https://ipfs.io/ipfs/${metadata.data.image.replace(
                    //         "ipfs://",
                    //         ""
                    //     )}`
                    // );
                    setImage(image.data);
                } catch (e) {
                    console.log(e);
                }
            })();
        }
    }, [ticket]);

    return (
        <View
            style={{
                flex: 1,
                flexDirection: "column",
                borderColor: colors.gray[300],
                borderWidth: 2,
                borderRadius: 5,
                marginBottom: 10,
                backgroundColor: "white",
            }}
            onTouchEnd={() =>
                navigation.navigate("ShowTicket", {
                    ticket: ticket,
                })
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
                    position: "relative",
                }}
            >
                {image && (
                    <Image
                        source={{ uri: image }}
                        style={{ flex: 1, resizeMode: "cover" }}
                    />
                )}
                <View
                    style={{
                        backgroundColor: "white",
                        height: 55,
                        width: 50,
                        position: "absolute",
                        bottom: 10,
                        zIndex: 1000,
                        right: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 5,
                        borderColor: colors.gray[200],
                        borderWidth: 2,
                    }}
                >
                    <Text style={{ fontSize: 28 }}>
                        {id
                            .replace(event.id, "")
                            .replace('"', "")
                            .replace('"', "")}
                    </Text>
                </View>
            </View>
            <View
                style={{
                    flex: 1,
                    flexDirection: "column",
                    padding: 5,
                    backgroundColor: "white",
                    zIndex: 99,
                }}
            >
                <H5
                    additionalStyles={{
                        color: colors.gray[700],
                        marginBottom: 3,
                    }}
                >
                    {event.title}
                </H5>
                <H6>
                    Hosted by:{" "}
                    {event.host && (
                        <Text style={{ color: colors.brand[500] }}>
                            {event.host.name}
                        </Text>
                    )}
                </H6>
            </View>
        </View>
    );
};

export default TicketComp;
