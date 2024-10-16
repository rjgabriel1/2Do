import { Text, TouchableOpacity } from "react-native";
import { s } from "./AddButton.style";
export default function AddButton({ onPress }) {
  return (
    <TouchableOpacity style={s.button} onPress={onPress}>
      <Text style={s.text}>+ New todo</Text>
    </TouchableOpacity>
  );
}
