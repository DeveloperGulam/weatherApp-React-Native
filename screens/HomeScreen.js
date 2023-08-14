import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { Feather } from 'react-native-vector-icons';
import { fetchForecastData, fetchWeatherData } from '../api/weather';
import weatherConditions from '../utils/weatherConditions';
import WeekData from '../components/WeekData';
import { styles } from '../styles';

const HomeScreen = ({ navigation }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchCity, setSearchCity] = useState('');
  const [userAddress, setUserAddress] = useState(null);

  const fetchData = async (city) => {
    setLoading(true);
    try {
      const data = await fetchWeatherData(city);
      const forecastResponse = await fetchForecastData(city);

      setWeatherData(data);
      setForecastData(forecastResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLocationAndFetchData = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const [address] = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        if (address && address.city) {
          const cityName = address.city === 'Prayagraj' ? 'Allahabad' : address.city;
          setUserAddress(address);
          fetchData(cityName);
        }
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const getAddressByCity = async (cityName) => {
    try {
      const [location] = await Location.geocodeAsync(cityName);
      if (location) {
        const address = await Location.reverseGeocodeAsync({
          latitude: location.latitude,
          longitude: location.longitude,
        });

        if (address && address[0]) {
          setUserAddress(address[0]);
        }
      } else {
        navigation.navigate('NotFound');
        console.log('City not found');
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const handleSearch = async () => {
    setShowSearch(false);

    if (searchCity) {
      setSearchCity('');
      fetchData(searchCity.trim());
      await getAddressByCity(searchCity.trim());
    }
  };

  const currentConditionText = weatherData?.weather[0]?.main || 'other';

  useEffect(() => {
    getLocationAndFetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Image
          source={require('../assets/gif/loader.gif')}
          style={styles.loader}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.address}>
            {userAddress?.city}, {userAddress?.region}
          </Text>
          <Text style={styles.date}>{weatherData?.currentDateTime}</Text>
        </View>
        {showSearch ? (
          <View style={styles.searchSection}>
            <TextInput
              value={searchCity}
              onChangeText={setSearchCity}
              placeholder="Search city"
              style={styles.input}
            />
            <TouchableOpacity style={styles.inputIconWrap} onPress={handleSearch}>
              <Feather style={{ color: "#333" }} name="search" size={20} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={{ backgroundColor: "#eee", padding: 10, borderRadius: 20 }}
            onPress={() => setShowSearch(!showSearch)}
          >
            <Feather style={{ color: "#333" }} name="search" size={20} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.topMain}>
        <Image
          source={weatherConditions[currentConditionText]?.image}
          style={styles.image}
        />
        <Text style={styles.temperature}>{weatherData?.main.temp}°</Text>
        <Text style={styles.description}>
          {/* {weatherData?.weather[0]?.main} */}
          {weatherConditions[currentConditionText]?.title}
        </Text>
      </View>
      <View style={styles.bottomMain}>
        <Text style={styles.title}>This Week</Text>
        <FlatList
          data={forecastData}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <WeekData item={item} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;