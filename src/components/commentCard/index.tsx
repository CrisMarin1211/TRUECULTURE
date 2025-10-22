import React from 'react';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Avatar from '@mui/material/Avatar';
import './style.css';

interface CommentCardProps {
  title: string;
  comment: string;
  userName: string;
  userAvatar: string;
  rating: number;
}

const CommentCard: React.FC<CommentCardProps> = ({
  title,
  comment,
  userName,
  userAvatar,
  rating,
}) => {
  return (
    <div className="comment-card">
      <div className="comment-card-header">
        <FormatQuoteIcon className="comment-icon" />
        <span className="comment-title">{title}</span>
      </div>

      <div className="comment-card-body">
        <p className="comment-text">{comment}</p>
        <Avatar src={userAvatar} alt={userName} className="comment-avatar" />
      </div>

      <div className="comment-card-footer">
        <span className="comment-user">{userName}</span>
        <div className="comment-rating">
          {[1, 2, 3, 4, 5].map((i) => (
            <FavoriteIcon key={i} className={`heart-icon ${i <= rating ? 'filled' : ''}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
