import React from 'react';
import {View, 
        Text, 
        StyleSheet, 
        Button,
        Image
    } from 'react-native';


const Home = () => {
    return (
        <View style={styles.background}>
            <View style={styles.imageBorder}>
                <Image
                    style={styles.stream}
                    source={require('../../assets/tee.jpg')}
                />
            </View>
            <View style={styles.imageBorder}>
                <Image
                    style={styles.stream}
                    source={require('../../assets/tee2.jpeg')}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignSelf: 'center',
        backgroundColor: '#FFFFFF'
    },
    imageBorder: {
        maxWidth: 300,
        paddingTop: 70,
        backgroundColor: '#FFFFFF'
    },
    stream: {
        paddingTop: 60,
        width: 200,
        height: 200,
        alignSelf: 'center'
    }
});

export default Home;

