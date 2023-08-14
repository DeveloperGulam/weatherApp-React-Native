import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const NotFound = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
        <Image
          source={require('../assets/images/404.gif')}
          style={styles.image}
        />
        <Text style={styles.title}>Invalid City Name</Text>
        <Text style={styles.subtitle}>You have entered invalid city name. please enter correct name.</Text>
        <TouchableOpacity 
            style={styles.btn}
            onPress={()=>navigation.navigate('Home')}
        >
            <Text style={styles.btnText}>Go Back</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default NotFound

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
        alignItems: "center",
        justifyContent:"center",
        paddingHorizontal: 30,
    },
    image: { 
        width: 220, 
        height: 130, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: '#222'
    },
    subtitle: {
        fontSize: 14,
        color: '#777',
        textAlign: 'center',
    },
    btn:{
        marginTop: 20,
        paddingHorizontal: 22,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#197CC2',

    },
    btnText: {
        color: "#FFF",
        textTransform: "uppercase",
    }
})