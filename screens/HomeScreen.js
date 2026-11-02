
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Welcome to UniLib</Text>
        <Text style={styles.subText}>Smart University Library System</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.btn} 
          onPress={() => navigation.navigate('Catalog')}
        >
          <Text style={styles.btnText}>📚 Browse Book Catalog & Search</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btn} 
          onPress={() => navigation.navigate('Borrowed')}
        >
          <Text style={styles.btnText}>📖 My Borrowed / Reserved Books</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btn} 
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.btnText}>ℹ️ Library Info & Hours</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    padding: 20,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1e3d59',
  },
  subText: {
    fontSize: 16,
    color: '#576574',
    marginTop: 5,
  },
  buttonContainer: {
    gap: 15,
  },
  btn: {
    backgroundColor: '#17b978',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});