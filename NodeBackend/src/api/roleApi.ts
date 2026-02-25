import express from 'express';
import {
    createRole,
    getAllRoles,
    getRoleByName,
    deleteRole,
    updateRole
} from '../controllers/role/indexRoleController';

const router = express.Router();

router.post('/create',  createRole);
router.get('/',  getAllRoles);
router.get('/:name',  getRoleByName);
router.delete("/:id", deleteRole)
router.put("/:id", updateRole)

export default router;