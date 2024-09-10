import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import check from "../../assets/check.png";
import { s } from "./Todocard.style";
export default function TodoCard({ todo }) {
  return (
    <TouchableOpacity style={s.card}>
      <Text
        style={[
          s.title,
          todo.is_completed && { textDecorationLine: "line-through" },
        ]}
      >
        {todo.title}
      </Text>
      {todo.is_completed && <Image source={check} style={s.check} />}
    </TouchableOpacity>
  );
}
