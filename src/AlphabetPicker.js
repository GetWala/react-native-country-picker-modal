import React, { Component, PropTypes } from 'react';
import { View, Text, PanResponder } from 'react-native';


class LetterPicker extends Component {
  render() {
    return (
      <Text style={{ fontSize: 11, fontWeight: 'bold' }}>
        {this.props.letter.key}
      </Text>
    );
  }
}

export default class AlphabetPicker extends Component {

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.props.onTouchStart && this.props.onTouchStart();

        this.tapTimeout = setTimeout(() => {
          this._onTouchLetter(this._findTouchedLetter(gestureState.y0));
        }, 100);
      },
      onPanResponderMove: (evt, gestureState) => {
        clearTimeout(this.tapTimeout);
        this._onTouchLetter(this._findTouchedLetter(gestureState.moveY));
      },
      onPanResponderTerminate: this._onPanResponderEnd.bind(this),
      onPanResponderRelease: this._onPanResponderEnd.bind(this),
    });
  }

  _onTouchLetter(letter) {
    letter && this.props.onTouchLetter && this.props.onTouchLetter(letter);
  }

  _onPanResponderEnd() {
    requestAnimationFrame(() => {
      this.props.onTouchEnd && this.props.onTouchEnd();
    });
  }

  _findTouchedLetter(y) {
    let top = y - (this.absContainerTop || 0);

    if (top >= 1 && top <= this.containerHeight) {
      return this.props.alphabet[Math.floor((top / this.containerHeight) * this.props.alphabet.length)]
    }
  }

  _onLayout(event) {
    this.alphabetContainer.measure((x1, y1, width, height, px, py) => {
      this.absContainerTop = py;
      this.containerHeight = height;
    });
  }

  render() {
    return (
      <View
        ref={alphabetContainer => this.alphabetContainer = alphabetContainer}
        {...this._panResponder.panHandlers}
        onLayout={this._onLayout.bind(this)}
        style={{ paddingHorizontal: 5, backgroundColor: '#fff', borderRadius: 1, justifyContent: 'center' }}>
        <View>
          {this.props.alphabet.map((letter) => <LetterPicker letter={letter} key={letter.key} />)}
        </View>
      </View>
    );
  }

}