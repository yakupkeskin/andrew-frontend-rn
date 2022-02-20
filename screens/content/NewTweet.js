import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  InputText,
  TextArea,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux"; //For use the redux.
import axios from "axios";
import { TextInput } from "react-native-gesture-handler";

export default function NewTweet({ navigation }) {
  const currentUser = useSelector((state) => state);
  const [tweet, setTweet] = useState("");
  function newTweet() {
    let config = {
      headers: {
        Authorization: "Token " + currentUser.token,
      },
    };
    let data = {
      tweet_text: tweet["text"],
    };
    console.log("data", data);
    console.log("config", config);
    axios                           //Request to single_tweet view in django for add new tweet.
      .post("https://andrew-backend-django.herokuapp.com/single_tweet/", data, config)
      .then(function (response) {
        console.log("This is tweetted");
        console.log(response.data);
      })
      .catch(function (error) {
        console.log("This is not tweetted ? ");
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Tweet.."
               placeholderTextColor = "#1DA1F2"
               autoCapitalize = "none"
               multiline={true}
               onChangeText={text=>setTweet({text})}
               />
      <Button title="New tweet" style={styles.submitButton} onPress={newTweet} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
     paddingTop: 23,
     backgroundColor:"white",
     flex:1,
  },
  input: {
     margin: 15,
     height: 150,
     borderColor: '#1DA1F2',
     borderWidth: 1,
     fontSize:20,
     padding:20,
     paddingTop:20,
  },
  submitButton: {
     backgroundColor: '#7a42f4',
     padding: 10,
     margin: 15,
     height: 40,
  },
  submitButtonText:{
     color: 'white'
  }
})