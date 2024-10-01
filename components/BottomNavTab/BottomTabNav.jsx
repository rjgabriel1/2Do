import { Text, TouchableOpacity, View } from "react-native";
import { s } from "./BottomNav.style";

export default function BottomTabNav({ selectedTabName, onPress, todoList }) {
  const countBystatus = todoList.reduce(
    (acc, todo) => {
      todo.is_completed ? acc.done++ : acc.inProgress++;
      return acc;
    },
    {
      all: todoList.length,
      inProgress: 0,
      done: 0,
    }
  );

  console.log(countBystatus);

  function getTextStyle(tabName) {
    return {
      fontWeight: "bold",
      color: selectedTabName === tabName ? "#2F76E5" : "#353535",
    };
  }
  return (
    <View style={s.root}>
      <TouchableOpacity onPress={() => onPress("all")}>
        <Text style={getTextStyle("all")}>All ({countBystatus.all})</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress("inProgress")}>
        <Text style={getTextStyle("inProgress")}>
          In progress ({countBystatus.inProgress})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress("done")}>
        <Text style={getTextStyle("done")}>Done ({countBystatus.done})</Text>
      </TouchableOpacity>
    </View>
  );
}
