import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreatedEvents from "../screens/CreatedEvents";
import VerifyTicket from "../screens/VerifyTicket";

const Stack = createNativeStackNavigator();

function CreatedEventsStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="CreatedEvents"
        >
            <Stack.Screen name="CreatedEvents" component={CreatedEvents} />
            <Stack.Screen name="VerifyTicket" component={VerifyTicket} />
        </Stack.Navigator>
    );
}

export default CreatedEventsStack;
