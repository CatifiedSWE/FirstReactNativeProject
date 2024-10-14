import { FlatList, View, Text, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import React from "react";

type Item = {
  id: string;
  title: string;
};

const items: Item[] = [
  { id: "/apps/counter", title: "Counter App 🔘 " },
  { id: "/apps/blogApp", title: "Blog Post 🔥" },
  { id: "/apps/todoList", title: "Todo List 🏁" },
  { id: "/apps/search", title: "Search 🔍 " },
  { id: "/apps/localstorage", title: "Local Storage 🏬" },
];

export default function Page() {
  const renderItem = ({ item }: { item: Item }) => (
    <Link
      push
      href={item.id}
      style={{
        marginTop: 20,
      }}
    >
      <View
        style={{
          backgroundColor: "#000",
          padding: 20,
          width: 350,
          marginVertical: 8,
          marginHorizontal: 16,
          flex: 1,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 32,
            color: "#fff",
          }}
        >
          {item.title}
        </Text>
      </View>
    </Link>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        alignSelf: "center",
        alignContent: "center",
      }}
    >
      <View
        style={{
          margin: "auto",
          padding: "auto",
          marginVertical: 8,
          marginHorizontal: 16,
          paddingBottom: 20,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 50,
            paddingTop: 25,
          }}
        >
          May Projects
        </Text>

        <Text
          style={{
            fontSize: 20,
            marginVertical: 5,
          }}
        >
          List of projects made in the month of May, all the files are linked as
          a link tree
        </Text>
      </View>

      <FlatList
        style={{
          marginBottom: 1,
        }}
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
