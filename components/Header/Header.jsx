import {Image, Text } from "react-native";
import { s } from "./Header.style.js";
import logo from '../../assets/logo.png'
export default function Header() {
    return <>
        <Image style={s.img} source={logo} resizeMode="contain" />
        <Text style={s.subtitle}>There's always something to do.</Text>
  </>;
}
