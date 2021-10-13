import { Router } from 'express';
import { createCompany, loginCompany, getChildCompanies, getChildCompnay, getChildCompnayByWarehouseId } from '../../controllers/company.js';

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
        // console.log("In Login Company Routes", req.body);
        const company = await loginCompany(req.body);
        
        req.session.save(() => {
            req.session.companyId = company._id;
            req.session.companyName = company.companyName;
            req.session.isMasterUser = company.isMasterUser;
            req.session.isParentCompany = company.isParentCompany;
            req.session.loggedIn = true;
            
            if(req.session.isParentCompany){
                res.status(200).redirect('/home');
            }else{
                res.status(200).redirect(`/warehouse?childCompanyId=${req.session.companyId}`);
            }
        });
    }catch(err) {
        res.status(500).json(err);
    }
})

router.get('/logout', (req, res) => {
    console.log(req.session.companyId);
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(200).redirect('/');
        });
    }else{
        res.status(404).end();
    }
});

// Get Company populating Child Company
router.get('/', async (req, res) => {
    try {
        const companyId = req.session.companyId;
        // console.log("companyId", companyId);
        const response = await getChildCompanies(companyId);
        // console.log(response);
        res.status(200).json(response);

    }catch(err) {
        console.error(err)
        res.status(500).json(err);
    }
})

// Get One Child Company
router.get('/:id', async (req, res) => {
    try {
        const companyId = req.params.id;
        console.log("companyId", companyId);
        const response = await getChildCompnay(companyId);
        // console.log(response);
        res.status(200).json(response);

    }catch(err) {
        console.error(err)
        res.status(500).json(err);
    }
})

// Get One Child Company by warehouse
router.get('/warehouse/:id', async (req, res) => {
    try {
        const warehouseId = req.params.id;
        // console.log("warehouseId", warehouseId);
        const response = await getChildCompnayByWarehouseId(warehouseId);
        // console.log(response);
        res.status(200).json(response);

    }catch(err) {
        console.error(err)
        res.status(500).json(err);
    }
})

export default router;