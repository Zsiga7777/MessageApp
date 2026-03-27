import { Link } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Register()  {
return (<SafeAreaProvider>
    <SafeAreaView>
    <Text>
        Regisztráció
        
    </Text>
    <Link href={"/"}>Vissza</Link>
    </SafeAreaView>
</SafeAreaProvider>)
}