function searchFunction() {
    const searchInputForParentComEl = document.getElementById('search-form-input');
    const searchbarOptionEl = document.getElementById('search-options');
    
    function onFucusSearchBar() {
        if(searchbarOptionEl.value === "productName"){
            document.getElementById('search-list').style.opacity = "100%";
        }
    }
    
    function outFucusSearchBar() {
        document.getElementById('search-list').style.opacity = "0%";
    }
    
    function onChangeSearchOption() {
        if(searchbarOptionEl.value === "companyName"){
            searchInputForParentComEl.placeholder = 'Search for ' + "Companies"
        }else{
            searchInputForParentComEl.placeholder = 'Search for ' + "Products"
        }
    }
    
    searchInputForParentComEl.addEventListener("focus", onFucusSearchBar);
    searchInputForParentComEl.addEventListener("focusout", outFucusSearchBar);
    searchbarOptionEl.addEventListener('change', onChangeSearchOption)
}
