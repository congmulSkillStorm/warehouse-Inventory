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

    async getWarehouse(warehouseId) {
        try {
            const res = await fetch(`/api/warehouse/${warehouseId}`);
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
    }
}