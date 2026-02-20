import express from 'express';
import {
    createRole,
    getAllRoles,
    getRoleById,
} from '../controllers/role/index.role.controller';

const router = express.Router();

router.post('/create',  createRole);
router.get('/',  getAllRoles);
router.get('/:id',  getRoleById);

export default router;