import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  View,
  Platform,
  Text
} from 'react-native';
import { getWidthPercent, getHeightPercent } from './ratio';

const styles = StyleSheet.create({
  closeButton: {
    height: 52,
    width: 52,
    maxWidth: 52
  },
  closeButtonImage: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
});

const CloseButton = (props) => (
  <View style={{backgroundColor: '#1dc4bd', elevation: 4, flexDirection: 'row'}}>
    <View style={[styles.closeButton, {flex: 1}]}>
      <TouchableNativeFeedback
        background={
        Platform.Version < 21 ?
        TouchableNativeFeedback.SelectableBackground()
        :
        TouchableNativeFeedback.SelectableBackgroundBorderless()
      }
        {...props}
      >
        <View style={{width: 52, height: 52, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('./android-white-close.png')}
            style={styles.closeButtonImage}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
    <View style={{flex: 1, justifyContent: 'center'}}><Text style={{color: 'white', fontSize: 16, fontFamily: 'proximanova_regular'}}>Select Your Country</Text></View>
  </View>
);

export default CloseButton;
