import { View, Text,StyleSheet,Button,SafeAreaView,FlatList,RefreshControl,TouchableOpacity,ScrollView } from 'react-native';
import React from 'react';
import { useDispatch,useSelector } from "react-redux";
import { reset } from '../../redux/actions/counterActions';
import { useEffect,useState } from 'react';
import axios from 'axios';

export default function Profile({navigation}) {
  const currentUser = useSelector((state) => state);
  const [tweetList, setTweetList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  function logout(){
    //dispatch(reset());
    navigation.navigate("LoginNavigator")
  }

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
      .get("https://andrew-backend-django.herokuapp.com/profile/", config)//This request is for get only the currents user's tweets.
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
  console.log("Hey this is page 4",currentUser)
  if (tweetList.length > 0) {
    return (
      <View style={{paddingBottom:80}} >
       
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
        
      </SafeAreaView>
      <View>
      <Button title="Logout" style={{paddingBottom:30,}} onPress= {()=>{logout()}}/>
      </View>
      </View>
      
    );
  } else {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
          
        <Text style={styles.text}>You don't have any tweet yet</Text>
        <Button title="Tweet Now!" onPress= {()=>{navigation.navigate("New Tweet")}}/>
        <Button title="Logout" onPress= {()=>{logout()}}/>
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
