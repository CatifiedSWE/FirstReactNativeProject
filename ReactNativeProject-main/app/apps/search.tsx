import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ScreenHeight } from "@rneui/base";
import _ from "lodash";

export default function search() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<Boolean>(false);

  const [search, setSearch] = useState<String>("");
  const [filteredUser, setFilterUser] = useState<any[]>([]);

  const fetchUserData = async () => {
    try {
      const response = await fetch("https://randomuser.me/api/?results=10");

      const data = await response.json();
      setData(data.results);
      setLoading(false);
    } catch {
      console.log("error boss");
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const toFilter = _.filter(data, (data: any) =>
      `${data.name.first} ${data.name.last}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
    setFilterUser(toFilter);
  }, [search, data]);
  const renderData = ({ item }: { item: any }) => (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        padding: 20,
        borderColor: "#000",
        borderWidth: 2,
        marginHorizontal: 15,
        marginTop: 10,
        borderRadius: 15,
      }}
    >
      <View>
        <Image
          source={{
            uri: item.picture.medium,
          }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 10,
          }}
        />
      </View>
      <View>
        <Text style={{ fontWeight: "medium", fontSize: 20 }}>
          {item.name.first} {item.name.last}
        </Text>
        <Text style={{ fontWeight: "light", color: "#adadad" }}>
          {item.email}
        </Text>
      </View>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Search App 🔍</Text>
          <Text style={styles.subTitle}>
            Start by seaching for name or with email from the given contact list
          </Text>
        </View>

        <TextInput
          style={{
            height: 50,
            borderWidth: 2,
            borderRadius: 50,
            paddingLeft: 20,
            paddingRight: 10,
            borderColor: "#000",
          }}
          placeholder="Search User...."
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <View style={{ flex: 1 }}>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
              alignContent: "center",
              marginBottom: ScreenHeight - ScreenHeight * 0.8,
            }}
          >
            <ActivityIndicator size="large" color="#ff1414" />
            <Text
              style={{
                marginTop: 10,
                fontSize: 15,
              }}
            >
              Loading Please Wait
            </Text>
          </View>
        ) : error ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: ScreenHeight - ScreenHeight * 0.8,
            }}
          >
            <Text
              style={{
                fontSize: 70,
                fontWeight: "bold",
                color: "#adadad",
              }}
            >
              404
            </Text>
            <Text>API isn't working unfortunately</Text>
          </View>
        ) : (
          <FlatList
            style={{
              marginTop: 25,
            }}
            data={filteredUser}
            keyExtractor={(item) => item.email}
            renderItem={renderData}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
  },
  textContainer: {
    marginVertical: 25,
  },
  subTitle: {
    fontSize: 18,
  },
});
