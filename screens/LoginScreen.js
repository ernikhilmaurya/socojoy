import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  ToastAndroid,
} from "react-native";
import InputBox from "../components/InputBox";
import PrimaryButton from "../components/PrimaryButton";
import { useState } from "react";
import axios from "axios";
import BASE_URL from "../constants/constants";

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState("");

  const handleSendOTP = async () => {
    const validationError = validatePhoneNumber(phone);
    if (validationError) {
      ToastAndroid.show(validationError, ToastAndroid.SHORT);
      return;
    }
    try {
      await axios.post(BASE_URL + "generate-otp", {
        phone_number: phone,
      });
      ToastAndroid.show(
        "OTP Sent to entered number and valid for 10 mins",
        ToastAndroid.SHORT
      );
      navigation.navigate("OTP", { phone });
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        ToastAndroid.show(
          "Too many OTP requests. Please wait and try again later.",
          ToastAndroid.LONG
        );
      } else {
        ToastAndroid.show(
          "Something went wrong. Please try again later.",
          ToastAndroid.SHORT
        );
      }
    }
  };

  // Validate phone number (10 digits)
  const validatePhoneNumber = (number) => {
    if (number.length !== 10) {
      return "Phone number must be exactly 10 digits";
    }
    if (!/^[0-9]+$/.test(number)) {
      return "Phone number must contain only digits";
    }
    return "";
  };

  return (
    <ImageBackground
      source={require("../assets/images/LoginBackgroundImage.jpg")}
      style={styles.container}
    >
      {/* Radial Blur Image */}
      <View style={styles.blurWrapper}>
        <Image
          source={require("../assets/images/ellipse.png")}
          style={styles.gradientOverlay}
          resizeMode="contain"
        />
      </View>

      {/* Foreground Content */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Socojoy Awaits</Text>
        <Text style={styles.subtitle}>Let's Go</Text>

        {/* Input with fixed country code */}
        <View style={styles.inputRow}>
          <Text style={styles.countryCode}>+91</Text>
          <InputBox
            placeholder="Enter Phone Number"
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ""))}
          />
        </View>

        <PrimaryButton title="SEND OTP" onPress={handleSendOTP} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 40,
    textAlign: "center",
    color: "#510808",
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Inria Serif",
  },

  subtitle: {
    textAlign: "center",
    fontSize: 26,
    color: "#633333",
    marginBottom: 30,
  },

  blurWrapper: {
    position: "absolute",
    top: "10%",
    bottom: "10%",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 0,
  },

  gradientOverlay: {
    width: 600,
    height: 1000,
    opacity: 0.7,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  countryCode: {
    fontSize: 18,
    marginRight: 6,
    color: "#510808",
    fontWeight: "bold",
  },
});
