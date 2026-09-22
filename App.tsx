import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {

  const [location, setLocation] = useState({
    coords: {
      latitude: 60.200692,
      longitude: 24.934302,
    }
  });
  const [address, setAddress] = useState('');

  const handlePress = async () => {
    const results = await Location.geocodeAsync(address);

    if (results.length === 0) {
      Alert.alert('Address not found');
      return;
    }

    setLocation({
      coords: {
        latitude: results[0].latitude,
        longitude: results[0].longitude,
      }
    });
  }

  return (
    <View style={styles.container}>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ width: '100%', height: '100%' }}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
        />
      </MapView>

      <TextInput
        style={styles.input}
        placeholder="Give an address"
        onChangeText={text => setAddress(text)}
        value={address}
      />

      <View style={styles.button}>
        <Button title="Show" onPress={handlePress} />
      </View>

      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  input: {
    borderWidth: 1,
    width: '95%',
    height: 40,
    marginBottom: 10,
  },
  button: {
    marginBottom: 10,
    width: '95%',
  },
});