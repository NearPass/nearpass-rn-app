import { StyleSheet, Text } from "react-native";
import { colors } from "../constants";

const styles = StyleSheet.create({
    h6: {
        fontSize: 12,
        color: colors.gray[400],
    },
    h5: {
        fontSize: 16,
        color: colors.gray[400],
    },
});

export const H6 = ({ children, additionalStyles }) => {
    return (
        <Text style={{ ...styles.h6, ...additionalStyles }}>{children}</Text>
    );
};

export const H5 = ({ children, additionalStyles }) => {
    return (
        <Text style={{ ...styles.h5, ...additionalStyles }}>{children}</Text>
    );
};
