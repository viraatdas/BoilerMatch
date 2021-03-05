import React, { useState } from "react";

import styles from "../assets/styles";

import { Text, TouchableOpacity, Button, Alert } from "react-native";
import Icon from "./Icon";

const Filters = (props) => {
  const [showPicker, setPicker] = useState(false);
  const handleOnPress = () => {
    setPicker(!showPicker);
  };

  return (
    <TouchableOpacity
      style={styles.filters}
      onPress={() => {
        setPicker(!showPicker);
        props.onChange(showPicker);
      }}
    >
      <Text style={styles.filtersText}>
        <Icon name="filter" />
      </Text>
    </TouchableOpacity>
  );
};

export default Filters;
