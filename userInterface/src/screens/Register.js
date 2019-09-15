import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,

} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Button from 'react-native-really-awesome-button';


export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            phone: ''
        }
    }

    onType(fieldName, fieldValue) {
        this.setState({
            [fieldName]: fieldValue
        })
    }

    onSubmit() {
        const { navigate } = this.props.navigation;
        try {
            console.log('here');
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(res => {
                    console.log('firebase');
                    firebase
                        .firestore()
                        .collection('users')
                        .doc(res.user.uid)
                        .set(
                            { email: this.state.email,
                            FirstName: this.state.firstName,
                            LastName: this.state.lastName,
                            phone: this.state.phone,
                         });
                });
        }
        catch (error) {
            console.log('error');
        }
    }

    getTextInputStyle(wid, mgn_right, mgn_left) {
        return {
            backgroundColor: '#D3D3D3',
            color: '#000000',
            width: wid,
            height: 50,
            padding: 10,
            marginBottom: 10,
            marginTop: 10,
            marginLeft: mgn_left,
            marginRight: mgn_right,
            fontSize: 20,
            fontWeight: '400',
            borderRadius: 10,
        }
    }

    print(){
        console.log('Hello World!');
    }
    render() {
        return (
            <View style={styles.background}>
                <Text style={styles.header}>Please Enter Credentials</Text>
                <View style={styles.rowAlign}>
                    <TextInput
                        style={this.getTextInputStyle(140, 10, 0)}
                        placeholder='First Name'
                        onChangeText={value => this.onType('firstName', value)}
                    />
                    <TextInput
                        style={this.getTextInputStyle(140, 0, 10)}
                        placeholder='Last Name'
                        onChangeText={value => this.onType('lastName', value)}
                    />
                </View>
                <TextInput
                    style={this.getTextInputStyle(300, 0, 0)}
                    placeholder='Email Address'
                    onChangeText={value => this.onType('email', value)}
                />
                <TextInput
                    style={this.getTextInputStyle(300, 0, 0)}
                    placeholder='Password'
                    onChangeText={value => this.onType('password', value)}
                />
                <TextInput
                    style={this.getTextInputStyle(300, 0, 0)}
                    placeholder='Phone Number'
                    onChangeText={value => this.onType('phone', value)}
                />
                <AwesomeButton type="primary"
                    onPress={() => {
                        const { navigate } = this.props.navigation;
                        try {
                            console.log('here');
                            firebase
                                .auth()
                                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                                .then(res => {
                                    console.log('firebase');
                                    firebase
                                        .firestore()
                                        .collection('users')
                                        .doc(res.user.uid)
                                        .set(
                                            { email: this.state.email,
                                            FirstName: this.state.firstName,
                                            LastName: this.state.lastName,
                                            phone: this.state.phone,
                                         });

                                         navigate('HomePage')
                                });
                        }
                        catch (error) {
                            console.log('error');
                        }
                    }}
                >Sign Up!</AwesomeButton>
            </View>
        )
    }

};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowAlign: {
        flexDirection: 'row'
    },
    header: {
        fontSize: 25,
        fontWeight: '600',
        paddingBottom: 20
    }
});



