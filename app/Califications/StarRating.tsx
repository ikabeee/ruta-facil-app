import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  color?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  size = 20,
  color = '#FFA726',
}) => {
  const renderStars = () => {
    const stars = [];
    
    for (let i = 1; i <= maxStars; i++) {
      let iconName: string;
      
      if (i <= Math.floor(rating)) {
        iconName = 'star';
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        iconName = 'star-half';
      } else {
        iconName = 'star-outline';
      }
      
      stars.push(
        <Ionicons
          key={i}
          name={iconName as any}
          size={size}
          color={color}
          style={styles.star}
        />
      );
    }
    
    return stars;
  };

  return <View style={styles.container}>{renderStars()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginHorizontal: 2,
  },
});

export default StarRating;