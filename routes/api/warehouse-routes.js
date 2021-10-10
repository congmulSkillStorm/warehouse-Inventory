import { Router } from 'express';
import { getWarehouse, createProduct, updateProduct, deleteProduct } from '../../controllers/warehouse.js';

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
    console.log(req.body, "Create Product in Warehouse Route");
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

// Update Product by ID
router.put('/update/product/', async(req, res) => {
    console.log(req.body, "req.body in update product route")
    try{
        const response = await updateProduct(req.body);
        console.log(response);
        res.status(200).json(response);
    }catch(err) {
        res.status(500).json(err);
    }
})


// Delete Product by ID
router.put('/delete/product/', async(req, res) => {
    console.log(req.body, "req.body in delete route")
    try{
        const response = await deleteProduct(req.body);
        console.log(response);
        res.status(200).json(response);
    }catch(err) {
        res.status(500).json(err);
    }
})

export default router;