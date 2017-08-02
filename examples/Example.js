/**
 * Sample React Native Country Picker Example App
 * https://github.com/xcarpentier/react-native-country-picker
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  PixelRatio,
  TouchableOpacity,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    marginBottom: 25,
  },
  instructions: {
    fontSize: 20,
    textAlign: 'center',
    color: '#888',
    marginBottom: 7
  },
  link: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888',
    textDecorationLine: 'underline'
  },
  data: {
    padding: 15,
    marginTop: 10,
    backgroundColor: '#ddd',
    borderColor: '#888',
    borderWidth: 1 / PixelRatio.get(),
    color: '#777'
  }
});

export default class Example extends Component {
  constructor(props){
    StatusBar.setHidden(true);
    super(props);
    this.state = {
      cca2: 'US',
      cca2Empty: null
    };
  }

  render() {
    return (
      <View>
        <Text style={styles.welcome}>
          Welcome to Country Picker!
        </Text>
        <View style={{height: 39}} />
        <View style={{height: 39}} />
        <CountryPicker
          ref={(countryPicker) => { this.countryPicker = countryPicker; }}
          onChange={(value)=> this.setState({country: value, cca2: value.cca2})}
          cca2={this.state.cca2}
          closeable
        />
        <View style={{height: 39}} />
        <View style={{height: 39}} />
        <CountryPicker
          ref={(countryPicker) => { this.countryPicker = countryPicker; }}
          onChange={(value)=> this.setState({country: value, cca2Empty: value.cca2})}
          cca2={this.state.cca2Empty}
          closeable
        />
        <View style={{height: 39}} />
        <View style={{height: 39}} />
        {this.state.country &&
          <Text style={styles.data}>
            {JSON.stringify(this.state.country, null, 2)}
          </Text>
        }
      </View>
    );
  }
}
