import { Colors } from "@/constants/Colors";
import { TextInput, StyleSheet } from "react-native";

type props = {
    onChangeText: (text: string) => void
    title?: string,
    placeholder?: string,
    password?: boolean,
    maxHeight?: number,
}

export default function InputBox({onChangeText, title, placeholder, password, maxHeight} : props) {
    return (
        <TextInput
            style={[styles.inputBox, title !== '' ? styles.inputText : styles.placeholderText, {maxHeight: maxHeight}]}
            onChangeText={onChangeText}
            secureTextEntry={!!password}
            value={title}
            placeholder={placeholder}
        />);
}

const styles = StyleSheet.create({
    inputBox: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 12,
        fontSize: 32,
        padding: 16,
        borderColor: '#000',
        width: '50%'
    },
    placeholderText: {
        fontWeight: 'regular',
        color: Colors.SecondaryLight
    },
    inputText: {
        fontWeight: 'bold',
        color: '#000'
    }
});