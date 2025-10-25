# Forgot Password Email Implementation Guide

## Current Status: Demo Mode ✅

The forgot password modal is currently working in **demo mode** to avoid API connection issues. It simulates the email sending process and shows a success message.

## How to Enable Real Email Functionality

### Option 1: Using Nodemailer (Recommended)

#### 1. Install Nodemailer
```bash
cd backend
npm install nodemailer
```

#### 2. Update Backend Environment Variables
Add these to your `.env` file or Render environment variables:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@yourapp.com
FRONTEND_URL=https://your-frontend-url.com
```

#### 3. Create Email Service
Create `backend/services/emailService.js`:

```javascript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>You requested a password reset for your account.</p>
        <p>Click the button below to reset your password:</p>
        <a href="${resetLink}" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
```

#### 4. Update Backend Route
Update `backend/routes/auth.js` forgot-password endpoint:

```javascript
import { sendPasswordResetEmail } from '../services/emailService.js';

// In the forgot-password route, replace the console.log with:
await sendPasswordResetEmail(email, resetToken);
```

### Option 2: Using SendGrid

#### 1. Install SendGrid
```bash
cd backend
npm install @sendgrid/mail
```

#### 2. Update Environment Variables
```env
SENDGRID_API_KEY=your-sendgrid-api-key
EMAIL_FROM=noreply@yourapp.com
FRONTEND_URL=https://your-frontend-url.com
```

#### 3. Create SendGrid Service
Create `backend/services/sendGridService.js`:

```javascript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  
  const msg = {
    to: email,
    from: process.env.EMAIL_FROM,
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>You requested a password reset for your account.</p>
        <p>Click the button below to reset your password:</p>
        <a href="${resetLink}" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
  };

  await sgMail.send(msg);
};
```

### Option 3: Using AWS SES

#### 1. Install AWS SDK
```bash
cd backend
npm install aws-sdk
```

#### 2. Update Environment Variables
```env
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
EMAIL_FROM=noreply@yourapp.com
FRONTEND_URL=https://your-frontend-url.com
```

## Frontend Changes for Production

### 1. Enable Real API Call
In `src/components/ForgotPasswordModal/ForgotPasswordModal.jsx`, uncomment the real API call:

```javascript
// Comment out the demo simulation
// await new Promise(resolve => setTimeout(resolve, 2000));
// setSuccess(true);
// setStep(2);

// Uncomment the real API call
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
```

### 2. Remove Demo Message
Remove the demo note from the success message:

```javascript
<p className="forgot-password-success-message">
    We've sent a password reset link to <strong>{email}</strong>. 
    Please check your email and follow the instructions to reset your password.
</p>
```

## Testing the Implementation

### 1. Test Email Service
```javascript
// Add this test endpoint to your backend
router.post("/test-email", async (req, res) => {
  try {
    await sendPasswordResetEmail("test@example.com", "test-token");
    res.json({ message: "Test email sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send test email" });
  }
});
```

### 2. Check Console Logs
Monitor the backend console for:
- Email sending success/failure
- Token generation
- User lookup results

## Security Considerations

1. **Rate Limiting**: Implement rate limiting for forgot password requests
2. **Token Storage**: Store reset tokens in database with expiration
3. **Email Validation**: Validate email format and domain
4. **Logging**: Log all password reset attempts
5. **HTTPS**: Ensure all email links use HTTPS

## Current Demo Behavior

- ✅ Modal opens when "Forgot Password" is clicked
- ✅ Email validation works
- ✅ Loading states show properly
- ✅ Success message displays
- ✅ Mobile responsive design
- ✅ Keyboard navigation works
- ✅ Error handling is in place

The forgot password modal is fully functional in demo mode and ready for production email integration!
