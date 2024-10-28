import { Colors } from "@/constants/Colors";
import { TextInput, StyleSheet } from "react-native";

type props = {
    onChangeText: (text: string) => void
    title?: string,
    placeholder?: string,
    password?: boolean,
}

export default function InputBox({onChangeText, title, placeholder, password} : props) {
    return (
        <TextInput
            style={[styles.inputBox, title ? styles.inputText : styles.placeholderText]}
            onChangeText={onChangeText}
            secureTextEntry={!!password}
            value={title}
            placeholder={placeholder}
        />);
}

const styles = StyleSheet.create({
    inputBox: {
        borderWidth: 1,
        borderRadius: 12,
        fontSize: 96,
        padding: 16,
        margin: 10,
        borderColor: '#000' 
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