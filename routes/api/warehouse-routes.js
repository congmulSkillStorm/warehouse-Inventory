import { Router } from 'express';
import { getWarehouse } from '../../controllers/warehouse.js';

const router = Router();


// Get One Warehouse
router.get('/:id', async (req, res) => {
    try {
        const warehouseId = req.params.id;
        console.log("warehouseId", warehouseId);
        const response = await getWarehouse(warehouseId);
        console.log(response);
        res.status(200).json(response);

    }catch(err) {
        console.error(err)
        res.status(500).json(err);
    }
})

export default router;