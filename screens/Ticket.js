import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { concat } from "../utils/helper";
import TicketComp from "../components/TicketComp";

const Ticket = ({ navigation }) => {
    const [tickets, setTickets] = useState();
    useEffect(() => {
        console.log(TicketComp);
        (async () => {
            let accountId = "nearpassticketbuyer.testnet";
            let query = concat`
                    { 
                        tickets(where: { accountId: "${accountId}" }) {
                            id
                            name
                            email
                            accountId
                            phone
                            event {
                                id
                                title
                                description
                                thumbnail
                                timestamp
                                host {
                                    name
                                    address
                                }
                            }
                        }
                    }
                `;
            const res = await axios.post(
                "https://api.thegraph.com/subgraphs/name/therealharpaljadeja/nearpass",
                {
                    query,
                }
            );
            console.log(res.data.data.tickets);
            setTickets(res.data.data.tickets);
        })();
    }, []);

    return (
        <View style={{ marginTop: 10 }}>
            <ScrollView>
                <FlatList
                    data={tickets}
                    style={{ padding: 20 }}
                    renderItem={({ item }) => (
                        <TicketComp ticket={item} navigation={navigation} />
                    )}
                />
            </ScrollView>
        </View>
    );
};

export default Ticket;
