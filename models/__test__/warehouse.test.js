import mongoose from 'mongoose';
import { Warehouse } from '../index';

const mongoUrl = 'mongodb://localhost/test_warehouse-inventory';


const dummyWarehouse ={
    warehouseName: "myWarehouse",
    address: "123 Lindsay AVE",
    maxCapacity: 1000,
    currentCapacity: 500,
    product: [{
        productName: "myProduct",
        sqft: 10,
        quantity: 250,
        color: "Black",
        price: 250000,
    }]
}


beforeAll(async () => {
    await mongoose.connect(mongoUrl);
    await Warehouse.deleteMany({});
})

afterEach(async () => {
    await Warehouse.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Warehouse model test', () => {
    it('Should create a Warehouse', async () => {
        await new Warehouse(dummyWarehouse).save();
        const expected = 1;

        const response = await Warehouse.countDocuments();
        const actual = response;

        expect(actual).toBe(expected);
    });

    it('Should get a warehouse ', async () => {
        const newWarehouse = await new Warehouse(dummyWarehouse).save();
        const expected = newWarehouse._id;

        const getWarehouse = await Warehouse.findOne({_id: newWarehouse._id});
        const actual = getWarehouse._id;

        expect(actual).toEqual(expected);
    });
    
    it('Should find a warehouse by ProductId', async () => {
        const newWarehouse = await new Warehouse(dummyWarehouse).save();
        const expected = newWarehouse._id;

        const getWarehouse = await Warehouse.findOne({"product._id": newWarehouse.product[0]._id});
        const actual = getWarehouse._id;

        expect(actual).toEqual(expected);
    });

    it('Should update product by ProductId', async () => {
        const newWarehouse = await new Warehouse(dummyWarehouse).save();
        const expected = "Updated Product";

        await Warehouse.updateOne({"product._id": newWarehouse.product[0]._id},
        {'$set': { 'product.$.productName': "Updated Product",
                    'product.$.color': "Red",
                    'product.$.price': 25,
                    'product.$.quantity': 1,
                    'product.$.sqft': 10}
        },
        { new: true });
        const getUpdatedWarehouse = await Warehouse.findOne({"_id": newWarehouse._id});;
        const actual = getUpdatedWarehouse.product[0].productName;

        expect(actual).toEqual(expected);
    });

    it('Shoud Delete product by ProductId', async() => {
        const newWarehouse = await new Warehouse(dummyWarehouse).save();
        const expected = undefined;
        await Warehouse.updateOne({'_id': newWarehouse._id}, 
        { $pull: { product: { _id: newWarehouse.product[0]._id}} }
        );

        const warehouseAfterDelete = await Warehouse.findOne({"_id": newWarehouse._id});
        const actual = warehouseAfterDelete.product[0]

        expect(actual).toEqual(expected);
    })

});

