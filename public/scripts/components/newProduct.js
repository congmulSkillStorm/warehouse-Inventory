const newProductOnclick = (event) => {
    console.log("in newProductOnclick", event.target.dataset.id);
    let warehouseArr = event.target.dataset.id.split(",");
    console.log(warehouseArr);
}

// document.getElementById('testNewproduct').onclick = newProductOnclick;