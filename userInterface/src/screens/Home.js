import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    FlatList
} from 'react-native';
import * as firebase from 'firebase';


export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {        
            licenseData: [],
            faceData: [],
        }
    }

    padding(top, bottom) {
        return {
            paddingTop: top,
            paddingBottom: bottom
        }
    }

    componentDidMount() {
        var faceData = firebase.database().ref().child('/people');
        faceData.on('value', snap => {
            var newFaces = [];
            for (var key in snap.val()) {
                var currFace = {};
                currFace.Person = snap.val()[key].person;
                currFace.Time = snap.val()[key].time;
                newFaces.unshift(currFace);
            }
            this.setState({faceData: newFaces});
        })
    }

    render() {
        return (
            <View style={styles.background}>
                <Text style={styles.subheader}>Vehicles</Text>
                <View>
                    <View style={styles.columnHead}>
                        <Text style={styles.text}>License Plate</Text>
                        <Text style={styles.timestampText}>Timestamp</Text>
                    </View>
                </View>
                <FlatList
                    style={styles.flatList}
                    data={this.state.licenseData}
                    renderItem={({ item }) => (
                        <View style={styles.flatListTable}>
                            <Text style={styles.text}>{item.Plate}</Text>
                            <Text style={styles.timestampText}>{item.Time}</Text>
                        </View>
                    )}
                />

                <Text style={styles.subheader}>Recognized People</Text>
                <View>
                    <View style={styles.columnHead}>
                        <Text style={styles.text}>ID</Text>
                        <Text style={styles.timestampText}>Timestamp</Text>
                    </View>
                </View>
                <FlatList
                    style={styles.flatList}
                    data={this.state.faceData}
                    renderItem={({ item }) => (
                        <View style={styles.flatListTable}>
                            <Text style={styles.text}>{item.Person}</Text>
                            <Text style={styles.timestampText}>{item.Time}</Text>
                        </View>
                    )}
                />

            </View>
        )
    }

};

const styles = StyleSheet.create({
    background: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        //justifyContent: 'center'
    },
    header: {
        fontSize: 25,
        fontWeight: '600',
        paddingBottom: 20,
        paddingTop: 20
    },
    subheader: {
        fontSize: 18,
        fontWeight: '400',
        paddingBottom: 10
    },
    columnHead: {
        backgroundColor: '#D3D3D3',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderWidth: 2,
        borderColor: '#000000',
        flexDirection: "row"
    },
    text: {
        padding: 5,
        textAlign: 'center',
        width: 120
    },
    timestampText: {
        padding: 5,
        textAlign: 'center',
        width: 180
    },
    flatList: {
        backgroundColor: '#D3D3D3',
        borderWidth: 2,
        borderTopWidth: 0,
        borderColor: '#000000',
        maxHeight: 170,
        marginBottom: 30,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    flatListTable: {
        flexDirection: 'row'
    },
    mainElement: {
        paddingBottom: 20,
        paddingTop: 20
    }
});



