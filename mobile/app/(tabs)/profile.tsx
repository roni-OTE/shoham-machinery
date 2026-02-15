import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Button, List, Divider } from "react-native-paper";
import { useUser, useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)/login");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text variant="displayMedium">👤</Text>
        </View>
        <Text variant="headlineSmall" style={styles.name}>
          {user?.firstName || "טכנאי"}
        </Text>
        <Text variant="bodyMedium" style={styles.email}>
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>

      <View style={styles.section}>
        <List.Section>
          <List.Subheader>הגדרות</List.Subheader>
          <List.Item
            title="פרטים אישיים"
            left={(props) => <List.Icon {...props} icon="account-edit" />}
            onPress={() => {}}
          />
          <Divider />
          <List.Item
            title="סנכרון נתונים"
            description="סנכרון אחרון: היום 12:30"
            left={(props) => <List.Icon {...props} icon="sync" />}
            onPress={() => {}}
          />
          <Divider />
          <List.Item
            title="עזרה ותמיכה"
            left={(props) => <List.Icon {...props} icon="help-circle" />}
            onPress={() => {}}
          />
        </List.Section>
      </View>

      <View style={styles.section}>
        <Button
          mode="outlined"
          onPress={handleSignOut}
          style={styles.signOutButton}
          textColor="#ef4444"
        >
          התנתק
        </Button>
      </View>

      <View style={styles.footer}>
        <Text variant="bodySmall" style={styles.version}>
          גרסה 0.1.0 (MVP)
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e0e7ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  name: {
    fontWeight: "600",
  },
  email: {
    color: "#64748b",
    marginTop: 4,
  },
  section: {
    marginTop: 16,
    backgroundColor: "#fff",
  },
  signOutButton: {
    margin: 16,
    borderColor: "#ef4444",
  },
  footer: {
    alignItems: "center",
    padding: 24,
  },
  version: {
    color: "#64748b",
  },
});
