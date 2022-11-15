import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShowTicket from "../screens/ShowTicket";
import Ticket from "../screens/Ticket";

const Stack = createNativeStackNavigator();

function TicketStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="Tickets"
        >
            <Stack.Screen name="Tickets" component={Ticket} />
            <Stack.Screen name="ShowTicket" component={ShowTicket} />
        </Stack.Navigator>
    );
}

export default TicketStack;
