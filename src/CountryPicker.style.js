import { StyleSheet, PixelRatio } from 'react-native';
import { getWidthPercent, getHeightPercent } from './ratio';

export default StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  contentContainer: {
    width: getWidthPercent(100),
    backgroundColor: 'white',
  },
  touchFlag: {

  },
  imgStyle: {
    resizeMode: 'contain',
    width: 25,
    height: 19,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#eee',
    opacity: 0.8,
  },
  emojiFlag: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    width: 30,
    height: 30,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: 'transparent',
  },
  selectorControl: {
    flexDirection: 'row',
    height: 65,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 13,
    position: 'relative',
  },
  selectorCountryFlag: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 65,
    width: 65,
  },
  selectorCountryFlagImage: {
    resizeMode: 'contain',
    width: 39,
    height: 30,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#f3f4f5',
  },
  selectorEmptyFlag: {
    width: 39,
    height: 30,
    marginRight: 13,
    marginLeft: 13,
    borderWidth: 2,
    borderColor: '#1dc4bd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  selectorCountryName: {
    justifyContent: 'center',
    width: getWidthPercent(100),
    height: 39,
    borderBottomWidth: 1,
    borderColor: '#f3f4f5',
  },
  selectorCountryNameText: {
    fontSize: 16,
    color: '#4D5B67',
    fontFamily: 'proximanova_semibold',
  },
  selectorArrow: {
    position: 'absolute',
    right: 13,
    top: 23,
  },
  itemCountry: {
    flexDirection: 'row',
    height: 52,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#f3f4f5',
  },
  itemCountryFlag: {
    justifyContent: 'center',
    alignItems: 'center',
    height: getHeightPercent(7),
    width: getWidthPercent(15),
  },
  itemCountryName: {
    justifyContent: 'center',
    width: getWidthPercent(70),
    height: getHeightPercent(7),
  },
  countryName: {
    fontSize: 16,
    color: '#919BA0',
    fontFamily: 'proximanova_regular',
  },
  letters: {
    position: 'absolute',
    height: getHeightPercent(100),
    top: 13,
    bottom: 0,
    right: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letter: {
    height: getHeightPercent(3.3),
    width: getWidthPercent(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterText: {
    textAlign: 'center',
    fontSize: getHeightPercent(2.2),
    fontFamily: 'proximanova_regular',
  },
  phoneSelector: {
    height: 39,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  phoneSelectorFlag: {
    marginRight: 13,
  },
  phoneSelectorText: {
    paddingRight: 13,
  },
  phoneSelectorArrow: {
    paddingRight: 13,
  },
  AUI_fullWidth: {
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#B2B9BE',
    alignItems: 'center'
  },
  AUI_emptyLabel: {
    fontSize: 16,
    color: '#B2B9BE',
    fontFamily: 'proximanova_semibold',
    flex: 1,
    height: 26,
    paddingTop: 4,
    marginTop: 8,
    marginBottom: 12,
    alignItems: 'center'
  },
  AUI_globe: {
    width: 26,
    height: 26,
    position: 'absolute',
    top: 8,
    right: 0
  },
  AUI_label: {
    fontSize: 16,
    color: '#011627',
    fontFamily: 'proximanova_semibold',
    flex: 1,
    height: 26,
    paddingTop: 4,
    marginTop: 8,
    marginBottom: 12,
    alignItems: 'center'
  },
  AUI_countryFlagImage: {
    resizeMode: 'contain',
    width: 39,
    height: 26,
    marginRight: 13
  }
});
