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
import noteService from "../services/noteService";

const NoteView = ({ toggleDrawer, note, addTag, addComment, removeTag, newTag, newComment, setNewTag, setNewComment }: any) => {
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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Note Details</Text>
        <TouchableOpacity onPress={toggleDrawer}>
          <IconButton style={styles.closeButton} icon="close" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.detailsBox}>
          {[
            { label: "Title:", value: note?.Title },
            {
              label: "Created At:",
              value: new Date(note?.createdAt).toLocaleDateString(),
            },
            {
              label: "Description:",
              value: note?.content || "No description provided",
            },
            { label: "Created By:", value: note?.userId?.name },
            { label: "Modified By:", value: note?.modifiedby?.name },
            {
              label: "Updated At:",
              value: new Date(note?.updatedAt).toLocaleDateString(),
            },
            {
              label: "Favorite:",
              value: note?.isFavorite ? "Yes" : "No",
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
            {note?.tags?.map((tag: { _id: React.Key; name: string }) => (
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
              mode="outlined"
              value={newTag}
              onChangeText={setNewTag}
              style={{ width: "66%", height: 40 }}
              placeholder="add tag"
            />
            <Button
              mode="outlined"
              icon='plus-outline'
              onPress={addTag}
              style={{ width: "30%", height: 40, borderRadius: 0 }}
            >
              Add 
            </Button>
          </View>
        </View>

        <View style={styles.commentsContainer}>
          <Text style={styles.sectionTitle}>Comments</Text>
          {note?.comments?.length > 0 ? (
            <FlatList
              data={note.comments}
              renderItem={renderComment}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.flatListContainer}
            />
          ) : (
            <Text style={styles.noComments}>No comments yet.</Text>
          )}
          <View style={styles.addCommentContainer}>
            <TextInput
              mode="outlined"
              value={newComment}
              onChangeText={setNewComment}
              style={{ width: "66%", height: 40 }}
              placeholder="Add a new comment"
            />
            <Button
              icon='plus-outline'
              onPress={addComment}
              mode="outlined"
              style={styles.addButton}
            > Add
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
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
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  addButton: {
    height: 40,
    width: "33%",
    borderRadius:0
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
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default NoteView;
