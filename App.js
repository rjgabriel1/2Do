import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style.js";
import Header from "./components/Header/Header.jsx";
import TodoCard from "./components/TodoCard/TodoCard.jsx";
import { useState } from "react";

export default function App() {
  const [todoList, setTodoList] = useState([
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
    {
      id: 6,
      title: "Write blog post",
      is_completed: false,
    },
    {
      id: 7,
      title: "Organize workspace",
      is_completed: true,
    },
    {
      id: 8,
      title: "Plan vacation",
      is_completed: false,
    },
    {
      id: 9,
      title: "Grocery shopping list",
      is_completed: true,
    },
    {
      id: 10,
      title: "Update resume",
      is_completed: false,
    },
  ]);
  function renderTodo() {
    return todoList.map((todo, index) => (
      <View key={index} style={s.cardItem}>
        <TodoCard onPress={updateTodo} todo={todo} />
      </View>
    ));
  }

  function updateTodo(todo) {
    const updatedTodo = { ...todo, is_completed: !todo.is_completed };
    const updatedTodoList = [...todoList];
    const indexToUpdate = updatedTodoList.findIndex(
      (t) => t.id === updatedTodo.id
    );
    updatedTodoList[indexToUpdate] = updatedTodo;
    setTodoList(updatedTodoList);
  }
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>
          <View style={s.body}>
            <ScrollView>{renderTodo()}</ScrollView>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <Text>Footer</Text>
      </View>
    </>
  );
}
