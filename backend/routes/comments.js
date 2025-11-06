import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

const commentSchema = new mongoose.Schema({
    productId: {
        type: Number,
        required: true,
        index: true
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    comment: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

commentSchema.index({ productId: 1, timestamp: -1 });

const Comment = mongoose.model('Comment', commentSchema);

router.get('/:productId', async (req, res) => {
    try {
        const productId = parseInt(req.params.productId);
        
        if (isNaN(productId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Product ID'
            });
        }

        const comments = await Comment.find({ productId })
            .sort({ timestamp: -1 })
            .select('userName comment timestamp');

        res.json({
            success: true,
            comments: comments
        });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch comments'
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { productId, userName, comment } = req.body;

        if (!productId || !userName || !comment) {
            return res.status(400).json({
                success: false,
                message: 'Product ID, user name, and comment are required'
            });
        }

        if (isNaN(parseInt(productId))) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID'
            });
        }

        if (userName.trim().length === 0 || comment.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'User name and comment cannot be empty'
            });
        }

        if (userName.length > 100) {
            return res.status(400).json({
                success: false,
                message: 'User name is too long (max 100 characters)'
            });
        }

        if (comment.length > 1000) {
            return res.status(400).json({
                success: false,
                message: 'Comment is too long (max 1000 characters)'
            });
        }

        const newComment = new Comment({
            productId: parseInt(productId),
            userName: userName.trim(),
            comment: comment.trim()
        });

        const savedComment = await newComment.save();

        res.status(201).json({
            success: true,
            message: 'Comment added successfully',
            comment: {
                id: savedComment._id,
                userName: savedComment.userName,
                comment: savedComment.comment,
                timestamp: savedComment.timestamp
            }
        });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add comment'
        });
    }
});

router.delete('/:commentId', async (req, res) => {
    try {
        const commentId = req.params.commentId;
        
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        
        if (!deletedComment) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found'
            });
        }

        res.json({
            success: true,
            message: 'Comment deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete comment'
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        
        const comments = await Comment.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ timestamp: -1 });

        const count = await Comment.countDocuments();

        res.json({
            success: true,
            comments,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch comments'
        });
    }
});

export default router;