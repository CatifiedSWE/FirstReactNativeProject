import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScreenHeight } from "@rneui/base";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

export default function TodoList() {
  let [initialText, updateText]: any = useState("");
  let [list, updatelist]: any[] = useState([]);
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(true);

  const addElement = () => {
    if (initialText.trim() != "") {
      updatelist([...list, initialText]);
      updateText("");
    }
  };
  useEffect(() => {
    retriveFromLocalStorage();
  }, []);

  const retriveFromLocalStorage = async () => {
    try {
      const retrivedLocalTodoListData =
        await AsyncStorage.getItem("localTodoData");
      setLoading(false);
      if (retrivedLocalTodoListData != null) {
        updatelist(JSON.parse(retrivedLocalTodoListData));
      }
    } catch {
      console.log("retriveFromLocalStorage");
      setError(true);
    }
  };
  const addToLocalStorage = async () => {
    try {
      await AsyncStorage.setItem("localTodoData", JSON.stringify(list));
    } catch {
      console.log("error store pana mudiyilla boss boss");
      setError(true);
    }
  };

  useEffect(() => {
    addToLocalStorage();
  }, [list]);

  const deleteItem = (index: number) => {
    const updatedItems = list.filter((_: any, i: any) => i !== index);
    updatelist(updatedItems);
  };

  return (
    <View
      style={{
        marginHorizontal: 10,
        marginVertical: 50,
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 50,
            fontWeight: "bold",
            marginBottom: 15,
          }}
        >
          Todo List 🏁
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            value={initialText}
            onChangeText={updateText}
            style={{
              paddingLeft: 10,
              height: screenHeight * 0.07,
              borderColor: "#034",
              borderWidth: 2,
              borderRadius: 10,
              width: screenWidth - screenWidth * 0.25,
            }}
          />
          <View>
            <TouchableOpacity disabled={initialText == ""} onPress={addElement}>
              <Text
                style={{
                  backgroundColor: initialText == "" ? "#7979fc" : "#1919ff",

                  color: initialText == "" ? "#dedede" : "#fff",
                  paddingTop: screenHeight * 0.022,

                  paddingBottom: screenHeight * 0.022,
                  paddingRight: 20,
                  paddingLeft: 20,
                  marginHorizontal: 5,
                  borderRadius: 10,
                }}
              >
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          height: 20,
        }}
      ></View>

      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
          }}
        >
          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#adadad",
                  marginTop: screenHeight - ScreenHeight * 0.7,
                }}
              >
                Checking for Data in local{" "}
              </Text>
            </View>
          ) : list.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                alignSelf: "center",
                marginTop: screenHeight - screenHeight * 0.8,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignContent: "center",
                  alignSelf: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    marginLeft: 20,
                  }}
                  source={require("./assets/todo.png")}
                />
                <Text
                  style={{
                    fontSize: 25,
                    marginTop: 20,
                    color: "#adadad",
                  }}
                >
                  Add Some Task
                </Text>
              </View>
            </View>
          ) : error ? (
            <View>
              <Text>
                There is some error regarding importing data from your local
                storage{" "}
              </Text>
            </View>
          ) : (
            list.map((item: string, index: number) => (
              <View
                style={{
                  borderWidth: 2,
                  borderColor: "#02000f",
                  padding: 15,
                  width: screenWidth - screenWidth * 0.065,
                  marginTop: 10,
                  borderRadius: 15,
                  flex: 1,
                  flexDirection: "row",
                }}
                key={index}
              >
                <Text style={{ fontSize: 20, flex: 1 }} key={index}>
                  {item} {""}
                </Text>
                <TouchableOpacity onPress={() => deleteItem(index)}>
                  <View
                    style={{
                      backgroundColor: "#ff1900",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: "#fff",
                        backgroundColor: "#ff1900",
                        padding: 5,
                      }}
                    >
                      <EvilIcons name="trash" size={24} color="white" />
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
