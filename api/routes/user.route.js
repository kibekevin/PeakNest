import express from 'express';
import { deleteUser, test, getUserListings, getUser } from '../controllers/user.controller.js';
import { updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.get('/listings/:id', verifyToken, getUserListings);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/:id', verifyToken, getUser);

export default router; 