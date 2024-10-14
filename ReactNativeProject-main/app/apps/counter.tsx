import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function counter() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Press the Button</Text>
      <Text
        style={{
          color: "#7d7d7d",
          fontSize: 50,
        }}
      >
        {count}
      </Text>
      <TouchableOpacity onPress={() => setCount(count + 1)}>
        <View
          style={{
            borderRadius: 100,

            backgroundColor: "#02f",
            margin: "auto",
            padding: 20,
          }}
        >
          <Text style={{ color: "#fff" }}>Press here</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
});
