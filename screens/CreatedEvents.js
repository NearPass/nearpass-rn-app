import { useContext, useEffect, useState } from "react";
import {
    FlatList,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";
import axios from "axios";
import { concat } from "../utils/helper";
import Event from "../components/Event";
import { AppContext } from "../AppContext";

const styles = StyleSheet.create({
    main: {
        paddingTop: 10,
    },
});

function CreatedEvents({ navigation }) {
    const [events, setEvents] = useState();
    const { accountId } = useContext(AppContext);

    async function getEventsByAccountId() {
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

        let events = res.data.data.events;
        for await (let event of events) {
            let image = await axios.get(event.thumbnail);
            event.image = image.data;
        }
        setEvents(events);
    }

    useEffect(() => {
        getEventsByAccountId();
    }, []);

    return (
        <View style={styles.main}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        onRefresh={() => getEventsByAccountId()}
                        colors={["darkorchid"]}
                    />
                }
            >
                <FlatList
                    data={events}
                    renderItem={({ item }) => (
                        <Event
                            key={item.id}
                            event={item}
                            navigation={navigation}
                        />
                    )}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    style={{ padding: 20 }}
                />
            </ScrollView>
        </View>
    );
}

export default CreatedEvents;
