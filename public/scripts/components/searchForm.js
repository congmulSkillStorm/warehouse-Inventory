function createProductLists(allProductlistDisplay) {
    let allQueries = ``;

    allProductlistDisplay.forEach(product => {
        allQueries += `
        <li class=li-search-options data-product-id=${product._id}>${product.productName}</li>`
    })

    return allQueries;
}

async function warehousesDatawithProduct() {
    try{
        const allWarehouses = await API.getAllWarehouse();
        console.log(allWarehouses)

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
    const liSearchOptionsEls = document.getElementsByClassName('li-search-options');
    const searchFormForParentCompanyEl = document.getElementById('search-form-for-parentCompany');
    
    const allProductlistOriginal = await warehousesDatawithProduct();
    console.log(allProductlistOriginal);
    let allProductlistDisplay = allProductlistOriginal.filter((product, index)=> {
        return index < 10;
    })

    console.log(allProductlistDisplay);

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

            // Display Product lists (10ea)
            document.getElementById('ul-search-form').innerHTML = createProductLists(allProductlistDisplay);
        }
    }

    function onClickListText(event) {
        let seletecListforSearch = event.target.innerText;
        searchInputForParentComEl.value = seletecListforSearch;
        
    }

    function onClickSearchBarBtn(event) {
        event.preventDefault();
        console.log("Search Clicking", searchInputForParentComEl.value);
    }

    searchInputForParentComEl.addEventListener("focus", onFucusSearchBar);
    
    searchbarOptionEl.addEventListener('change', onChangeSearchOption)
    for (const element of liSearchOptionsEls) {
        element.addEventListener('click', onClickListText);
    }
    searchFormForParentCompanyEl.addEventListener('click', onClickSearchBarBtn);


    searchInputForParentComEl.addEventListener("keyup", function(event){
        if(document.getElementById('search-options').value === "productName"){
            let userInput = searchInputForParentComEl.value
            allProductlistOriginal;
          let originalProductList = allProductlistOriginal;
          let allProductlistDisplay = originalProductList.filter(function(product, index) {

            return product.productName.toLowerCase().includes(userInput)
            
            });
            console.log(allProductlistDisplay)
        }
      })


    window.onclick = function(event) {
        let isSearchBar = searchInputForParentComEl === event.target;

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
