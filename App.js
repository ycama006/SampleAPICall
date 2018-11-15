import React, { Component } from 'react';

import { AppRegistry, StyleSheet, FlatList, Text, View, Alert, ActivityIndicator, Platform, Image} from 'react-native';


const API_TOKEN = 'Bearer OO7FLHIV47COEG23ENAK';
const SEARCH_URL = 'https://www.eventbriteapi.com/v3/events/search/';


export default class EventbriteAPI extends React.Component {

  constructor(props){

    super(props);

    this.state = {
    isLoading: true
    };
  }

  componentDidMount() {

      let FETCH_URL = `${SEARCH_URL}`;

       return fetch(FETCH_URL, {
         method: 'GET',
         headers: {
           'Authorization': API_TOKEN
         }

       })
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             dataSource: responseJson.events
           }, function() {
             // In this block you can do something with new state.
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }

FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  GetFlatListItem (name) {

  Alert.alert(name);

  }


  render() {

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (

<View style={styles.MainContainer}>

       <FlatList

          data={ this.state.dataSource }

          ItemSeparatorComponent = {this.FlatListItemSeparator}
          renderItem={({item}) => <Text style={styles.FlatListItemStyle} onPress={this.GetFlatListItem.bind(this, item.name.text)} > {item.name.text} </Text>}
          keyExtractor={(item, index) => index}
         />

</View>

    );
  }
}

const styles = StyleSheet.create({

MainContainer :{

justifyContent: 'center',
flex:1,
margin: 10,
paddingTop: (Platform.OS === 'ios') ? 20 : 0,

},

FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

});

//AppRegistry.registerComponent('Project', () => Project);
