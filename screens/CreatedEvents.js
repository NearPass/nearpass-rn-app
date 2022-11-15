import { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { concat } from "../utils/helper";
import Event from "../components/Event";

const styles = StyleSheet.create({
    main: {
        paddingTop: 10,
    },
});

function CreatedEvents({ navigation }) {
    const [events, setEvents] = useState();
    useEffect(() => {
        async function getEventsByAccountId() {
            let accountId = "dev-1666006273574-16898048052758";
            let query = concat`
            { 
                events(where: { host_: { address: "${accountId}" } }) {
                    id
                    title
                    description
                    thumbnail
                    timestamp
                    attendees
                    host {
                        id
                        name
                        address
                    }
                }
            }
            `;

            let res = await axios.post(
                "https://api.thegraph.com/subgraphs/name/therealharpaljadeja/nearpass",
                {
                    query,
                }
            );

            setEvents(res.data.data.events);
        }
        getEventsByAccountId();
    }, []);

    return (
        <View style={styles.main}>
            <ScrollView>
                <FlatList
                    data={events}
                    renderItem={({ item }) => (
                        <Event event={item} navigation={navigation} />
                    )}
                    keyExtractor={(item) => {
                        return item.title;
                    }}
                    style={{ padding: 20 }}
                />
            </ScrollView>
        </View>
    );
}

export default CreatedEvents;
