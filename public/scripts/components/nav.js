const navQueries = (companyName, isMasterUser, isParentCompany, warehouseIDs) => {
    return`<nav class="navbar navbar-expand-lg p-3 navbar-light bg-white nav-style">
    <div class="container-fluid">
      <a class="navbar-brand bg-dark text-white px-3 pt-3 pb-3" href="/">${companyName.toUpperCase()}</a>
      <div class="d-flex justify-content-evenly">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            ${isMasterUser ? 
                (`<li class="nav-item">
                    <a class="nav-link active" href="#">New Company</a>
                </li>`)
            :
                (`<li class="nav-item">
                    <a class="nav-link active" id="newProductbtn" data-id=${warehouseIDs} href="#">New Product</a>
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
    console.log("in navGen", companyName, isMasterUser, isParentCompany, warehouse);

    let warehouseIDs = [];
    warehouse.forEach(data => {
      warehouseIDs.push(data._id);
    })

    console.log(warehouseIDs.join(","));

    document.getElementById('navBar-gen').innerHTML = navQueries(companyName, isMasterUser, isParentCompany, warehouseIDs.join(","))
}