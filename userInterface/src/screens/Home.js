import React, {Component} from 'react';
import {View, 
        Text, 
        StyleSheet, 
        TouchableHighlight,
        Animated,
        Easing,
        Button,
        Image
    } from 'react-native';


export default class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "Colin"
        }   
    }

    render() {
        return (
            <View>
                <View>
                    <Text>Welcome, {this.state.username}!</Text>
                </View>
            </View>
        )
    }
    
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    navBar: {
        backgroundColor: '#d3d3d3',
        alignSelf: 'stretch',
        flexDirection: 'row-reverse'
    },
    navElement: {
        width: 150,
        height: 40,
        fontSize: 25,
        alignItems: 'flex-end',
        paddingTop: 10,
        paddingRight: 10,
        borderRightColor: '#000000'
    },
    imageBox: {
        alignSelf: 'center',
    },
    imageBorder: {
        paddingTop: 50,
        backgroundColor: '#FFFFFF'
    },
    stream: {
        paddingTop: 60,
        width: 200,
        height: 200,
        alignSelf: 'center'
    }
});



