const createSelectOptionsInModal = (warehouseArr) =>{
  let allQueries = "";

  warehouseArr.forEach(warehouse => {
      allQueries += `<option value=${warehouse._id}>${warehouse.warehouseName}</option>`;
  })
  
  return allQueries;
}

const modalQuery = (warehouseArr) => {
  return `
  <div>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true"
    role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">New Product</h5>
                <button type="button" class="close btn" aria-label="Close" onclick="closeModal()">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="alert alert-danger text-center visually-hidden" id="maxCap-warning-onNewProduct-Modal" role="alert">
                Cannot be added greater than Max Capacity
            </div>
            <div class="modal-body">

           
                <div class="form-group row">
                  <div class="row mb-3">
                    <div class="col-sm-12">
                      <select id="intputWarehouseId" class="form-select form-select-sm mb-3" aria-label=".form-select-lg example">
                      <option selected>Choose warehouse</option>
                      ${createSelectOptionsInModal(warehouseArr)}
                    </select>
                    </div>
                  </div>

                  <div class="row mb-3">
                    <label for="inputProductName" class="col-sm-4 col-form-label">Product name</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" id="inputProductName" name="inputProductName" placeholder="Product name">
                    </div>
                  </div>

                  <div class="row mb-4">
                    <div class="col-6">
                      <div class="row">
                        <label for="inputColor" class="col-sm-4 col-form-label">Color: </label>
                        <div class="col-sm-8">
                          <input type="text" min="0" class="form-control" id="inputColor" name="inputColor" />
                        </div>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="row">
                        <label for="inputPrice" class="col-sm-4 col-form-label">Price: </label>
                        <div class="col-sm-8">
                          <input type="number" min="0" class="form-control" id="inputPrice" name="inputPrice" placeholder="0">
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row mb-4">
                    <div class="col-6">
                      <div class="row">
                        <label for="inputQuantity" class="col-sm-4 col-form-label">Quantity: </label>
                        <div class="col-sm-8">
                          <input type="number" min="0" class="form-control" id="inputQuantity" name="inputQuantity" placeholder="0">
                        </div>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="row">
                        <label for="inputSqft" class="col-sm-4 col-form-label">Sqft: </label>
                        <div class="col-sm-8">
                          <input type="number" min="0" class="form-control" id="inputSqft" name="inputSqft" placeholder="0">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="form-group row">
                  <div class="col-sm-12 text-end">
                    <button class="btn btn-primary" id="modal-save-btn">Save</button>
                  </div>
                </div>
              

            </div>
        </div>
    </div>
</div>
<div class="modal-backdrop fade show" id="backdrop" style="display: none;"></div>
  </div>`;
}

const navQueries = (companyName, isMasterUser, isParentCompany, warehouseIDs) => {
    return`<nav class="navbar navbar-expand-lg p-3 navbar-light bg-white nav-style">
    <div class="container-fluid">
      <a class="navbar-brand bg-dark text-white px-3 pt-3 pb-3" href="/">${companyName.toUpperCase()}</a>
      <div class="d-flex justify-content-evenly">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            ${isMasterUser ? 
                (`<li class="nav-item">
                    <a class="nav-link active" href="#">Hi ${companyName}</a>
                </li>`)
            :
                (`<li class="nav-item">
                    <a class="nav-link active" id="newProductbtn" data-id=${warehouseIDs} href="#" >New Product</a>
                </li>`)
            }  
        
          <li class="nav-item">
            <a class="nav-link active" href="/api/company/logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>`
}

const navGenInit = ({ companyName, isMasterUser=false, isParentCompany=false, warehouse=[] }) => {
    // console.log("in navGen", companyName, isMasterUser, isParentCompany, warehouse);

    let warehouseIDs = [];
    warehouse.forEach(data => {
      warehouseIDs.push(data._id);
    })

    // console.log(warehouseIDs.join(","));

    document.getElementById('navBar-gen').innerHTML = navQueries(companyName, isMasterUser, isParentCompany, warehouseIDs.join(",")) + modalQuery(warehouse);
}