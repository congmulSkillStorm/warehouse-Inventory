function createProductLists(allProductlistDisplay) {
    let allQueries = ``;
    // console.log(allProductlistDisplay)
    if(allProductlistDisplay != null){
        allProductlistDisplay.forEach(product => {
            allQueries += `
            <li class=li-search-options data-product-id=${product._id}>${product.productName}</li>`
        })
    }

    return allQueries;
}

async function warehousesDatawithProduct() {
    try{
        const allWarehouses = await API.getAllWarehouse();
        // console.log(allWarehouses)

        let allProductlist = [];
        allWarehouses.forEach(warehouse => {
            allProductlist = [...allProductlist, ...warehouse.product ]
        })
        // console.log(allProductlist);
        return allProductlist;

    }catch(err){
        console.log(err);
    }
}

async function searchFunction(childCompanies) {
    // console.log(childCompanies);
    const searchInputForParentComEl = document.getElementById('search-form-input');
    const searchList = document.getElementById('search-list');
    const searchbarOptionEl = document.getElementById('search-options');
    let liSearchOptionsEls;
    const searchFormForParentCompanyEl = document.getElementById('search-form-for-parentCompany');
    
    // get All product Lists
    const allProductlistOriginal = await warehousesDatawithProduct();
    // console.log(allProductlistOriginal);
    let allProductlistDisplay = allProductlistOriginal.filter((product, index)=> {
        return index < 10;
    })
    // console.log(allProductlistDisplay);

    function onFucusSearchBar() {
        if(searchbarOptionEl.value === "productName"){
            searchList.style.display = "block";
            searchList.style.opacity = "100%";
        }
    }
    
    function onChangeSearchOption() {
        if(searchbarOptionEl.value === "companyName"){
            searchInputForParentComEl.placeholder = 'Search for ' + "Companies"
            searchInputForParentComEl.value = "";
        }else{
            searchInputForParentComEl.placeholder = 'Search for ' + "Products"
            searchInputForParentComEl.value = "";

            // rerender main page
            init(childCompanies);

            // Display Product lists (10 products)
            document.getElementById('ul-search-form').innerHTML = createProductLists(allProductlistDisplay);
            liSearchOptionsEls = document.getElementsByClassName('li-search-options');
            for (const element of liSearchOptionsEls) {
                element.addEventListener('click', onClickListText);
            }
        }
    }

    async function onClickListText(event) {
        let selectedProduct = event.target.innerText;
        let productId = event.target.dataset.productId;
        searchInputForParentComEl.value = selectedProduct;

        console.log(selectedProduct, productId);
        
        // Call Warehouse by Product ID
        const seletedWarehouse = await API.getWarehouseByProductId(productId);
        // Call company by warehouse ID
        console.log(seletedWarehouse);
        const seletedCompany = await API.getChildCompanyByWarehouseId(seletedWarehouse[0]._id)
        console.log(seletedCompany)

        let userConfirm = window.confirm(`
        ${selectedProduct} is in ${seletedWarehouse[0].warehouseName} in ${seletedCompany[0].companyName} company.

        Do you want to check the page?`)
        // Redirect to the warehouse that has the product!
        if(userConfirm){
            window.location = `/warehouse?warehouseId=${seletedCompany[0]._id}`
        }
    }

    function onClickSearchBarBtn(event) {
        event.preventDefault();
        console.log("Search Clicking", searchInputForParentComEl.value, );
    }

    searchInputForParentComEl.addEventListener("focus", onFucusSearchBar);
    
    searchbarOptionEl.addEventListener('change', onChangeSearchOption);

    // for (const element of liSearchOptionsEls) {
    //     element.addEventListener('click', onClickListText);
    // }
    searchFormForParentCompanyEl.addEventListener('click', onClickSearchBarBtn);

    searchInputForParentComEl.addEventListener("keyup", function(event){
        if(document.getElementById('search-options').value === "productName"){
            let userInput = searchInputForParentComEl.value
            allProductlistOriginal;
            let originalProductList = allProductlistOriginal;
            let allProductlistDisplay = originalProductList.filter(product => product.productName.toLowerCase().includes(userInput.toLowerCase()));

            if(allProductlistDisplay.length > 10){
                // Display Product lists (10 products)
                document.getElementById('ul-search-form').innerHTML = createProductLists(allProductlistDisplay.splice(0, 10));
            }else{
                document.getElementById('ul-search-form').innerHTML = createProductLists(allProductlistDisplay);
            }

            liSearchOptionsEls = document.getElementsByClassName('li-search-options');
            for (const element of liSearchOptionsEls) {
                element.addEventListener('click', onClickListText);
            }
        }
      })


    window.onclick = function(event) {
        let isSearchBar = (searchInputForParentComEl === event.target);
        // console.log(event.target);
        // console.log(isSearchBar)
        // console.log("searchList.getAttribut", window.getComputedStyle(searchList).display)

        if(window.getComputedStyle(searchList).display === "block"){
            // console.log("BLOCK")
            if(isSearchBar !== true){
                searchList.style.display = "none";
                searchList.style.opacity = "0%";
            }
        }
      }
}
