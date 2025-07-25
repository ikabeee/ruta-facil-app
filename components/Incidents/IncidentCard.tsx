import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Incident {
  id: string;
  type: string;
  status: string;
  location: string;
  reportedBy: string;
  timeAgo: string;
  icon: string;
  statusColor: string;
}

interface IncidentCardProps {
  incident: Incident;
  onPress?: () => void;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <MaterialIcons 
            name={incident.icon as any} 
            size={20} 
            color={incident.statusColor} 
          />
          <Text style={styles.type}>{incident.type}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: incident.statusColor }]}>
          <Text style={styles.statusText}>{incident.status}</Text>
        </View>
      </View>
      
      <Text style={styles.location}>{incident.location}</Text>
      <Text style={styles.reportInfo}>
        Reportado hace {incident.timeAgo} por {incident.reportedBy}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  type: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  reportInfo: {
    fontSize: 12,
    color: '#999',
  },
});

export default IncidentCard;