import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StarRating from './StarRating';

interface Comment {
  id: string;
  rating: number;
  comment: string;
  timeAgo: string;
}

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const getBorderColor = (rating: number) => {
    if (rating >= 4.5) return '#4CAF50'; // Green for excellent
    if (rating >= 3.5) return '#FFA726'; // Orange for good
    return '#FF5252'; // Red for poor
  };

  return (
    <View style={[
      styles.container,
      { borderLeftColor: getBorderColor(comment.rating) }
    ]}>
      <View style={styles.header}>
        <StarRating rating={comment.rating} size={16} />
        <Text style={styles.timeAgo}>{comment.timeAgo}</Text>
      </View>
      
      <Text style={styles.commentText}>"{comment.comment}"</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeAgo: {
    fontSize: 12,
    color: '#666',
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    fontStyle: 'italic',
  },
});

export default CommentCard;