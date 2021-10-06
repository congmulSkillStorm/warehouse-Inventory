const API = {
    async getChildCompanies() {
        try {
            const res = await fetch('/api/company/');
            return res.json();
        }catch(err){
            console.error(err);
        }
    }
}