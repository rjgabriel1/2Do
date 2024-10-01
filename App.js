import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { s } from "./App.style.js";
import Header from "./components/Header/Header.jsx";
import TodoCard from "./components/TodoCard/TodoCard.jsx";
import { useEffect, useState, useRef } from "react";
import BottomTabNav from "./components/BottomNavTab/BottomTabNav.jsx";
import AddButton from "./components/AddButton/AddButton.jsx";
import Dialog from "react-native-dialog";

export default function App() {
  const [selectedTabName, setSelectedTabname] = useState("all");
  const [todoList, setTodoList] = useState([]);
  const [isDialogShown, showDialog] = useState(false);
  const [inputValue, setInputValue] = useState("");
  // Track if todos are being loaded initially
  const isFirstRender = useRef(true);
  const isLoadUpdate = useRef(false);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    if (!isLoadUpdate.current) {
      if (!isFirstRender.current) {
        saveTodos();
      } else {
        isFirstRender.current = false;
      }
    } else {
      isLoadUpdate.current = false;
    }
  }, [todoList]);

  async function loadTodos() {
    console.log("LOAD");

    try {
      const todoListString = await AsyncStorage.getItem("@todoList");
      const parsedTodoList = JSON.parse(todoListString);
      isLoadUpdate.current = true;
      setTodoList(parsedTodoList || []);
    } catch (error) {
      console.log(error, "Failed fetching todo");
    }
  }

  async function saveTodos() {
    console.log("SAVE");

    try {
      await AsyncStorage.setItem("@todoList", JSON.stringify(todoList));
    } catch (error) {
      console.log(error, "Failed saving todo");
    }
  }

  function getFilteredList() {
    switch (selectedTabName) {
      case "all":
        return todoList;
      case "inProgress":
        return todoList.filter((todo) => todo.is_completed === false);
      case "done":
        return todoList.filter((todo) => todo.is_completed === true);
      default:
        break;
    }
  }
  function renderTodo() {
    return getFilteredList()?.map((todo, index) => (
      <View key={index} style={s.cardItem}>
        <TodoCard onPress={updateTodo} todo={todo} longPress={deleteTodo} />
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

  function deleteTodo(todoToDelete) {
    Alert.alert("Delete todo", "Are you sure you want to delete this todo?", [
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setTodoList(todoList.filter((t) => t.id !== todoToDelete.id));
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  }

  function addTodo(todo) {
    if (inputValue) {
      const newToDo = {
        id: uuid.v4(),
        title: inputValue,
        is_completed: false,
      };

      setTodoList([...todoList, newToDo]);
      showDialog(false);
      setInputValue("");
    }
  }
  function renderDialog() {
    return (
      <Dialog.Container
        visible={isDialogShown}
        onBackdropPress={() => showDialog(false)}
      >
        <Dialog.Title>Add todo</Dialog.Title>
        <Dialog.Description>Choose a name for your todo </Dialog.Description>
        <Dialog.Input placeholder="Enter todo" onChangeText={setInputValue} />
        <Dialog.Button
          label="Cancel"
          color={"grey"}
          onPress={() => showDialog(false)}
        />
        <Dialog.Button
          label="Save"
          disabled={inputValue.length === 0}
          onPress={addTodo}
        />
      </Dialog.Container>
    );
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
          <AddButton onPress={() => showDialog(true)} />
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <BottomTabNav
          onPress={setSelectedTabname}
          selectedTabName={selectedTabName}
          todoList={todoList}
        />
      </View>
      {renderDialog()}
    </>
  );
}
