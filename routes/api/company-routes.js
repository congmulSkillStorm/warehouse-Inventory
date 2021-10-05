import { Router } from 'express';
// import { getUsers, getUser, createUser } from '../../controllers/users.js';

const router = Router();

// Path: /api/company/
router.post('/', async (req, res) => {
    console.log("In POST Routes", req.body);
    try {
        const result = await createUser(req.body);
        res.status(200).json(result);
    }catch(err) {
        res.status(500).json(err);
    }
})

export default router;