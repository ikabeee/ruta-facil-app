import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface ReportButtonProps {
  onPress: () => void;
}

const ReportButton: React.FC<ReportButtonProps> = ({ onPress }) => (
  <TouchableOpacity className="bg-black rounded-lg px-4 py-2 self-end mb-4" onPress={onPress}>
    <Text className="text-white font-bold">+ Reportar</Text>
  </TouchableOpacity>
);

export default ReportButton;
