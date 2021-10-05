import { Router } from 'express';
import { createCompany, loginCompany } from '../../controllers/company.js';

const router = Router();

// Path: /api/company/

// Create new Company Account
router.post('/', async (req, res) => {
    try {
        const result = await createCompany(req.body);
        res.status(200).json(result);
    }catch(err) {
        res.status(500).json(err);
    }
})

// Login
router.post('/login', async (req, res) => {
    try {
        console.log("In Login Company Routes", req.body);
        const result = await loginCompany(req.body);
        
        res.status(200).redirect('/home');
    }catch(err) {
        res.status(500).json(err);
    }
})

export default router;