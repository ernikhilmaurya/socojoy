import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LiveEventScreen({ route, navigation }) {
  const { event } = route.params;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: "1", user: "User123", text: "Looks delicious, Chef!" },
    { id: "2", user: "FoodieFan", text: "What kind of cheese are you using?" },
    { id: "3", user: "CookingPro", text: "Great tips on the guanciale!" },
    { id: "4", user: "Recipelover", text: "Can't wait to try this at home!" },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        { id: Date.now().toString(), user: "You", text: message },
      ]);
      setMessage("");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Live Cooking</Text>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      {/* Video Stream */}
      <View style={styles.videoContainer}>
        <Image
          source={{ uri: event.thumbnail }}
          style={styles.videoStream}
          resizeMode="cover"
        />
        <View style={styles.videoOverlay}>
          <Text style={styles.videoTitle}>Mastering Pasta Carbonara Live</Text>
          <Text style={styles.chefName}>Chef Isabella Rossi</Text>
        </View>
      </View>

      {/* Chef Info Section */}
      <View style={styles.chefInfoContainer}>
        <Image
          source={{ uri: "https://picsum.photos/100?random=11" }}
          style={styles.chefImage}
        />
        <View style={styles.chefDetails}>
          <Text style={styles.chefName}>Chef Isabella Rossi</Text>
          <Text style={styles.chefBio}>
            Italian Cuisine Specialist • 15 years experience
          </Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1.2M</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.9</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Live Chat Section */}
      <View style={styles.chatContainer}>
        <Text style={styles.sectionTitle}>Live Chat</Text>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.messageContainer}>
              <Text style={styles.messageUser}>{item.user}:</Text>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
          contentContainerStyle={styles.chatList}
          inverted
        />
      </View>

      {/* Message Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Say something..."
          value={message}
          onChangeText={setMessage}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    paddingTop: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
    marginRight: 4,
  },
  liveText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  videoContainer: {
    aspectRatio: 16 / 9,
    position: "relative",
  },
  videoStream: {
    width: "100%",
    height: "100%",
  },
  videoOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  videoTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  chefName: {
    color: "white",
    fontSize: 14,
  },
  chefInfoContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  chefImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  chefDetails: {
    flex: 1,
    justifyContent: "center",
  },
  chefBio: {
    color: "#666",
    fontSize: 14,
    marginVertical: 5,
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  statValue: {
    fontWeight: "bold",
    marginRight: 5,
  },
  statLabel: {
    color: "#666",
  },
  chatContainer: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chatList: {
    paddingBottom: 15,
  },
  messageContainer: {
    marginBottom: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  messageUser: {
    fontWeight: "bold",
    marginRight: 5,
    color: "#333",
  },
  messageText: {
    color: "#333",
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#FF6B6B",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
