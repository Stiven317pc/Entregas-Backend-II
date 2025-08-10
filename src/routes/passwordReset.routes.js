import { Router } from 'express';
import {
  requestPasswordReset,
  resetPassword,
  validateToken,
  showRecoverForm,
} from '../controllers/passwordReset.controller.js';

const router = Router();

router.post('/request', requestPasswordReset); 
router.get('/recover-password', showRecoverForm); 
router.get('/validate-token/:token', validateToken); 
router.post('/reset', resetPassword); 

export default router;
