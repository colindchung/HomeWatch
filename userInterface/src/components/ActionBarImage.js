import React, { Component } from 'react';
 
import { StyleSheet, View, Text, Image } from 'react-native';
 
export default class ActionBarImage extends Component {
  render() {
    return (
      <View style={{ flexDirection: 'row',
                      height: 60}}>
        <Image
          source={{
            uri:
              'https://scontent.fyyz1-2.fna.fbcdn.net/v/t1.15752-9/69986387_773621313071142_9184507002347323392_n.png?_nc_cat=107&_nc_oc=AQm1fmWldpKU3K5jN9i3L71X7qZ6eUsgGJgUEwMrjXqh62iqdMxBk1MnkGbXqFkmXZc&_nc_ht=scontent.fyyz1-2.fna&oh=bb07342f211500d65138c3ecebea898e&oe=5DFEC908'
          }}
          style={{
            width: 45,
            height: 45,
            // borderRadius: 40 / 2,
            marginLeft: 15,
            marginRight: 50,
            marginTop: 5
          }}
        />
      </View>
    );
  }
}