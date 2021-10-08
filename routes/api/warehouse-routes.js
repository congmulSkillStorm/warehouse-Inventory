import { Router } from 'express';
import { getWarehouse, createProduct } from '../../controllers/warehouse.js';

const router = Router();

// /api/warehouse/

// Get One Warehouse
router.get('/:id', async (req, res) => {
    try {
        const warehouseId = req.params.id;
        // console.log("warehouseId", warehouseId);
        const response = await getWarehouse(warehouseId);
        // console.log(response);
        res.status(200).json(response);

    }catch(err) {
        console.error(err)
        res.status(500).json(err);
    }
});

// Create Product in Warehouse
router.put('/:childCompanyId', async (req, res) => {
    console.log(req.body, "Create Product in Warehouse");
    console.log(req.params.childCompanyId, 'childCompanyId')
    try{
        const response = await createProduct(req.body, req.params.childCompanyId);
        console.log(response);
        res.status(200).json(response);
    }catch(err) {
        console.log(err, "err in Create product Route");
        res.status(500).json(err);
    }
})

export default router;