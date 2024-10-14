import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  SafeAreaView,
  SafeAreaViewComponent,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScreenWidth } from "@rneui/base";

export default function localstorage() {
  const [error, setError] = useState(false);

  const [fetched, setFetched] = useState<boolean>(true);
  const [data, setData] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAPI = async () => {
    try {
      const data = await fetch("https://randomuser.me/api/?results=5");
      const APIdata = await data.json();

      setData(APIdata.results);
      setFetched(false);
    } catch {
      setError(true);
    }
  };

  const storeAPIData = async () => {
    try {
      await AsyncStorage.setItem("APIdata", JSON.stringify(data));
    } catch {
      setError(true);
    }
  };

  const getStoredAPIDataFromLocal = async () => {
    try {
      setLoading(true);
      const dataFromLocal = await AsyncStorage.getItem("APIdata");
      if (dataFromLocal != null) {
        setData(JSON.parse(dataFromLocal));
        setFetched(false);
      }
      setLoading(false);
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    storeAPIData();
    getStoredAPIDataFromLocal();
  }, [data]);

  const dataItems = ({ item }: { item: any }) => (
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
      <View
        style={{
          marginTop: 40,

          marginHorizontal: 20,
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 35, fontWeight: "bold" }}>
          Local Storage
        </Text>
        <Text style={{ fontWeight: "light" }}>
          Click fetch button to fetch data from an API end point and the data
          will be stored in your device, which allows you to access the data
          even when you are offline
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        {fetched ? (
          <View style={{ flex: 1, alignItems: "center" }}>
            <View>
              <Text style={{ fontSize: 20 }}>Click Here to fetch the API</Text>
              <TouchableOpacity onPress={fetchAPI}>
                <View
                  style={{
                    backgroundColor: "#0066ff",
                    padding: 20,
                    marginTop: 10,
                  }}
                >
                  <Text style={{ color: "#fff" }}>Fetch API</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : loading ? (
          <View>
            <Text>Hello</Text>
          </View>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.email}
            renderItem={dataItems}
          />
        )}
      </View>
    </View>
  );
}
