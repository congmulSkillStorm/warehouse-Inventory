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

    console.log(productData);

    await API.createProduct(productData);

    closeModal()
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