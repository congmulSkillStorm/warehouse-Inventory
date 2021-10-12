function searchFunction() {
    const searchInputForParentComEl = document.getElementById('search-form-input');
    const searchList = document.getElementById('search-list');
    const searchbarOptionEl = document.getElementById('search-options');
    const liSearchOptionsEls = document.getElementsByClassName('li-search-options');
    const searchFormForParentCompanyEl = document.getElementById('search-form-for-parentCompany');


    function onFucusSearchBar() {
        if(searchbarOptionEl.value === "productName"){
            searchList.style.display = "block";
            searchList.style.opacity = "100%";
        }
    }
    
    function onChangeSearchOption() {
        if(searchbarOptionEl.value === "companyName"){
            searchInputForParentComEl.placeholder = 'Search for ' + "Companies"
        }else{
            searchInputForParentComEl.placeholder = 'Search for ' + "Products"
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
