"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native"
import { useRouter } from "expo-router"
import { Lock, Delete } from "lucide-react"

export default function PinCodeLock() {
  const router = useRouter()
  const [pin, setPin] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [attempts, setAttempts] = useState<number>(0)
  const [isLocked, setIsLocked] = useState<boolean>(false)
  const [lockTimer, setLockTimer] = useState<number>(0)
  const [shakeAnimation] = useState(new Animated.Value(0))

  const CORRECT_PIN = "1234"
  const MAX_ATTEMPTS = 3
  const LOCK_TIME = 30 // seconds

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isLocked && lockTimer > 0) {
      interval = setInterval(() => {
        setLockTimer((prev) => prev - 1)
      }, 1000)
    } else if (lockTimer === 0 && isLocked) {
      setIsLocked(false)
      setAttempts(0)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isLocked, lockTimer])

  const handleNumberPress = (num: string) => {
    if (isLocked) return

    if (pin.length < 4) {
      setPin((prevPin) => prevPin + num)
      setError("")
    }
  }

  const handleDelete = () => {
    if (isLocked) return
    setPin((prevPin) => prevPin.slice(0, -1))
    setError("")
  }

  const handleClear = () => {
    if (isLocked) return
    setPin("")
    setError("")
  }

  const shakeError = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start()
  }

  useEffect(() => {
    if (pin.length === 4) {
      if (pin === CORRECT_PIN) {
        // Success
        setError("")
        setAttempts(0)
        setTimeout(() => {
          router.push("/secure-content")
        }, 500)
      } else {
        // Failure
        const newAttempts = attempts + 1
        setAttempts(newAttempts)

        if (newAttempts >= MAX_ATTEMPTS) {
          setIsLocked(true)
          setLockTimer(LOCK_TIME)
          setError(`Too many attempts. Locked for ${LOCK_TIME} seconds.`)
        } else {
          setError(`Incorrect PIN. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`)
          shakeError()
        }
        setPin("")
      }
    }
  }, [pin])

  const renderPinDots = () => {
    const dots = []
    for (let i = 0; i < 4; i++) {
      dots.push(<View key={i} style={[styles.pinDot, i < pin.length ? styles.pinDotFilled : {}]} />)
    }
    return dots
  }

  const renderKeypad = () => {
    const numbers = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
      ["clear", "0", "delete"],
    ]

    return numbers.map((row, rowIndex) => (
      <View key={`row-${rowIndex}`} style={styles.keypadRow}>
        {row.map((num) => {
          if (num === "delete") {
            return (
              <TouchableOpacity
                key={`key-${num}`}
                style={styles.keypadButton}
                onPress={handleDelete}
                disabled={isLocked}
              >
                <Delete size={24} color="#333" />
              </TouchableOpacity>
            )
          } else if (num === "clear") {
            return (
              <TouchableOpacity
                key={`key-${num}`}
                style={styles.keypadButton}
                onPress={handleClear}
                disabled={isLocked}
              >
                <Text style={styles.clearButtonText}>C</Text>
              </TouchableOpacity>
            )
          } else {
            return (
              <TouchableOpacity
                key={`key-${num}`}
                style={styles.keypadButton}
                onPress={() => handleNumberPress(num)}
                disabled={isLocked}
              >
                <Text style={styles.keypadButtonText}>{num}</Text>
              </TouchableOpacity>
            )
          }
        })}
      </View>
    ))
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Lock size={40} color="#333" />
        <Text style={styles.title}>Secure PIN Lock</Text>
        <Text style={styles.subtitle}>Enter your 4-digit PIN</Text>
      </View>

      <Animated.View style={[styles.pinContainer, { transform: [{ translateX: shakeAnimation }] }]}>
        {renderPinDots()}
      </Animated.View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.instructionText}>
            {isLocked ? `Locked for ${lockTimer} seconds` : "Use keypad to enter PIN"}
          </Text>
        </View>
      )}

      <View style={styles.keypadContainer}>{renderKeypad()}</View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Default PIN: 1234 (for demo purposes only)</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 16,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
  pinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  pinDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  pinDotFilled: {
    backgroundColor: "#333",
    borderColor: "#333",
  },
  errorContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  errorText: {
    color: "#e53935",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  instructionText: {
    color: "#666",
    fontSize: 16,
  },
  keypadContainer: {
    width: "100%",
    maxWidth: 300,
  },
  keypadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  keypadButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  keypadButtonText: {
    fontSize: 28,
    fontWeight: "500",
    color: "#333",
  },
  clearButtonText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#e53935",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#999",
    fontSize: 12,
  },
})
