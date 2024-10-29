import { View, Text, Image } from "react-native";
import { Dimensions } from 'react-native';

const img = {uri: '../assets/images/RouteDriver.png'}
const win = Dimensions.get('window');

export default function MainScreen() {
    return (<View style={{flex: 1, flexDirection: 'column', alignContent: 'center'}}>
        <View style={{flex: 11, flexDirection: 'row', alignContent: 'flex-start'}}>
            <Image style={{height: '100%', width: null, aspectRatio: 1}} source={img} />
        </View>
        <Text style={{flex: 89, alignSelf: 'center'}}>Main screen</Text>
    </View>);
}