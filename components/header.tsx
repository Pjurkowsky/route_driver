import { StyleSheet, StatusBar, Image, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const img = "../assets/images/RouteDriver.png";

export default function Header() {
    return (
        <View style={styles.view}>
            <Image style={{...styles.image}} source={require(img)}/>
            <View style={{flex: 1, flexDirection: "row-reverse", alignItems: "center", alignSelf: "stretch"}}>
                <Icon name={"person"} size={32} color={"#000"} style={{alignSelf: "center"}}/>
                <Text style={{ textAlign:"right" }}>abaaaaaaaaaaaaaaa</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100,
    },
    view: {
        flexDirection: "row", 
        alignItems: "center", 
        alignContent: "space-between", 
        alignSelf: "stretch", 
        marginTop: StatusBar.currentHeight, 
        backgroundColor: "#fff"
    }
});