import React, { Component } from 'react';
 
import { StyleSheet, View, Text, Image } from 'react-native';
 
export default class ActionBarImage extends Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{
            uri:
              'https://scontent.fyyz1-2.fna.fbcdn.net/v/t1.15752-9/70994003_376833749675960_1426452836224335872_n.png?_nc_cat=107&_nc_oc=AQnDWXMSd-VYU6c-zH9ltlYCHVbqV0fFkqURu0bR5CFFQKU1YTG6jX59dksth1qgA7o&_nc_ht=scontent.fyyz1-2.fna&oh=05463132a0f850dcd2876d623a7302e1&oe=5DF34982',
          }}
          style={{
            width: 101,
            height: 40,
            // borderRadius: 40 / 2,
            marginLeft: 15,
            marginRight: 50,
          }}
        />
      </View>
    );
  }
}