import React from 'react';
import { Text, View } from 'react-native';
import IncidentTypeButton from '../../../app/Incidents/IncidentTypeButton';

interface ReportIncidentSectionProps {
  onTypeSelect: (type: string) => void;
}

const types = [
  { label: 'Tráfico', icon: 'car' },
  { label: 'Accidente', icon: 'car-crash' },
  { label: 'Obra', icon: 'road-variant' },
  { label: 'Otro', icon: 'comment-question' },
];

const ReportIncidentSection: React.FC<ReportIncidentSectionProps> = ({ onTypeSelect }) => (
  <View className="bg-white rounded-xl p-4 mt-4">
    <Text className="font-bold text-lg mb-2">Reportar Incidencia</Text>
    <View className="flex-row flex-wrap">
      {types.map((type) => (
        <IncidentTypeButton
          key={type.label}
          label={type.label}
          icon={type.icon}
          onPress={() => onTypeSelect(type.label)}
        />
      ))}
    </View>
  </View>
);

export default ReportIncidentSection;



