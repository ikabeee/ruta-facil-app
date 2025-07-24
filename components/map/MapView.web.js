// Este archivo proporciona una implementación web compatible para react-native-maps
// No hace nada en realidad, solo proporciona componentes que no causarán error al importarse

import React from 'react';
import { View, Text } from 'react-native';

// Componente MapView para web
export const MapView = ({ style, children, ...props }) => {
  return (
    <View style={style}>
      <Text style={{ textAlign: 'center', marginTop: 20 }}>
        Mapa no disponible en versión web
      </Text>
      {children}
    </View>
  );
};

// Componente Marker para web
export const Marker = (props) => {
  // No renderiza nada en web
  return null;
};

export default MapView;
