import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { DataStore } from "aws-amplify";
import { User } from "../models";
import { useNavigation } from "@react-navigation/native";

const dummy_img =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/user.png";

const createUser = `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      createdAt
      updatedAt
      name
      image
      _version
      _lastChangedAt
      _deleted
    }
  }
`;
const UpdateProfileScreen = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await Auth.currentAuthenticatedUser();

      const dbUser = await DataStore.query(User, userData.attributes.sub);
      setUser(dbUser);
      setName(dbUser?.name);
    };
    fetchUser();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSave = async () => {
    if (user) {
      await updateUser();
    } else {
      await createUserFn();
    }
    navigation.goBack();
  };

  const updateUser = async () => {
    await DataStore.save(
      User.copyOf(user, (update) => {
        update.name = name;
      })
    );
  };

  const createUserFn = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      console.log(userData)
      console.log(name)
      const newUser = {
        id: userData.attributes.sub,
        name,
        _version: 1,
      };
      console.log(newUser)

      await API.graphql(graphqlOperation(createUser, { input: newUser }));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={pickImage} style={styles.imagePickerContainer}>
        <Image
          source={{ uri: image || user?.image || dummy_img }}
          style={styles.image}
        />
        <Text>Change photo</Text>
      </Pressable>

      <TextInput
        placeholder="Full name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <View style={styles.buttonContainer}>
        <Button onPress={onSave} title="Save" disabled={!name} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
  },
  imagePickerContainer: {
    alignItems: "center",
  },
  image: {
    width: "30%",
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 500,
  },
  input: {
    borderColor: "lightgray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "100%",
    marginVertical: 10,
    padding: 10,
  },
  buttonContainer: {
    marginTop: "auto",
    marginBottom: 10,
    alignSelf: "stretch",
  },
});

export default UpdateProfileScreen;
