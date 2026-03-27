import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { Button } from "@react-navigation/elements";
import { Link } from "expo-router";
import { StyleSheet, TextInput } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '@/constants/theme';

export default function Index() {
     const theme: string = useColorScheme() ?? 'light';
     const styles = StyleSheet.create({
    inputStyle : {
        width: 300,
        padding:15,
        backgroundColor: theme == 'light' ? Colors.light.inputBackGround : Colors.dark.inputBackGround,
        borderColor: theme == 'light' ? Colors.light.inputBorder : Colors.dark.inputBorder,
        borderWidth: 1,
        borderRadius: 10,
        margin: 10
    },
    viewStyle : {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex:1,
        color: theme == 'light' ? Colors.light.text : Colors.dark.text,
        backgroundColor: theme == 'light' ? Colors.light.background : Colors.dark.background
    }
})
return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.viewStyle}>
        <TextInput style={styles.inputStyle} placeholder="Email cím"></TextInput>
        <TextInput style={styles.inputStyle} placeholder="Jelszó"></TextInput>
        <Link href={"/register"}>Regisztráció</Link>
        <Link href={"/forgetPassword"}>Elfelejtettem a jelszavam!</Link>
        <Button>Bejelentkezés</Button>
    </SafeAreaView>
    </SafeAreaProvider>
)
}

