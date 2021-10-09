let checkedItemsArr = [];
function allCheckproduct() {
    for(let i = 0; i < document.getElementsByClassName('select-product-delete').length; i++){
        if(!document.getElementsByClassName('select-product-delete')[i].checked){
            document.getElementsByClassName('select-product-delete')[i].checked = true;
            checkedItemsArr.push(document.getElementsByClassName('select-product-delete')[i].dataset.id)
        }
    }

    // console.log(checkedItemsArr);
}
function allUncheckproduct(){
    checkedItemsArr = [];
    for(let i = 0; i < document.getElementsByClassName('select-product-delete').length; i++){
        document.getElementsByClassName('select-product-delete')[i].checked = false;
    }
    document.getElementById('bar-menu-inventory').style.width = '0';
    document.getElementById('bar-menu-inventory').style.opacity = '0';

    // console.log(checkedItemsArr);
} 

async function productDeleteBtn(){
    console.log(checkedItemsArr);
    const childCompanyId = location.search.split("=")[1];
    const warehouseId = document.getElementById('display-warehouse-name').dataset.warehouseId;
    console.log(childCompanyId, warehouseId);
    //  Call Delete Product API
    const response = await API.deleteProduct(checkedItemsArr, warehouseId, childCompanyId);
    console.log(response);
}

function clickHandle(e) {
    if(e.target.checked){
        checkedItemsArr.push(e.target.dataset.id);
    }else{
        checkedItemsArr = checkedItemsArr.filter(id => id != e.target.dataset.id);
    }

    if(checkedItemsArr.length > 0){
        document.getElementById('bar-menu-inventory').style.width = '100%';
        document.getElementById('bar-menu-inventory').style.opacity = '100%';
        document.getElementById('amount-product-selected').textContent = checkedItemsArr.length;
    }else{
        document.getElementById('bar-menu-inventory').style.width = '0';
        document.getElementById('bar-menu-inventory').style.opacity = '0';
    }
    console.log(checkedItemsArr);
}

function initWatchSelect() {
    for(let i = 0; i < document.getElementsByClassName('select-product-delete').length; i++){
        document.getElementsByClassName('select-product-delete')[i].addEventListener("click", clickHandle);
    
    }
}