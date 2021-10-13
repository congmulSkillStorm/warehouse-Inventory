// Take all element on Update Product form on Update-modal
const productNameTitleEl = document.getElementById('product-name-title');
const inputUpdateProductNameEl = document.getElementById('inputUpdateProductName');
const inputUpdateColorEl = document.getElementById('inputUpdateColor');
const inputUpdatePriceEl = document.getElementById('inputUpdatePrice');
const inputUpdateQuantityEl = document.getElementById('inputUpdateQuantity');
const inputUpdateSqft = document.getElementById('inputUpdateSqft');
let productId = "";

async function updateOnclick(event) {
    event.preventDefault();

    const childCompanyId = location.search.split("=")[1];
    const warehouseId = document.getElementById('display-warehouse-name').dataset.warehouseId;
    
    let updatedData = {}
    updatedData.childCompanyId = childCompanyId;
    updatedData.warehouseId = warehouseId;
    updatedData.productId = productId
    updatedData.productData = {}
    updatedData.productData.productName = inputUpdateProductNameEl.value.trim();
    updatedData.productData.color = inputUpdateColorEl.value.trim();
    updatedData.productData.price = inputUpdatePriceEl.value.trim();
    updatedData.productData.quantity = inputUpdateQuantityEl.value.trim();
    updatedData.productData.sqft = inputUpdateSqft.value.trim();

    // console.log("updatedData", updatedData);
    try{
        const updatedWarehouseNchildCompany = await API.updateProduct(updatedData);
        // console.log(updatedWarehouseNchildCompany);

        // Update product table with new product
      document.getElementById('display-product-table').innerHTML = productTable(updatedWarehouseNchildCompany.warehouseUpdated.product);
      
      const allWarehouseQuery = displayAllwarehouse(updatedWarehouseNchildCompany.childCompanyUpdated[0]);
      document.getElementById('display-warehouse').innerHTML = allWarehouseQuery;

      updatedWarehouseNchildCompany.childCompanyUpdated[0].warehouseBasicInfo.forEach(warehouse => {
        // console.log(warehouse)
        displayGraph(warehouse);
      })

        // Clear input on modal
        inputUpdateProductNameEl.value = "";
        inputUpdateColorEl.value = "";
        inputUpdatePriceEl.value = "";
        inputUpdateQuantityEl.value = "";
        inputUpdateSqft.value = "";

        closeUpdateModal();


        // Watch if products are checked to delete on product list // scripts/components/productDeleteBar.js
        initWatchSelect();

        // To Update product on a warehouse.
        initUpdateModal();

    }catch(err) {
              console.log(err);
      document.getElementById('maxCap-warning-onUpdateProduct-Modal').classList.remove('visually-hidden');

      setTimeout(() => {
        document.getElementById('maxCap-warning-onUpdateProduct-Modal').classList.add('visually-hidden');
      }, 3500)
    }
}

function openUpdateModal(event) {
    productId = event.target.parentNode.dataset.productId;
    // console.log(event.target.parentNode.dataset.productId)
    
    let oldValue = [];
    for(let node of event.target.parentNode.childNodes){
        // Select ProductName, Color, Price, Quantity, Sqft
        if(node.localName === "td" && node.innerText !== ""){
            oldValue.push(node.innerText)
        }
    }

    // console.log(oldValue);
    // console.log(oldValue[2].substr(1, oldValue[2].length));
    // console.log(parseFloat(oldValue[2].substr(1, oldValue[2].length).split(",").join("")));
    productNameTitleEl.innerText = oldValue[0];
    inputUpdateProductNameEl.value = oldValue[0];
    inputUpdateColorEl.value = oldValue[1];
    inputUpdatePriceEl.value = parseInt(oldValue[2].substr(1, oldValue[2].length).split(",").join(""));
    inputUpdateQuantityEl.value = oldValue[3];
    inputUpdateSqft.value = oldValue[4];

    modalSaveBtnEl = document.getElementById('update-modal-save-btn');
    modalSaveBtnEl.addEventListener("click", updateOnclick);

    document.getElementById("update-backdrop").style.display = "block"
    document.getElementById("update-product-modal").style.display = "block"
    document.getElementById("update-product-modal").classList.add("show")
}


function closeUpdateModal() {
    document.getElementById("update-backdrop").style.display = "none"
    document.getElementById("update-product-modal").style.display = "none"
    document.getElementById("update-product-modal").classList.remove("show")
}


function initUpdateModal() {
    const productListTrEl = document.getElementsByClassName('open-update-modal');
    // console.log(productListTrEl)
    for(let i = 0; i < productListTrEl.length; i++){
        productListTrEl[i].addEventListener("click", openUpdateModal);
    }
    
    // Get the modal
    var updateModal = document.getElementById('update-product-modal');
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == updateModal) {
            closeUpdateModal()
        }
    }
}

