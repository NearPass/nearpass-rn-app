import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { H6 } from "../components/Headings";
import { colors } from "../constants";

const ShowTicket = ({ route }) => {
    const { ticket } = route.params;
    console.log(ticket);
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
            }}
        >
            <QRCode size={300} value="https://www.google.com" />
            <View
                style={{
                    width: "80%",
                    marginTop: 20,
                    borderWidth: 2,
                    borderColor: colors.gray[200],
                    padding: 10,
                    borderRadius: 5,
                }}
            >
                <H6
                    additionalStyles={{
                        color: colors.brand[500],
                        fontSize: 16,
                        fontFamily: "Inter-Bold",
                        marginBottom: 10,
                    }}
                >
                    {ticket.event.title}
                </H6>
                <H6
                    additionalStyles={{
                        color: colors.gray[600],
                        marginBottom: 10,
                    }}
                >
                    Name:{" "}
                    <H6
                        additionalStyles={{
                            fontSize: 16,
                            color: colors.brand[500],
                            fontFamily: "Inter-Medium",
                        }}
                    >
                        {ticket.name}
                    </H6>
                </H6>
                <H6
                    additionalStyles={{
                        color: colors.gray[600],
                        marginBottom: 10,
                    }}
                >
                    Email:{" "}
                    <H6
                        additionalStyles={{
                            fontSize: 16,
                            color: colors.brand[500],
                            fontFamily: "Inter-Medium",
                        }}
                    >
                        {ticket.email}
                    </H6>
                </H6>
                <H6
                    additionalStyles={{
                        color: colors.gray[600],
                        marginBottom: 10,
                    }}
                >
                    Address:{" "}
                    <H6
                        additionalStyles={{
                            fontSize: 16,
                            color: colors.brand[500],
                            fontFamily: "Inter-Medium",
                        }}
                    >
                        {ticket.accountId}
                    </H6>
                </H6>
                {ticket.phone && (
                    <H6 additionalStyles={{ color: colors.gray[600] }}>
                        Address:{" "}
                        <H6
                            additionalStyles={{
                                fontSize: 16,
                                color: colors.brand[500],
                                fontFamily: "Inter-Medium",
                            }}
                        >
                            {ticket.phone}
                        </H6>
                    </H6>
                )}
            </View>
        </View>
    );
};

export default ShowTicket;
