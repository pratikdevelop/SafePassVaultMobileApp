import PasswordService from "../services/passwordservice";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import MenuDrawer from "react-native-side-drawer";

const PasswordViewScreen = ({
  toggleDrawer,
  password,
  removeTag,
  open = false,
  drawerPercentage = 100,
  animationTime = 250,
  opacity = 0.1,
}: any) => {
  const [newTag, setNewTag] = useState("");
  const [newComment, setNewComment] = useState("");
  const position = "right";

  const addTag = async () => {
    if (newTag !== "") {
      const response = await PasswordService.addTagToPassword(
        password._id,
        newTag
      );
      setNewTag("");
      password.tags.push(response.tag);
    }
  };

  const addComment = async () => {
    if (newComment !== "") {
      try {
        const response = await PasswordService.postComment(
          password._id,
          newComment
        );
        setNewComment("");
        password.comments.push(response.comment);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const renderComment = ({ item }: any) => (
    <View style={styles.commentContainer}>
      <View style={styles.comment}>
        <Text style={styles.commentAuthor}>
          {item.createdBy?.name || item.userName}
        </Text>
        <Text style={styles.commentContent}>{item.content}</Text>
        <Text style={styles.commentDate}>
          {new Date(item.createdAt).toLocaleString()}
        </Text>
      </View>
      <View style={styles.commentSeparator} />
    </View>
  );

  const drawerContent = () => {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Password Details</Text>
          <TouchableOpacity onPress={toggleDrawer}>
            <IconButton style={styles.closeButton} icon="close" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.detailsBox}>
            {/* Password Details */}
            {[
              { label: "Title:", value: password?.name },
              {
                label: "Created At:",
                value: new Date(password?.createdAt).toLocaleDateString(),
              },
              { label: "Website:", value: password?.website },
              { label: "Username:", value: password?.username },
              { label: "Password:", value: password?.password },
              {
                label: "Description:",
                value: password?.description || "No description provided",
              },
              { label: "Created By:", value: password?.created_by?.name },
              { label: "Modified By:", value: password?.modifiedby?.name },
              {
                label: "Updated At:",
                value: new Date(password?.updatedAt).toLocaleDateString(),
              },
              {
                label: "Favorite:",
                value: password?.isFavorite ? "Yes" : "No",
              },
            ].map(({ label, value }, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.label}>{label}</Text>
                <Text>{value}</Text>
              </View>
            ))}
          </View>

          {/* Tags Section */}
          <View style={styles.tagsContainer}>
            <Text style={styles.sectionTitle}>Tags</Text>
            <View style={styles.tagsWrapper}>
              {password?.tags?.map((tag: { _id: React.Key; name: string }) => (
                <View key={tag._id} style={styles.tag}>
                  <Text>{tag.name}</Text>
                  <TouchableOpacity onPress={() => removeTag(tag._id)}>
                    <Text style={styles.removeTag}>x</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <View style={styles.addTagContainer}>
              <TextInput
                value={newTag}
                onChangeText={setNewTag}
                style={{
                  width: "66%",
                  height: 40,
                }}
                placeholder="Add a new tag"
              />
              <Button
                style={{
                  width: "30%",
                  height: 40,
                  alignContent: "center",

                  borderRadius: 0,
                }}
                mode="contained"
                onPress={addTag}
              >
                Add Tag
              </Button>
            </View>
          </View>

          {/* Comments Section */}
          <View style={styles.commentsContainer}>
            <Text style={styles.sectionTitle}>Comments</Text>
            {password?.comments?.length > 0 ? (
              <FlatList
                data={password.comments}
                renderItem={renderComment}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.flatListContainer}
              />
            ) : (
              <Text style={styles.noComments}>No comments yet.</Text>
            )}
            <View style={styles.addCommentContainer}>
              <TextInput
                value={newComment}
                onChangeText={setNewComment}
                style={{
                  width: "66%",
                  height: 40,
                }}
                placeholder="Add a new comment"
              />
              <Button
                onPress={addComment}
                mode="contained"
                style={styles.addButton}
              >
                <Text style={styles.postButtonText}>Post Comment</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <MenuDrawer
      open={open}
      drawerContent={drawerContent()}
      position={position}
      drawerPercentage={drawerPercentage}
      animationTime={animationTime}
      opacity={opacity}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeButton: {
    borderRadius: 25,
    borderWidth: 1,
    padding: 8,
    borderColor: "gray",
    marginLeft: "auto",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detailsBox: {
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    width: 120,
  },
  tagsContainer: {
    marginBottom: 16,
  },
  tagsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#E0F7FA",
    borderRadius: 16,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  removeTag: {
    color: "red",
    marginLeft: 8,
  },
  addTagContainer: {
    display: "flex",
    width: "auto",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  addButton: {
    height: 40,
    width: "33%",
  },
  addButtonText: {
    color: "white",
    fontSize: 10,
    fontWeight: 700,
  },
  commentsContainer: {
    marginBottom: 20,
  },
  flatListContainer: {
    flexGrow: 1,
    gap: 5,
  },
  commentContainer: {
    marginVertical: 4,
  },
  comment: {
    flexDirection: "column",
  },
  commentAuthor: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  commentContent: {
    marginVertical: 4,
  },
  commentDate: {
    color: "gray",
    fontSize: 12,
  },
  commentSeparator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 8,
  },
  noComments: {
    color: "gray",
    marginVertical: 8,
  },
  addCommentContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  postButtonText: {
    color: "white",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default PasswordViewScreen;
