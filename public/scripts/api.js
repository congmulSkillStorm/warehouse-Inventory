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
}