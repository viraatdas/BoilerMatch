import React, { useState, useEffect } from "react";
import { View, ImageBackground, Modal, Alert, Pressable } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import City from "../components/City";
import Filters from "../components/Filters";
import CardItem from "../components/CardItem";
import styles from "../assets/styles";
import { Demo } from "../assets/data/Demo";
import { Picker } from "@react-native-picker/picker";

export default function TabOneScreen() {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [state, setState] = useState(new Map());

  var curr_swiper = null;
  // useEffect(() =>

  // )
  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.containerHome}>
        <View style={styles.top}>
          <City />
          <Filters onChange={(value) => setPickerVisible(value)} />
        </View>

        <CardStack
          loop={false}
          verticalSwipe={true}
          renderNoMoreCards={() => null}
          ref={(swiper) => (curr_swiper = swiper)}
        >
          {Demo.map((item, index) => (
            <Card key={index}>
              <CardItem
                image={item.image}
                name={item.name}
                description={item.description}
                // matches={item.match}
                actions
                onPressLeft={() => curr_swiper.swipeLeft()}
                onPressRight={() => curr_swiper.swipeRight()}
              />
            </Card>
          ))}
        </CardStack>
      </View>
      {pickerVisible && (
        <View style={styles.top}>
          <Picker
            style={{
              justifyContent: "space-between",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <Picker.Item label="😈🍆🍑" value="hookup" />
            <Picker.Item label="❤️✨❤️" value="love" />
            <Picker.Item label="👯‍♀️👯‍♂️" value="friend" />
          </Picker>
        </View>
      )}
    </ImageBackground>
  );
}
