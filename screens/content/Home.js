import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Ad from "../../components/Ad";

export default function Home({ navigation }) {
  const currentUser = useSelector((state) => state);
  const [tweetList, setTweetList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  function pullTweets() {
    let config = {
      headers: {
        Authorization: "Token " + currentUser.token,
      },
    };
    console.log("config", config);
    axios
      .get("https://andrew-backend-django.herokuapp.com/homepage/", config)
      .then(function (response) {
        console.log("TWeets Came");
        console.log(response.data);
        setTweetList(response.data);
      })
      .catch(function (error) {
        console.log("This is not tweetted ? ");
        console.log(error);
      });
  }

  useEffect(() => {
    pullTweets();
  }, [refreshing]);

  if (tweetList.length > 0) {
    return (
      <SafeAreaView style={{backgroundColor:"white"}}>
        <FlatList
          data={tweetList.reverse()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={styles.container}>
                <View style={styles.avatar}></View>
                <View style={styles.rightContainer}>
                  <View style={styles.userInfo}>
                    <Text style={styles.name}>{item.tweet_user} </Text>
                    <Text style={styles.username}>
                      {`@${item.tweet_user}`}{" "}
                    </Text>
                  </View>
                  <View style={styles.content}>
                    <Text style={styles.text}>{item.tweet_text}</Text>
                  </View>

                  <View style={styles.social}>
                    <TouchableOpacity
                      onPress={() => deleteTweet(_id)}
                    ></TouchableOpacity>
                  </View>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: "#AAB8C2",
                  borderBottomWidth: 1,
                }}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.tweet_id}
        />
        <Ad/>
      </SafeAreaView>
    );
  } else {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.text}>There is no tweet on your time line</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    borderBottomColor: "whitesmoke",
    borderBottomWidth: 1,
    marginTop: 10,
  },
  avatar: {
    margin: 10,
  },
  rightContainer: {
    flex: 1,
    marginTop: 10,
  },
  userInfo: {
    flexDirection: "row",
    marginBottom: 5,
  },
  content: {
    marginBottom: 10,
    marginRight: 10,
    fontSize:50,
  },
  name: {
    fontWeight: "bold",
    fontSize:20,
  },
  username: {
    color: "darkgrey",
  },
  social: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 70,
    marginBottom: 10,
  },
  text: { marginBottom: 10,fontSize:20, },
  image: {
    height: 400,
    borderRadius: 10,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
});
