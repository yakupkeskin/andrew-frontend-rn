import { View, Text } from "react-native";
import React from "react";
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';
import { useEffect } from "react";

export default function Ad() {
  const interstal = async () => {
    await AdMobInterstitial.setAdUnitID(
      "ca-app-pub-3940256099942544/1033173712"
    ); // Test ID, Replace with your-admob-unit-id
    try{
        await AdMobInterstitial.requestAdAsync();
        await AdMobInterstitial.showAdAsync();
    }
    catch(error){
        console.log("eroor",error)
    }
  
  };

  useEffect(() => {
    interstal();
  }, [])
  

  return (
    <View>
        <View style={{marginBottom:20,borderRadius:20,marginLeft:70}}>
      <AdMobBanner
        bannerSize="banner"
        adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds // true or false
      />
      </View>
      <View>
      <PublisherBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
      />
      </View>
      
    </View>
  );
}
