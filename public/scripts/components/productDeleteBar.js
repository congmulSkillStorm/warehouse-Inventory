let checkedItem = [];
function allCheckproduct() {
    for(let i = 0; i < document.getElementsByClassName('select-product-delete').length; i++){
        if(!document.getElementsByClassName('select-product-delete')[i].checked){
            document.getElementsByClassName('select-product-delete')[i].checked = true;
            checkedItem.push(document.getElementsByClassName('select-product-delete')[i].dataset.id)
        }
    }

    // console.log(checkedItem);
}
function allUncheckproduct(){
    checkedItem = [];
    for(let i = 0; i < document.getElementsByClassName('select-product-delete').length; i++){
        document.getElementsByClassName('select-product-delete')[i].checked = false;
    }
    document.getElementById('bar-menu-inventory').style.width = '0';
    document.getElementById('bar-menu-inventory').style.opacity = '0';

    // console.log(checkedItem);
} 

function productDeleteBtn(){
    console.log(checkedItem);
    //  Call Delete Product API
}

function clickHandle(e) {
    if(e.target.checked){
        checkedItem.push(e.target.dataset.id);
    }else{
        checkedItem = checkedItem.filter(id => id != e.target.dataset.id);
    }

    if(checkedItem.length > 0){
        document.getElementById('bar-menu-inventory').style.width = '100%';
        document.getElementById('bar-menu-inventory').style.opacity = '100%';
        document.getElementById('amount-product-selected').textContent = checkedItem.length;
    }else{
        document.getElementById('bar-menu-inventory').style.width = '0';
        document.getElementById('bar-menu-inventory').style.opacity = '0';
    }
    console.log(checkedItem);
}

function initWatchSelect() {
    for(let i = 0; i < document.getElementsByClassName('select-product-delete').length; i++){
        document.getElementsByClassName('select-product-delete')[i].addEventListener("click", clickHandle);
    
    }
}