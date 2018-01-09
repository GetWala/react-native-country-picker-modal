import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import nodeEmoji from 'node-emoji';

const Emoji = (
  {
    name,
  },
) => {
  const emoji = nodeEmoji.get(name);
  return (<Text>{ emoji }</Text>);
};

Emoji.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Emoji;