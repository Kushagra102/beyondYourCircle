import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import LikeImage from "../../assets/images/like.png";
import {
  Entypo,
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const dummy_img =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/user.png";


const FeedPost = ({ post, user }) => {
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(false);

  return (
    <View style={styles.post}>
      {/* Post Header */}
      <Pressable
        style={styles.header}
        onPress={() => navigation.navigate("Profile", { id: post.postUserId })}
      >
        <Image
          source={{ uri: user?.image || post?.User?._j?.image || dummy_img}}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.name}>{user ? user?.name : post?.User?._j?.name}</Text>
          <Text style={styles.subtitle}>{post.createdAt}</Text>
        </View>
        <Entypo
          name="dots-three-horizontal"
          size={18}
          color="gray"
          style={styles.icon}
        />
      </Pressable>

      {/* Post body */}

      {post.description && (
        <Text style={styles.description}>{post.description}</Text>
      )}

      {post.image && (
        <Image
          source={{ uri: post.image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      {/* Post footer */}
      <View style={styles.footer}>
        <View style={styles.statsRow}>
          <Image source={LikeImage} style={styles.likeIcon} />
          <Text style={styles.likedBy}>
            John Doe and {post.numberOfLikes} others
          </Text>
          <Text style={styles.sharedBy}>{post.numberOfShares} shares</Text>
        </View>

        <View style={styles.buttonsRow}>
          <Pressable
            style={styles.iconButton}
            onPress={() => setIsLiked(!isLiked)}
          >
            <AntDesign
              name="like2"
              size={18}
              color={isLiked ? "royalblue" : "gray"}
            />
            <Text
              style={[
                styles.iconButtonText,
                { color: isLiked ? "royalblue" : "gray" },
              ]}
            >
              Like
            </Text>
          </Pressable>

          <View style={styles.iconButton}>
            <FontAwesome5 name="comment-alt" size={16} color="gray" />
            <Text style={styles.iconButtonText}>Comment</Text>
          </View>

          <View style={styles.iconButton}>
            <MaterialCommunityIcons
              name="share-outline"
              size={18}
              color="gray"
            />
            <Text style={styles.iconButtonText}>Share</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    width: "100%",
    marginVertical: 10,
    backgroundColor: "white",
  },

  //header

  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 8,
  },
  name: {
    fontWeight: "500",
  },
  subtitle: {
    color: "gray",
  },
  icon: {
    marginLeft: "auto",
  },

  //body

  description: {
    paddingHorizontal: 10,
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    marginTop: 10,
  },

  //footer

  footer: {
    paddingHorizontal: 10,
  },
  statsRow: {
    paddingVertical: 10,
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "lightgray",
  },
  likeIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  likedBy: {
    color: "gray",
  },
  sharedBy: {
    color: "gray",
    marginLeft: "auto",
  },

  // Buttons Row
  buttonsRow: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButtonText: {
    color: "gray",
    marginLeft: 5,
    fontWeight: "500",
  },
});

export default FeedPost;
