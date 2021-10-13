const API = {
    async getChildCompanies() {
        try {
            const res = await fetch('/api/company/');
            return res.json();
        }catch(err){
            console.error(err);
        }
    },

    async getChildCompany(childCompanyId) {
        try {
            const res = await fetch(`/api/company/${childCompanyId}`);
            return res.json();
        }catch(err){
            console.error(err);
        }
    },

    async getAllWarehouse() {
        try {
            const res = await fetch(`/api/warehouse/`);
            return res.json();
        }catch(err){
            console.error(err);
        }
    },

    async getWarehouse(warehouseId) {
        try {
            const res = await fetch(`/api/warehouse/${warehouseId}`);
            return res.json();
        }catch(err){
            console.error(err);
        }
    },

    async getWarehouseByProductId(productId) {
        try {
            const res = await fetch(`/api/warehouse/product/${productId}`);
            return res.json();
        }catch(err){
            console.error(err);
        }
    },

    async createProduct(productData, childCompanyId) {
        try{
            const res = await fetch('/api/warehouse/' + childCompanyId, {
                method: "PUT", 
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(productData)
                });
            if(res.ok){
                return res.json();
            }else{
                // console.log(res);
                return Promise.reject({message: 'Can not be added greater than Max Capapacity'})
            }
        }catch(err) {
            throw err;
        }
    },

    async updateProduct(productData) {
        try{
            const res = await fetch('/api/warehouse/update/product/', {
                method: "PUT", 
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(productData)
                });
            if(res.ok){
                return res.json();
            }else{
                // console.log(res);
                return Promise.reject({message: 'Something problem.'})
            }
        }catch(err) {
            throw err;
        }
    },

    async deleteProduct(productIdarr, warehouseId, childCompanyId) {
        // console.log(productIdarr)
        try{
            const res = await fetch('/api/warehouse/delete/product/', {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({productIdarr, warehouseId, childCompanyId})
                });
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject({message: 'Something problem.'})
            }
        }catch(err) {
            throw err;
        }
    }
}