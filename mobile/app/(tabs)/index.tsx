import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import { Text, Card, Chip, FAB } from "react-native-paper";
import { useRouter } from "expo-router";
import { useState } from "react";

// TODO: Replace with real data from API
const MOCK_CALLS = [
  {
    id: "1",
    callNumber: "SC-2024-001",
    date: "2024-02-15",
    customer: "מלון דן תל אביב",
    site: "קומה 1 - מסעדה",
    status: "completed",
  },
  {
    id: "2",
    callNumber: "SC-2024-002",
    date: "2024-02-15",
    customer: "בית חולים איכילוב",
    site: "מטבח מרכזי",
    status: "in_progress",
  },
  {
    id: "3",
    callNumber: "SC-2024-003",
    date: "2024-02-15",
    customer: "קניון עזריאלי",
    site: "קומת קרקע",
    status: "pending",
  },
];

const statusConfig = {
  pending: { label: "ממתין", color: "#f59e0b" },
  in_progress: { label: "בטיפול", color: "#2563eb" },
  completed: { label: "הושלם", color: "#10b981" },
};

export default function ServiceCallsScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // TODO: Fetch latest data
    setTimeout(() => setRefreshing(false), 1000);
  };

  const renderCall = ({ item }: { item: typeof MOCK_CALLS[0] }) => {
    const status = statusConfig[item.status as keyof typeof statusConfig];
    return (
      <Card
        style={styles.card}
        onPress={() => router.push(`/call/${item.id}`)}
      >
        <Card.Content>
          <View style={styles.cardHeader}>
            <View>
              <Text variant="labelSmall" style={styles.callNumber}>
                {item.callNumber}
              </Text>
              <Text variant="bodyLarge" style={styles.customer}>
                {item.customer}
              </Text>
              <Text variant="bodySmall" style={styles.site}>
                {item.site}
              </Text>
            </View>
            <Chip
              textStyle={{ color: "#fff", fontSize: 12 }}
              style={{ backgroundColor: status.color }}
            >
              {status.label}
            </Chip>
          </View>
          <Text variant="bodySmall" style={styles.date}>
            📅 {item.date}
          </Text>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_CALLS}
        renderItem={renderCall}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text>אין קריאות שירות זמינות</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  list: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  callNumber: {
    color: "#64748b",
  },
  customer: {
    fontWeight: "600",
    marginTop: 4,
  },
  site: {
    color: "#64748b",
    marginTop: 2,
  },
  date: {
    color: "#64748b",
    marginTop: 8,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },
});
