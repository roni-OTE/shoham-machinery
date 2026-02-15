import { View, StyleSheet } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSignInPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "שגיאה בהתחברות");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo/Title */}
        <View style={styles.header}>
          <Text variant="displaySmall" style={styles.title}>
            שמיר א.מ מילוט
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            מערכת ניהול קריאות שירות
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <TextInput
            label="אימייל"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            mode="outlined"
            style={styles.input}
            textAlign="right"
          />

          <TextInput
            label="סיסמה"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            mode="outlined"
            style={styles.input}
            textAlign="right"
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button
            mode="contained"
            onPress={onSignInPress}
            loading={loading}
            disabled={loading || !email || !password}
            style={styles.button}
          >
            התחבר
          </Button>
        </View>

        {/* Demo Credentials */}
        <View style={styles.demoInfo}>
          <Text variant="labelSmall" style={styles.demoText}>
            Demo: tech1@shamir.com / Demo1234!
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f9ff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  title: {
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
  },
  subtitle: {
    color: "#64748b",
    marginTop: 8,
    textAlign: "center",
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: "#ffffff",
  },
  button: {
    marginTop: 8,
  },
  error: {
    color: "#ef4444",
    textAlign: "center",
  },
  demoInfo: {
    marginTop: 24,
    alignItems: "center",
  },
  demoText: {
    color: "#64748b",
  },
});
