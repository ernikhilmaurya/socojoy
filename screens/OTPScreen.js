import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useRef, useState } from "react";
import OTPBox from "../components/OTPBox";
import PrimaryButton from "../components/PrimaryButton";
import { BlurView } from "expo-blur";
import axios from "axios";
import BASE_URL from "../constants/constants";
import RegistrationModal from "../components/RegistrationModal";

export default function OTPScreen({ route, navigation }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const { phone } = route.params;

  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const handleVerifyOTP = async () => {
    // setShowRegistrationModal(true);
    const otpString = otp.join("");

    if (otpString.length !== 6 || !/^\d{6}$/.test(otpString)) {
      ToastAndroid.show("Please enter a valid 6-digit OTP", ToastAndroid.SHORT);
      return;
    }

    try {
      console.log("Verifying OTP with data:", {
        phone_number: phone,
        otp: otpString,
      });
      const res = await axios.post(BASE_URL + "verify-otp", {
        phone_number: phone,
        otp: otpString,
      });
      console.log(res.data);
      ToastAndroid.show("OTP Verified Successfully!", ToastAndroid.SHORT);
      if (res.data.status === "success") {
        if (res.data.data?.login_token) {
          navigation.navigate("Feed");
        } else {
          setShowRegistrationModal(true);
        }
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        ToastAndroid.show(
          `Verification failed: ${error.response.status} ${
            error.response.data?.message || ""
          }`,
          ToastAndroid.LONG
        );
      } else {
        ToastAndroid.show(
          "Something went wrong. Please try again.",
          ToastAndroid.SHORT
        );
      }
    }
  };

  const handleOTPChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/LoginBackgroundImage.jpg")}
      style={styles.container}
    >
      <View style={StyleSheet.absoluteFill}>
        <BlurView intensity={50} tint="light" style={StyleSheet.absoluteFill} />
        <View style={styles.colorOverlay} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to {phone}
        </Text>

        <OTPBox value={otp} onChangeText={handleOTPChange} refs={inputs} />
        <PrimaryButton title="VERIFY & CONTINUE" onPress={handleVerifyOTP} />

        <TouchableOpacity>
          <Text style={styles.resend}>
            <Text>Didn’t receive the code? </Text>
            <Text style={{ fontWeight: "bold" }}>Resend OTP</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <RegistrationModal
        visible={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        onComplete={(data) => {
          console.log("Collected registration data:", data);
          setShowRegistrationModal(false);
          navigation.navigate("Feed");
        }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  colorOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(217, 195, 147, 0.35)",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 40,
    textAlign: "center",
    color: "#4B0B0C",
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#4B0B0C",
    marginBottom: 30,
  },

  resend: {
    textAlign: "center",
    marginTop: 20,
    color: "#4B0B0C",
  },
});
