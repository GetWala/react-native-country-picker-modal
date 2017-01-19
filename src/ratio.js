import React from 'react-native';

const { height, width } = React.Dimensions.get('window');

// Remove the status bar height since the modal view does not cover this area
const ANDROID_MINUS_HEIGHT = 24;
const getHeight = () => (React.Platform.OS === 'android' ? height - ANDROID_MINUS_HEIGHT : height);
export const getWidthPercent = (percentage) => (width * percentage) / 100;
export const getHeightPercent = (percentage) => (getHeight() * percentage) / 100;
export const getPercent = (percentage) => (((getHeight() + width) / 2) * percentage) / 100;
