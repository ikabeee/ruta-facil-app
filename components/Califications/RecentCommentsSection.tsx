import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CommentCard from './CommentCard';

interface Comment {
  id: string;
  rating: number;
  comment: string;
  timeAgo: string;
}

interface RecentCommentsSectionProps {
  comments: Comment[];
}

const RecentCommentsSection: React.FC<RecentCommentsSectionProps> = ({
  comments,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comentarios Recientes</Text>
      
      <View style={styles.commentsList}>
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
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
  commentsList: {
    gap: 12,
  },
});

export default RecentCommentsSection;