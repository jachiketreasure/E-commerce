import { useState, useEffect } from 'react';
import axios from 'axios';
import './CommentModal.css';

const API_BASE_URL = 'http://localhost:8000/api';

const CommentModal = ({ isOpen, onClose, productId, productTitle }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Load comments from API when modal opens
    useEffect(() => {
        if (isOpen && productId) {
            loadComments();
        }
    }, [isOpen, productId]);

    // Load comments for this product from API
    const loadComments = async () => {
        try {
            setError('');
            const response = await axios.get(`${API_BASE_URL}/comments/${productId}`);
            
            if (response.data.success) {
                setComments(response.data.comments);
            } else {
                setError('Failed to load comments');
                setComments([]);
            }
        } catch (error) {
            console.error('Error loading comments:', error);
            // Fallback to localStorage if API is not available
            try {
                const storedComments = localStorage.getItem(`comments_${productId}`);
                if (storedComments) {
                    setComments(JSON.parse(storedComments));
                    setError('Using offline comments (API unavailable)');
                } else {
                    setComments([]);
                    setError('Failed to load comments. Please check your connection.');
                }
            } catch (localError) {
                console.error('Error loading from localStorage:', localError);
                setComments([]);
                setError('Failed to load comments. Please check your connection.');
            }
        }
    };

    // Add new comment
    const handleAddComment = async (e) => {
        e.preventDefault();
        
        if (!newComment.trim() || !userName.trim()) {
            setError('Please fill in both name and comment fields.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${API_BASE_URL}/comments`, {
                productId: productId,
                userName: userName.trim(),
                comment: newComment.trim()
            });

            if (response.data.success) {
                // Add the new comment to the list
                const newCommentData = {
                    _id: response.data.comment.id,
                    userName: response.data.comment.userName,
                    comment: response.data.comment.comment,
                    timestamp: response.data.comment.timestamp
                };
                
                setComments(prevComments => [newCommentData, ...prevComments]);
                
                // Clear form
                setNewComment('');
                setUserName('');
            } else {
                setError(response.data.message || 'Failed to add comment');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            // Fallback to localStorage if API is not available
            try {
                const comment = {
                    _id: Date.now(),
                    userName: userName.trim(),
                    comment: newComment.trim(),
                    timestamp: new Date().toISOString(),
                    productId: productId
                };

                const updatedComments = [comment, ...comments];
                setComments(updatedComments);
                
                // Save to localStorage
                localStorage.setItem(`comments_${productId}`, JSON.stringify(updatedComments));
                
                // Clear form
                setNewComment('');
                setUserName('');
                setError('Comment saved offline (API unavailable)');
            } catch (localError) {
                console.error('Error saving to localStorage:', localError);
                if (error.response?.data?.message) {
                    setError(error.response.data.message);
                } else {
                    setError('Failed to add comment. Please check your connection and try again.');
                }
            }
        } finally {
            setLoading(false);
        }
    };

    // Delete comment
    const handleDeleteComment = async (commentId) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            try {
                setError('');
                const response = await axios.delete(`${API_BASE_URL}/comments/${commentId}`);
                
                if (response.data.success) {
                    setComments(prevComments => 
                        prevComments.filter(comment => comment._id !== commentId)
                    );
                } else {
                    setError(response.data.message || 'Failed to delete comment');
                }
            } catch (error) {
                console.error('Error deleting comment:', error);
                // Fallback to localStorage if API is not available
                try {
                    const updatedComments = comments.filter(comment => comment._id !== commentId);
                    setComments(updatedComments);
                    localStorage.setItem(`comments_${productId}`, JSON.stringify(updatedComments));
                    setError('Comment deleted offline (API unavailable)');
                } catch (localError) {
                    console.error('Error deleting from localStorage:', localError);
                    if (error.response?.data?.message) {
                        setError(error.response.data.message);
                    } else {
                        setError('Failed to delete comment. Please try again.');
                    }
                }
            }
        }
    };

    // Format timestamp
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (!isOpen) return null;

    return (
        <div className="comment-modal-overlay" onClick={onClose}>
            <div className="comment-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="comment-modal-header">
                    <h3>Comments for {productTitle}</h3>
                    <button className="comment-modal-close" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="comment-modal-body">
                    {/* Add Comment Form */}
                    <div className="add-comment-section">
                        <h4>Add a Comment</h4>
                        {error && (
                            <div className="error-message">
                                <i className="fas fa-exclamation-triangle"></i>
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleAddComment} className="comment-form">
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    placeholder="Write your comment here..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    className="form-control"
                                    rows="3"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="submit-comment-btn" disabled={loading}>
                                {loading ? 'ADDING...' : 'ADD COMMENT'}
                            </button>
                        </form>
                    </div>

                    {/* Comments List */}
                    <div className="comments-section">
                        <h4>Comments ({comments.length})</h4>
                        {comments.length === 0 ? (
                            <div className="no-comments">
                                <p>No comments yet. Be the first to comment!</p>
                            </div>
                        ) : (
                            <div className="comments-list">
                                {comments.map((comment) => (
                                    <div key={comment._id} className="comment-item">
                                        <div className="comment-header">
                                            <div className="comment-user">
                                                <i className="fas fa-user-circle"></i>
                                                <span className="user-name">{comment.userName}</span>
                                            </div>
                                            <div className="comment-actions">
                                                <span className="comment-time">{formatTimestamp(comment.timestamp)}</span>
                                                <button
                                                    className="delete-comment-btn"
                                                    onClick={() => handleDeleteComment(comment._id)}
                                                    title="Delete comment"
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="comment-text">
                                            {comment.comment}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentModal;

