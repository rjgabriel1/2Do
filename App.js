import { Text, View } from "react-native";
import { SafeAreaProvider,SafeAreaView } from "react-native-safe-area-context";
import  {s} from "./App.style.js"
import Header from "./components/Header/Header.jsx";
export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
          <Header/>
          </View>
          <View style={s.body}>
            <Text>Body</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <Text>Footer</Text>
      </View>
    </>
  );
}
