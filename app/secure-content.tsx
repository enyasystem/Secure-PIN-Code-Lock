"use client"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { Unlock, ArrowLeft } from "lucide-react"

export default function SecureContent() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Unlock size={60} color="#4CAF50" />
        <Text style={styles.title}>🔓 Welcome to Secure Content</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Authentication Successful</Text>
          <Text style={styles.cardText}>
            You have successfully authenticated and accessed the secure area of the application.
          </Text>
        </View>

        <View style={styles.securityInfoContainer}>
          <Text style={styles.securityInfoTitle}>Security Information</Text>
          <Text style={styles.securityInfoText}>• Your session is encrypted and secure</Text>
          <Text style={styles.securityInfoText}>• This area contains protected content</Text>
          <Text style={styles.securityInfoText}>• Your PIN is never stored in plain text</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={20} color="white" />
        <Text style={styles.backButtonText}>Return to Lock Screen</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "#333",
    textAlign: "center",
  },
  contentContainer: {
    width: "100%",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  securityInfoContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  securityInfoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  securityInfoText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
    lineHeight: 24,
  },
  backButton: {
    flexDirection: "row",
    backgroundColor: "#333",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 40,
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
})
