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
import { useDispatch,useSelector } from "react-redux";

import {SetToken} from "../../redux/actions/counterActions"

 
export default function Signup({navigation}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rePassword,setRePassword] = useState();
  const [userName,setUserName] = useState();
  const [token,setToken] = useState(0);
  const [alertMessage,setAlertMessage] = useState("Alert");
  const[first,setFirst] = useState(true)
  const [justForMessage,setJustForMessage] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setRedux();

  }, [token]);

  function setRedux(){
    console.log("Token Seetting", token)
    dispatch(SetToken(token,userName));
    
  }


  const handleMessage = (message) =>{
    console.log("?")
    setAlertMessage(message)
    setJustForMessage(justForMessage+1)
  }

  
  function login(){
    const json = JSON.stringify({ "username": userName,"password":password });
    axios.post('https://andrew-backend-django.herokuapp.com/auth/token/login/',{"username":userName,"password":password})
    .then(function(response){
      setToken(response.data.auth_token)
      navigation.navigate("HomeNavigator",{screen:"Home"});
    })
    .catch(function(error){
      Alert.alert(
        "Error",
        "Username or Password is incorrect",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    });
    //navigation.navigate("HomeNavigator", {screen:"Home",params:{"auth_token":"hello","username":"hello bitcj"}})
  }
 
  async function alertError(response){
    if(response){
      console.log("came here  ")
      console.log(response)
    if(response["data"]["email"]){
      console.log("emaile girdi:",response["data"]["email"])
      handleMessage("Email:"+response["data"]["email"].toString())
    }
    else if(response["data"]["username"]){
      console.log("username girdi :",response["data"]["username"])
      handleMessage("Username:"+response["data"]["username"].toString())
    }
    else if(response["data"]["password"]){
      console.log("Password gridi:",response["data"]["password"])
      handleMessage("Password:"+response["data"]["password"].toString())
    }
    else if(response["data"]["re_password"]){
      console.log("re Password girdi:",response["data"]["re_password"])
      handleMessage("Password:"+response["data"]["re_password"].toString())
    }
    else if(response["data"]["non_field_errors"]) {
      handleMessage(response["data"]["non_field_errors"].toString())
    }
    else{
      handleMessage("Network Error!")
    }
  }
}



  function signUp(){
    const json = JSON.stringify({"username":userName,"password":password,"re_password":rePassword,"email":email});
    axios.post('https://andrew-backend-django.herokuapp.com/auth/users/', 
      {"username":userName,"password":password,"re_password":rePassword,"email":email}
    )
    .then(function (response) {
      login();
      navigation.navigate("HomeNavigator",{screen:"Home"})
    })
    .catch(function (error) {
      //console.log(error.response)
      console.log(error)
      alertError(error.response);
      //console.log("ReqError",reqError)
    });
  }

  useEffect(() => {
    if(first){
      setFirst(false)
    }
    else{
    Alert.alert(
      "Error",
      alertMessage.toString(),
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
    }

  }, [justForMessage])
  



  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/favicon.png")} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="username"
          autoCapitalize="none"
          placeholderTextColor="#003f5c"
          onChangeText={(username) => setUserName(username)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="email"
          auto-correct={false}
          autoCapitalize="none"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="password"
          autoCapitalize="none"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Re Password"
          autoCapitalize="none"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(re_password) => setRePassword(re_password)}
        />
      </View>
 
      <TouchableOpacity style={styles.loginBtn} onPress={signUp}>
        <Text style={styles.loginText}>SIGN UP</Text>
      </TouchableOpacity>
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
    marginBottom: 40,
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
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "white",
  },
});