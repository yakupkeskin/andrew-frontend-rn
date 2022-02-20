import { StatusBar } from "expo-status-bar";
import React, { useState,useEffect } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux"; // This is for set the redux variables.
import Ad from "../../components/Ad";
import {SetToken} from "../../redux/actions/counterActions"


export default function Login({navigation}) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [token,setToken] = useState(0);

  const dispatch = useDispatch()

  useEffect(() => {
    setRedux(); // Whenever token changes we update the redux.
  }, [token]);

  function setRedux(){
    dispatch(SetToken(token,userName));
  }

  function login(){
    const json = JSON.stringify({ "username": userName,"password":password });
    axios.post('https://andrew-backend-django.herokuapp.com/auth/token/login/',{"username":userName,"password":password}) //Login request
    .then(function(response){
      if(response.data.auth_token)
      {
      setToken(response.data.auth_token)
      navigation.navigate("HomeNavigator",{screen:"Home"})
      }
    })
    .catch(function(error){
      console.log(error)
      Alert.alert(
        "Error",
        "Username or Password is incorrect",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    });  
  }
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/twitter.png")} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="username"
          autoCapitalize="none"
          placeholderTextColor="#003f5c"
          onChangeText={(userName) => setUserName(userName)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <Text style = {{marginBottom:5,color:"#E1E8ED"}}>Doesn't Have an Account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.forgot_button}>Sign Up!</Text>
      </TouchableOpacity>
 
      <TouchableOpacity style={styles.loginBtn} onPress={login}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <Ad/>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1DA1F2",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 20,
    height:70,
    width:70,
    backgroundColor:"black"
  },
 
  inputView: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    fontSize:20,
  },
 
  forgot_button: {
    height: 30,
    color:"white",
    fontSize:20,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "white",
    marginBottom:50,
  },
});