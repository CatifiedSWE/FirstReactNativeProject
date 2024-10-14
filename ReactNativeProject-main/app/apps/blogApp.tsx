import * as React from "react";
import {
  Dimensions,
  View,
  Image,
  Text,
  FlatList,
  Button,
  ScrollView,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
console.log(screenWidth * 0.001);

type BlogPost = {
  title: String;
  content: String;
  id: string;
  imagesrc: any;
  sub: string;
};

const blogPosts: BlogPost[] = [
  {
    title: "Why Maine Coone the best",
    content: `The Maine Coon is a large domesticated cat breed. It is one of the oldest natural breeds in North America. The breed originated in the U.S. state of Maine,[3] where it is the official state cat.

The Maine Coon is a large and social cat, which could be the reason why it has a reputation of being referred to as "the gentle giant." The Maine Coon is predominantly known for its size and dense coat of fur which helps it survive in the harsh climate of Maine. The Maine Coon is often cited as having "dog-like" characteristics, conclusion because it is maine coon`,
    id: "1",
    imagesrc: require("./assets/maine_coon.jpg"),
    sub: "Ever wondered why Maine coon are the best cats in the world? i even don't why it is, may i am based? who know, that is the whole purpose of the blog",
  },
  {
    title: "HTML S tier programming language",
    content: `HTML is the foundation of basically every web page. It’s how we tell browsers to structure content into paragraphs, headings, images, links, lists, forms, tables, buttons, and more. If you’re interested in building a website, web development, or just coding in general, learning HTML is a great place to start.

In this guide to HTML for beginners, we’ll learn what HTML is and what it’s used for. Then, we’ll walk through how to write some basic HTML and review some of its most important elements and attributes. We’ll end with a brief look at some resources you can use to continue learning and using HTML., if you still believe HTML is programming language then ahh you are good to go`,
    id: "2",
    imagesrc: require("./assets/html.jpg"),
    sub: "HTML, ahh yes S tier programming language, html stands for markup standardd language i don't don't ask me but it is what is it is not-",
  },
  {
    title: "Dogs: The Best Programmers",
    content: `Forever friends, loyal companions and co-pilot for life, dogs are at the left, right and centre of everything good with this world. Dog with Blog started from campus to find homes for stray and abandoned dogs.

Over the years, and hundreds of adoptions later, thanks to kind hearts like YOU we continue to discover the dog; his musings and wanderings.

Stay around for adoption updates, anecdotes, and rants ― The world, as seen through the words of a dog…`,
    id: "3",
    imagesrc: require("./assets/dog.jpg"),
    sub: "Dogs are the best programmers in the world if you know there are certain rumores going around that AI means (Actually isDog) not Artificial Intelegence",
  },
];

function HomeScreen({ navigation }: any) {
  return (
    <View
      style={{
        marginHorizontal: 8,
      }}
    >
      <View
        style={{
          margin: "auto",
          backgroundColor: "#fff",
        }}
      >
        <StatusBar backgroundColor="#004262" />

        <FlatList
          data={blogPosts}
          renderItem={({ item }: { item: BlogPost }) => (
            <View
              style={{
                marginTop: 20,
                height: "auto",
                flex: 1,
                alignItems: "center",
                padding: 20,
                borderColor: "#000",
                borderWidth: 2,
                borderRadius: 10,
              }}
            >
              <Image
                style={{
                  width: screenWidth * 0.9,
                  height: screenHeight * 0.3, // Set the width to 80% of the screen width
                }}
                source={item.imagesrc}
              />

              <View
                style={{
                  marginHorizontal: screenWidth * 0.001,
                  marginVertical: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: "bold",
                  }}
                >
                  {item.title}
                </Text>
                <Text>{item.sub}</Text>
                <View
                  style={{
                    marginTop: 5,
                  }}
                >
                  <Button
                    title="Read More"
                    onPress={() =>
                      navigation.push("Details", {
                        title: item.title,
                        content: item.content,
                        img: item.imagesrc,
                      })
                    }
                  />
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

function DetailsScreen({ route, navigation }: any) {
  const { title, img, content } = route.params;

  return (
    <ScrollView>
      <Image
        style={{
          width: screenWidth * 1,
          height: screenHeight * 0.35,
        }}
        source={img}
      />

      <View
        style={{
          marginHorizontal: screenWidth * 0.01,
        }}
      >
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            marginVertical: 5,
            fontSize: 20,
          }}
        >
          {content}
        </Text>
      </View>
      <StatusBar backgroundColor="#fff" />
    </ScrollView>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        options={{
          title: "Blog App",
          headerStyle: {
            backgroundColor: "#004266",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
        name="home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          title: "Blog Post",
          headerTitleAlign: "center",
        }}
        name="Details"
        component={DetailsScreen}
      />
    </Stack.Navigator>
  );
}

export default App;
