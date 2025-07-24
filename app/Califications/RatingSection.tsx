import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StarRating from './StarRating';

interface RatingSectionProps {
  rating: number;
  totalRatings: number;
}

const RatingSection: React.FC<RatingSectionProps> = ({
  rating,
  totalRatings,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Calificación</Text>
      
      <Text style={styles.ratingNumber}>{rating.toFixed(1)}</Text>
      
      <StarRating rating={rating} size={24} />
      
      <Text style={styles.subtitle}>
        Basado en {totalRatings} calificaciones
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 20,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  ratingNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFA726',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});

export default RatingSection;