import { View, Text, StyleSheet, Image, TextInput, Button } from "react-native";
import { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { DataStore } from "@aws-amplify/datastore";
import { Post, User } from "../models";
import { Auth } from "aws-amplify";

const dummy_img =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/user.png";


const CreatePostScreen = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [user, setUser] = useState()
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await Auth.currentAuthenticatedUser();
      const dbUser = await DataStore.query(User, userData.attributes.sub);
      if (dbUser) {
        setUser(dbUser);
        console.log(dbUser);
      } else {
        navigation.navigate("Update profile");
      }
    };
  
    fetchUser();
  }, [])

  const onSubmit = async () => {
    const userData = await Auth.currentAuthenticatedUser();

    const newPost = new Post({
      description,
      // image
      numberOfLikes: 0,
      numberOfShares: 0,
      postUserId: userData.attributes.sub,
      _version: 1,
    });

    await DataStore.save(newPost);

    setDescription("");
    navigation.goBack();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user?.image || dummy_img }} style={styles.profileImage} />
        <Text style={styles.name}>{user?.name}</Text>
        <Entypo
          onPress={pickImage}
          name="images"
          size={24}
          color="limegreen"
          style={styles.icon}
        />
      </View>

      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="What is on your mind ?"
        multiline
      />
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.buttonContainer}>
        <Button title="Post" onPress={onSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 10,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  profileImage: {
    height: 45,
    width: 45,
    borderRadius: 30,
    marginRight: 10,
  },
  name: {
    fontWeight: "500",
  },
  buttonContainer: {
    marginTop: "auto",
    marginVertical: 10,
  },
  icon: {
    marginLeft: "auto",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
});

export default CreatePostScreen;
