import React from 'react';
import {TouchableHighlight, View, Text, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Color from '../constants/Colors';

const IconButton = props => {
return (
    <TouchableHighlight
  onPress={props.onPress} style={styles.btnClickContain}
    >
  <View
    style={styles.btnContainer}>
    <Ionicons
      name={props.iconName}
      size={25}
      color={Color.accent}
      style={styles.btnIcon}/>
    <Text style={styles.btnText}>{props.iconText}</Text>
  </View>
</TouchableHighlight>
);
};

const styles = StyleSheet.create({
    btnClickContain: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        backgroundColor: Color.accent,
        borderRadius: 5,
        padding: 5,
        marginTop: 5,
        marginBottom: 5,
      },
      btnContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        borderRadius: 10,
      },
      btnIcon: {
        height: 25,
        width: 25,
        color: Color.terciary,
      },
      btnText: {
        fontSize: 18,
        color: Color.terciary,
        marginLeft: 10,
        marginTop: 2,
      }
});

export default IconButton;
