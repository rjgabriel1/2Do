import { Text, View } from "react-native";
import { SafeAreaProvider,SafeAreaView } from "react-native-safe-area-context";
import  {s} from "./App.style.js"
import Header from "./components/Header/Header.jsx";
import TodoCard from "./components/TodoCard/TodoCard.jsx";

const todo_list = [
  {
    id: 1,
    title: "Buy groceries",
    is_completed: false,
  },
  {
    id: 2,
    title: "Finish React Native project",
    is_completed: true,
  },
  {
    id: 3,
    title: "Call the dentist",
    is_completed: false,
  },
  {
    id: 4,
    title: "Read a book",
    is_completed: true,
  },
  {
    id: 5,
    title: "Exercise for 30 minutes",
    is_completed: false,
  },
];

export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
          <Header/>
          </View>
          <View style={s.body}>
            <TodoCard todo={todo_list[0]} />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <Text>Footer</Text>
      </View>
    </>
  );
}
