import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const ListScreen = () => {
    const friends = [
        { name: 'Friend #1', age: '10'},
        { name: 'Friend #2', age: '12'},
        { name: 'Friend #3', age: '14'},
        { name: 'Friend #4', age: '16'},
        { name: 'Friend #5', age: '20'},
        { name: 'Friend #6', age: '22'},
        { name: 'Friend #7', age: '25'},
        { name: 'Friend #8', age: '15'},
        { name: 'Friend #9', age: '17'},
    ];

    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            keyExtractor={friend => friend.name}
            data={friends}
            renderItem={({ item }) => {
                return <Text style={styles.textStyle}>{item.name} - Age {item.age}</Text>
            }} />
    );
};

const styles = StyleSheet.create({
    textStyle: {
        marginVertical: 50
    }
});

export default ListScreen;