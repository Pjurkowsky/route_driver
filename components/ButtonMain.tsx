import { Colors } from '@/constants/Colors';
import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

type props = {
    onPress: () => void,
    title?: string,
}

export default function ButtonMain({onPress, title} : props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 16,
    backgroundColor: Colors.Primary
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
