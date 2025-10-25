import React, { useState, useEffect } from 'react';
import './ForgotPasswordModal.css';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [step, setStep] = useState(1); // 1: Email input, 2: Success message

    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape' && isOpen) {
                handleClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleClose = () => {
        setEmail('');
        setError('');
        setSuccess(false);
        setStep(1);
        onClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            setLoading(false);
            return;
        }

        try {
            const BASE = import.meta.env.VITE_API_BASE_URL || "https://ecommerce-backend-bwha.onrender.com";
            
            console.log('Sending password reset request for:', email);
            
            // For demo purposes, we'll simulate the API call
            // In a real implementation, this would call the backend API
            console.log('Demo mode: Simulating password reset email...');
            
            // Simulate API call with realistic timing
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // For demo purposes, we'll show success
            // In production, you would uncomment the real API call below
            setSuccess(true);
            setStep(2);
            
            /* 
            // Real API call (uncomment for production with email service)
            const response = await fetch(`${BASE}/api/auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setStep(2);
            } else {
                setError(data.message || 'Failed to send reset email. Please try again.');
            }
            */
            
        } catch (err) {
            console.error('Forgot password error:', err);
            setError('Failed to send reset email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendEmail = () => {
        setStep(1);
        setSuccess(false);
        setError('');
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="forgot-password-backdrop" onClick={handleClose}></div>
            
            {/* Modal */}
            <div className="forgot-password-modal">
                <div className="forgot-password-header">
                    <h3>
                        {step === 1 ? 'Reset Password' : 'Check Your Email'}
                    </h3>
                    <button className="forgot-password-close" onClick={handleClose}>
                        <i className="fa-solid fa-times"></i>
                    </button>
                </div>
                
                <div className="forgot-password-content">
                    {step === 1 ? (
                        <>
                            <div className="forgot-password-icon">
                                <i className="fa-solid fa-lock"></i>
                            </div>
                            
                            <p className="forgot-password-description">
                                Enter your email address and we'll send you a link to reset your password.
                            </p>

                            {error && (
                                <div className="forgot-password-error">
                                    <i className="fa-solid fa-exclamation-triangle"></i>
                                    <p>{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="forgot-password-form">
                                <div className="forgot-password-input-group">
                                    <label htmlFor="reset-email">Email Address</label>
                                    <div className="forgot-password-input-wrapper">
                                        <i className="fa-solid fa-envelope"></i>
                                        <input
                                            id="reset-email"
                                            type="email"
                                            placeholder="Enter your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={loading}
                                            required
                                            autoFocus
                                        />
                                    </div>
                                </div>

                                <div className="forgot-password-buttons">
                                    <button 
                                        type="button" 
                                        className="forgot-password-cancel"
                                        onClick={handleClose}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="forgot-password-submit"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <i className="fa-solid fa-spinner fa-spin"></i>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fa-solid fa-paper-plane"></i>
                                                Send Reset Link
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <>
                            <div className="forgot-password-success-icon">
                                <i className="fa-solid fa-check-circle"></i>
                            </div>
                            
                            <h4>Reset Link Sent!</h4>
                            
                            <p className="forgot-password-success-message">
                                We've sent a password reset link to <strong>{email}</strong>. 
                                Please check your email and follow the instructions to reset your password.
                                <br /><br />
                                <small style={{ color: '#6c757d', fontStyle: 'italic' }}>
                                    Note: This is a demo. In a real application, you would receive an actual email with a reset link.
                                </small>
                            </p>

                            <div className="forgot-password-success-actions">
                                <button 
                                    className="forgot-password-resend"
                                    onClick={handleResendEmail}
                                >
                                    <i className="fa-solid fa-redo"></i>
                                    Send Another Email
                                </button>
                                <button 
                                    className="forgot-password-close-btn"
                                    onClick={handleClose}
                                >
                                    <i className="fa-solid fa-times"></i>
                                    Close
                                </button>
                            </div>

                            <div className="forgot-password-help">
                                <p>
                                    <i className="fa-solid fa-info-circle"></i>
                                    Didn't receive the email? Check your spam folder or try again.
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ForgotPasswordModal;
