let modal;
let modalSaveBtnEl;

async function handleModalForm(event) {
    event.preventDefault();
    

    let productData = {}
    productData.warehouseId = intputWarehouseIdEl.value.trim();
    productData.productName = inputProductNameEl.value.trim();
    productData.color = inputColorEl.value.trim();
    productData.price = inputPriceEl.value.trim();
    productData.quantity = inputQuantityEl.value.trim();
    productData.sqft = inputSqftEl.value.trim();

    console.log("productData", productData);

    const childCompanyId = location.search.split("=")[1];
    console.log("childCompanyId", childCompanyId)
    

    // Create new product & Update web page with new information.
    try{
      const updatedWarehouseNchildCompany = await API.createProduct(productData, childCompanyId);
      console.log(updatedWarehouseNchildCompany, "updatedWarehouseNchildCompany After creating product");
      // Update product table with new product
      document.getElementById('display-product-table').innerHTML = productTable(updatedWarehouseNchildCompany.warehouseUpdated.product);
      
      const allWarehouseQuery = displayAllwarehouse(updatedWarehouseNchildCompany.childCompany[0]);
      document.getElementById('display-warehouse').innerHTML = allWarehouseQuery;

      updatedWarehouseNchildCompany.childCompany[0].warehouseBasicInfo.forEach(warehouse => {
        // console.log(warehouse)
        displayGraph(warehouse);
      })

        // Clear input on modal
        intputWarehouseIdEl.value = "";
        inputProductNameEl.value = "";
        inputColorEl.value = "";
        inputPriceEl.value = "";
        inputQuantityEl.value = "";
        inputSqftEl.value = "";

      closeModal();

    } catch(err) {
      console.log(err);
      document.getElementById('maxCap-warning-onNewProduct-Modal').classList.remove('visually-hidden');

      setTimeout(() => {
        document.getElementById('maxCap-warning-onNewProduct-Modal').classList.add('visually-hidden');
      }, 3500)
    }


}



const newProductOnclick = (event) => {
    console.log("in newProductOnclick", event.target.dataset.id);
    let warehouseArr = event.target.dataset.id.split(",");
    console.log(warehouseArr);

    openModal();
}

function openModal() {
    document.getElementById("backdrop").style.display = "block"
    document.getElementById("exampleModal").style.display = "block"
    document.getElementById("exampleModal").classList.add("show")

    // Get the modal
    modal = document.getElementById('exampleModal');
    intputWarehouseIdEl = document.getElementById('intputWarehouseId');
    inputProductNameEl = document.getElementById('inputProductName');
    inputColorEl = document.getElementById('inputColor');
    inputPriceEl = document.getElementById('inputPrice');
    inputQuantityEl = document.getElementById('inputQuantity');
    inputSqftEl = document.getElementById('inputSqft');

    modalSaveBtnEl = document.getElementById('modal-save-btn');
    modalSaveBtnEl.addEventListener("click", handleModalForm);
}
function closeModal() {
    document.getElementById("backdrop").style.display = "none"
    document.getElementById("exampleModal").style.display = "none"
    document.getElementById("exampleModal").classList.remove("show")
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal()
  }
}