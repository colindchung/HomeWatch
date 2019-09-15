import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet, Button } from 'react-native';
import * as firebase from 'firebase';
import { Input } from '../components/input'
import { LoginButton } from '../components/loginButton';
import 'firebase/firestore';

export default class App extends React.Component {
    state = {
        email: '',
        password: '',
        firebaseId: '',
        authenticating: false,
    }
    componentWillMount() {
        const firebaseConfig = {
            apiKey: 'AIzaSyAg--iZyoMT60j51cfQ9Xtng3OXkuSNlR0',
            authDomain: 'hackthenorth2019-138ac.firebaseapp.com',
            projectId: "hackthenorth2019-138ac",
            databaseURL: "https://hackthenorth2019-138ac.firebaseio.com/"
        }

        firebase.initializeApp(firebaseConfig);
    }

    async onPressSignIn(props) {
        database = firebase.firestore();
        // snapshot = firebase.firestore().collection('users').get().then((doc) => console.log(doc.data()));
        const {navigate} = props.navigation;
        this.setState({authenticating: true})
        try {
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email,this.state.password)
            .then(res => {
                this.setState({authenticating: false})
                firebase
                .firestore()
                .collection('users')
                .doc(res.user.uid)
                .set(
                    {email: this.state.email,});
                navigate('HomePage')
            });
        } catch(error) {
            console.log(error.toString(error));
        }
    }

    onPressSignUp(props) {
        const {navigate} = props.navigation;
        navigate('RegisterPage');
    }
    renderCurrentState(props) {
        if (this.state.authenticating) {
            return (
                <View style = {styles.form}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }

        return (
            <View style = {styles.form}>
                <Text style={styles.header}>Log In</Text>
                <Input
                    placeholder='Enter your email...'
                    label='Email'
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <Input
                    placeholder='Enter your password...'
                    label='Password'
                    secureTextEntry
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <LoginButton onPress={() => this.onPressSignIn(props)}>Log In</LoginButton>
                <LoginButton onPress={() => this.onPressSignUp(props)}>Sign Up</LoginButton>
            </View>
        );
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderCurrentState(this.props)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    form: {
        flex: 1,
        alignItems: 'center'
    },
    header: {
        fontSize: 25,
        fontWeight: '600',
        paddingBottom: 20
    }
})

