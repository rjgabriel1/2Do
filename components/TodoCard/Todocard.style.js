import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  card: {
    backgroundColor: "white",
    height: 100,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
        justifyContent: "space-between",
    paddingHorizontal:20
  },
  check: {
    height: 25,
    width: 25,
  },
  title: { fontSize: 20 },
});
