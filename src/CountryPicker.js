import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Modal, Text, ListView, Platform } from 'react-native';
import _ from 'lodash';

import cca2List from '../data/cca2';
import { getHeightPercent } from './ratio';
import CloseButton from './CloseButton';
import styles from './CountryPicker.style';
import SearchBar from 'react-native-searchbar'
let countries = null;
let Emoji = null;
let currentText = null;

// Maybe someday android get all flags emoji
// but for now just ios
// const isEmojiable = Platform.OS === 'ios' ||
// (Platform.OS === 'android' && Platform.Version >= 21);
const isEmojiable = Platform.OS === 'ios';

if (isEmojiable) {
  countries = require('../data/countries-emoji');
  Emoji = require('react-native-emoji').default;
} else {
  countries = require('../data/countries');

  Emoji = <View />;
}

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class CountryPicker extends Component {
  static propTypes = {
    cca2: React.PropTypes.string.isRequired,
    phoneSelector: React.PropTypes.bool,
    showLetters: React.PropTypes.bool,
    translation: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    closeable: React.PropTypes.bool,
    children: React.PropTypes.node,
    requiredCountries: React.PropTypes.array,
    searchable: React.PropTypes.bool,
  }
  static defaultProps = {
    translation: 'eng',
  }

  state = {
    modalVisible: false,
    cca2List,
    dataSource: ds.cloneWithRows(cca2List),
    loading: false,
  };

  componentWillMount() {
    this.updateStateWithCountries(this.props.requiredCountries);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.requiredCountries && this.props.requiredCountries && nextProps.requiredCountries.length !== this.props.requiredCountries.length) {
      this.updateStateWithCountries(nextProps.requiredCountries);
      if (this.props.searchable && this.searchBar) {
        this.searchBar.show();
      }
    }
  }

  onSelectCountry(cca2) {
    this.setState({
      modalVisible: false,
    });

    this.props.onChange({
      cca2,
      ...countries[cca2],
      flag: undefined,
      name: this.getCountryName(countries[cca2]),
    });
  }

  getCountryName(country, optionalTranslation) {
    const translation = optionalTranslation || this.props.translation || 'eng';
    return country.name[translation] || country.name.common;
  }

  setVisibleListHeight(offset) {
    this.visibleListHeight = getHeightPercent(100) - offset;
  }

  openModal = this.openModal.bind(this);
  letters = _
    .range('A'.charCodeAt(0), 'Z'.charCodeAt(0) + 1)
    .map(n => String.fromCharCode(n).substr(0));

  // dimensions of country list and window
  itemHeight = 52;//getHeightPercent(7);
  listHeight = countries.length * this.itemHeight;

  openModal() {
    this.setState({ modalVisible: true });
  }

  scrollTo(letter) {
    // find position of first country that starts with letter
    const index = this.state.cca2List.map((country) => countries[country].name.common[0])
      .indexOf(letter);
    if (index === -1) {
      return;
    }
    let position = index * this.itemHeight;

    // do not scroll past the end of the list
    if (position + this.visibleListHeight > this.listHeight) {
      position = this.listHeight - this.visibleListHeight;
    }

    // scroll
    this._listView.scrollTo({
      y: position,
    });
  }

  renderCountry(country, index) {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => this.onSelectCountry(country)}
        activeOpacity={0.99}
      >
        {this.renderCountryDetail(country)}
      </TouchableOpacity>
    );
  }

  renderLetters(letter, index) {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => this.scrollTo(letter)}
        activeOpacity={0.6}
      >
        <View style={styles.letter}>
          <Text style={styles.letterText}>{letter}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderCountryDetail(cca2) {
    const country = countries[cca2];
    return (
      <View style={styles.itemCountry}>
        {CountryPicker.renderFlag(cca2)}
        <View style={styles.itemCountryName}>
          <Text style={styles.countryName}>
            {this.getCountryName(country)}
          </Text>
        </View>
      </View>
    );
  }

  static renderEmojiFlag(cca2, emojiStyle) {
    return (
      <Text style={[styles.emojiFlag, emojiStyle]}>
        <Emoji name={countries[cca2].flag} />
      </Text>
    );
  }

  static renderImageFlag(cca2, imageStyle) {
    return (
      <Image
        style={[styles.imgStyle, imageStyle]}
        source={{ uri: countries[cca2].flag }}
      />
    );
  }

  static renderFlag(cca2, itemStyle, emojiStyle, imageStyle) {
    return (
      <View style={[styles.itemCountryFlag, itemStyle]}>
        {isEmojiable ? CountryPicker.renderEmojiFlag(cca2, emojiStyle) : CountryPicker.renderImageFlag(cca2, imageStyle)}
      </View>
    );
  }

  static renderSelector(cca2, optionalTransalation) {
    const transalation = optionalTransalation || CountryPicker.translation || 'eng';
    const country_name = countries[cca2].name[transalation] || countries[cca2].name.common;
    return (
      <View style={styles.selectorControl}>
        {CountryPicker.renderFlag(cca2, styles.selectorCountryFlag, '', styles.selectorCountryFlagImage)}
        <View style={styles.selectorCountryName}>
          <Text style={styles.selectorCountryNameText}>
            {country_name}
          </Text>
        </View>
        <Image source={require('./dropdownArrow.png')} style={styles.selectorArrow} />
      </View>
    );
  }

  static renderPhoneSelector(cca2, optionalTransalation) {
    const countryCode = countries[cca2].callingCode;
    return (
      <View style={styles.phoneSelector}>
        <View style={styles.phoneSelectorFlag}>
          {CountryPicker.renderImageFlag(cca2)}
        </View>
        <View style={styles.phoneSelectorText}>
          <Text style={styles.selectorCountryNameText}>{`+ ${countryCode}`}</Text>
        </View>
      </View>
    );
  }

  convertCountriesToArray() {
    const countriesFlat = [];
    _.mapKeys(countries, (value, key) => {
      const country = {};
      country.cca2 = key;
      country.name = value.name;
      country.currency = value.currency;
      country.callingCode = value.callingCode;
      countriesFlat.push(country);
    });
    return countriesFlat;
  }

  updateCountriesOnSearch = _.debounce((searchResults) => {
    currentText = this.searchBar.getValue();
    if (!currentText) {
      this.updateStateWithCountries();
      return;
    }
    let items = _.map(searchResults, 'cca2');
    items = _.compact(items);
    if (items) {
      this.updateStateWithCountries(items);
    }
  }, 200, { leading: true, trailing: false });

  getHeightForLetters() {
    if (this.props.searchable) {
      return getHeightPercent(125);
    }
    return getHeightPercent(100);
  }

  updateStateWithCountries(requiredCountries) {
    this.setState({ loading: true });
    if (requiredCountries && requiredCountries.length !== 0) {
      let items = requiredCountries;
      if (items) {
        items = _.sortBy(items, (cca2) => countries[cca2].name.common);
        this.setState({
          dataSource: ds.cloneWithRows(items),
        }, () => this.setState({ loading: false }));
      }
    } else {
      this.setState({ dataSource: ds.cloneWithRows(cca2List) }, () => this.setState({ loading: false }));
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.setState({ modalVisible: true })}
          activeOpacity={0.7}
        >
          {
            this.props.children ?
              this.props.children
              :
              (<View style={styles.touchFlag}>
                {this.props.phoneSelector ? CountryPicker.renderPhoneSelector(this.props.cca2) : CountryPicker.renderSelector(this.props.cca2)}
              </View>)
          }
        </TouchableOpacity>
        <Modal
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <View style={styles.modalContainer}>
            {
              this.props.closeable &&
              <CloseButton onPress={() => this.setState({ modalVisible: false })} />
            }
            {this.props.searchable &&
              <View style={{ height: getHeightPercent(10) }}>
                <SearchBar
                  ref={(ref) => this.searchBar = ref}
                  data={this.convertCountriesToArray()}
                  hideBack
                  clearOnShow
                  handleResults={(results) => {
                    this.updateCountriesOnSearch(results);
                  }}
                  showOnLoad
                />
              </View>
            }
            {this.state.loading ?
              null :
              <ListView
                contentContainerStyle={styles.contentContainer}
                ref={listView => this._listView = listView}
                dataSource={this.state.dataSource}
                renderRow={country => this.renderCountry(country)}
                pageSize={countries.length - 30}
                onLayout={
                  ({ nativeEvent: { layout: { y: offset } } }) => this.setVisibleListHeight(offset)}
              />
            }
            {
              this.props.showLetters &&
              <View style={[styles.letters, { height: this.getHeightForLetters() }]}>
                {this.letters.map((letter, index) => this.renderLetters(letter, index))}
              </View>
            }
          </View>
        </Modal>
      </View>
    );
  }
}
