import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FlatList, RefreshControl, ScrollView, View } from "react-native";
import { concat } from "../utils/helper";
import TicketComp from "../components/TicketComp";
import { AppContext } from "../AppContext";

const Ticket = ({ navigation }) => {
    const [tickets, setTickets] = useState();
    const { accountId } = useContext(AppContext);

    async function fetchTickets() {
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
        setTickets(res.data.data.tickets);
    }

    useEffect(() => {
        (async () => {
            await fetchTickets();
        })();
    }, []);

    return (
        <View style={{ marginTop: 10 }}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        onRefresh={async () => await fetchTickets()}
                        colors={["darkorchid"]}
                    />
                }
            >
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
