import express from 'express';
import { register, login, verifyEmail, requestPasswordReset, resetPassword } from '../controllers/authController.js';
import { authorize, protect } from '../middlewares/authMiddleware.js';
import { authLimiter } from '../middlewares/rateLimiter.js';


import { resendVerificationEmail
  
 } from '../controllers/authController.js';
const router = express.Router();

router.post('/register', register);
router.post('/login',authLimiter, login);
router.get('/verify/:token', verifyEmail);


router.post('/password-reset-request', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);

router.get('/user-profile', protect, (req, res) => {
  res.json({ message: `Bienvenue ${req.user.name}` });
});

router.get('/admin-panel', protect, authorize('admin'), (req, res) => {
  res.json({ message: 'Bienvenue dans le panneau admin' });
 
});

router.get('/moderator-section', protect, authorize('moderator', 'admin'), (req, res) => {
  res.json({ message: 'Bienvenue dans la section modérateur' });
});

router.post("/resend-verification", resendVerificationEmail);

export default router;
