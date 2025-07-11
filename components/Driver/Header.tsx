import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TransMágico Conductor</Text>
      <View style={styles.statusContainer}>
        <View style={styles.dot} />
        <Text style={styles.statusText}>Inactivo</Text>
        <Switch value={false} onValueChange={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2563EB',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#60A5FA',
    marginRight: 4,
  },
  statusText: {
    color: '#fff',
    marginRight: 8,
  },
});
