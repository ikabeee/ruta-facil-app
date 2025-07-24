import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NavigationBarProps {
  activeTab?: string;
  onTabPress?: (tab: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ 
  activeTab = 'incidents',
  onTabPress 
}) => {
  const tabs = [
    { id: 'menu', icon: 'menu-outline' },
    { id: 'incidents', icon: 'warning-outline' },
    { id: 'navigation', icon: 'navigate-outline' },
    { id: 'favorites', icon: 'star-outline' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tab,
            activeTab === tab.id && styles.activeTab
          ]}
          onPress={() => onTabPress?.(tab.id)}
        >
          <Ionicons 
            name={tab.icon as any} 
            size={24} 
            color={activeTab === tab.id ? '#4A90E2' : '#666'} 
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4A90E2',
  },
});

export default NavigationBar;