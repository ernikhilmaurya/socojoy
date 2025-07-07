import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import BASE_URL from "../constants/constants";

export default function RegistrationModal({ visible, onClose, onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [username, setUsername] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null); // 🆕
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [foodPreference, setFoodPreference] = useState("");

  // 🆕 validate username via API
  const checkUsernameAvailability = async (name) => {
    setCheckingUsername(true);
    try {
      const res = await axios.get(
        `${BASE_URL}check-username?username=${encodeURIComponent(name)}`
      );
      if (res.data.status === "success" && res.data.data.available) {
        setIsUsernameAvailable(true);
      } else {
        setIsUsernameAvailable(false);
      }
    } catch (error) {
      console.error("Username check failed:", error);
      setIsUsernameAvailable(false);
    }
    setCheckingUsername(false);
  };

  const onUsernameChange = (text) => {
    setUsername(text);
    if (text.trim().length > 2) {
      // check only if length > 2
      checkUsernameAvailability(text.trim());
    } else {
      setIsUsernameAvailable(null);
    }
  };
  // ✅ Validation
  const isStep1Valid =
    fullName.trim() !== "" && dob.trim() !== "" && username.trim() !== "";
  const isStep2Valid = acceptTerms;
  const isStep3Valid = foodPreference !== "";

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    onComplete({
      fullName,
      dob,
      username,
      profilePic,
      acceptTerms,
      foodPreference,
    });
    setCurrentStep(1);
  };

  const openImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };
  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios"); // on Android, closes automatically
    if (selectedDate) {
      setDob(selectedDate.toISOString().split("T")[0]); // format as YYYY-MM-DD
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.stepIndicator}>Step {currentStep} / 3</Text>

          {currentStep === 1 && (
            <>
              <TextInput
                placeholder="Full Name"
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
              />
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.input}
              >
                <Text style={{ color: dob ? "#000" : "#999" }}>
                  {dob ? dob : "Date of Birth"}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={dob ? new Date(dob) : new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
              <TextInput
                placeholder="Username"
                style={styles.input}
                value={username}
                onChangeText={onUsernameChange}
              />
              {checkingUsername ? (
                <ActivityIndicator size="small" color="#4B0B0C" />
              ) : isUsernameAvailable === true ? (
                <Text style={{ color: "green" }}>Username available</Text>
              ) : isUsernameAvailable === false ? (
                <Text style={{ color: "red" }}>Username taken</Text>
              ) : null}
            </>
          )}

          {currentStep === 2 && (
            <>
              <Text style={styles.sectionTitle}>
                Upload Profile Picture (optional)
              </Text>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  style={styles.uploadBtn}
                  onPress={openImagePicker}
                >
                  <Text>Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.uploadBtn} onPress={openCamera}>
                  <Text>Camera</Text>
                </TouchableOpacity>
              </View>
              {profilePic && (
                <Image
                  source={{ uri: profilePic }}
                  style={styles.profileImage}
                />
              )}

              <View style={styles.checkboxRow}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => setAcceptTerms(!acceptTerms)}
                >
                  {acceptTerms && <View style={styles.checkboxTick} />}
                </TouchableOpacity>
                <Text>I accept terms & conditions</Text>
              </View>
            </>
          )}

          {currentStep === 3 && (
            <>
              <Text style={styles.sectionTitle}>Food Preference</Text>
              <TouchableOpacity
                style={[
                  styles.toggleBtn,
                  foodPreference === "veg" && styles.selected,
                ]}
                onPress={() => setFoodPreference("veg")}
              >
                <Text>Veg</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toggleBtn,
                  foodPreference === "non-veg" && styles.selected,
                ]}
                onPress={() => setFoodPreference("non-veg")}
              >
                <Text>Non-Veg</Text>
              </TouchableOpacity>
            </>
          )}

          <View style={styles.buttonRow}>
            {currentStep > 1 && (
              <TouchableOpacity onPress={handlePrev}>
                <Text style={styles.buttonText}>Prev</Text>
              </TouchableOpacity>
            )}
            {currentStep < 3 ? (
              <TouchableOpacity
                onPress={handleNext}
                disabled={
                  (currentStep === 1 && !isStep1Valid) ||
                  (currentStep === 2 && !isStep2Valid)
                }
                style={[
                  styles.nextBtn,
                  ((currentStep === 1 && !isStep1Valid) ||
                    (currentStep === 2 && !isStep2Valid)) &&
                    styles.disabled,
                ]}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={!isStep3Valid}
                style={[styles.nextBtn, !isStep3Valid && styles.disabled]}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  stepIndicator: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 15,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  uploadBtn: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: "center",
    marginTop: 10,
  },
  checkboxRow: { flexDirection: "row", alignItems: "center" },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#000",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxTick: { width: 12, height: 12, backgroundColor: "#000" },
  toggleBtn: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
  },
  selected: { backgroundColor: "#ddd" },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  nextBtn: { paddingHorizontal: 10, paddingVertical: 5 },
  disabled: { opacity: 0.4 },
  buttonText: { fontWeight: "bold", color: "#4B0B0C" },
  sectionTitle: { marginBottom: 8, fontWeight: "bold" },
});
