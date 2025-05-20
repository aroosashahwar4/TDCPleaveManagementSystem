import express from 'express';
import { submitLeave } from '../controllers/leaveController.mjs';

export default function(Leave) {
  const router = express.Router();

  // Inject model into request
  router.use((req, res, next) => {
    req.model = Leave;
    next();
  });

  // POST route
  router.post('/', submitLeave);
  

  return router;
}
