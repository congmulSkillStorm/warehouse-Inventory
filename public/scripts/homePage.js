const warehouseHTMLquery = (warehouseData) => {
    let allqueries = "";

    warehouseData.forEach(warehouse => {
        allqueries += `<div class="row collapse-box-warehouse">
        <div class="col-3 warehouse-name">
          <p>
            ${warehouse.warehouseName} :
          </p> 
        </div>
        <div class="col-9 fixed-height-chart">
          <div class="capacity-ft">${warehouse.currentCapacity} <span>ft</span> available of ${warehouse.maxCapacity} <span>ft</span></div>
          <canvas id="chart-${warehouse._id}"></canvas>
        </div>
      </div>`
    })
//     let query = `<div class="row collapse-box-warehouse">
//     <div class="col-3 warehouse-name">
//       <p>
//         Warehouse name :
//       </p> 
//     </div>
//     <div class="col-9 fixed-height-chart">
//       <div class="capacity-ft">2040 <span>ft</span> available of 5000 <span>ft</span></div>
//       <canvas id="myChart02"></canvas>
//     </div>
//   </div>`

  return allqueries;
}

const childCompanyHTMLquery = (companyData) => {
    console.log(companyData, 'in childCOmpanyHTMLquery func')
    return `
<article>
  <h1>${companyData.companyName}</h1>
  <div class="companies-status">
      <div>
        <h3>Warehouse: ${companyData.warehouse.length} <a  data-bs-toggle="collapse" href="#collapse-${companyData.companyName}"><i class="fas fa-caret-down"></i></a></h3>
      </div>
      <div class="">
        <div class="collapse capacity-status" id="collapse-${companyData.companyName}">
          <div class="container collapse-box">
            
            ${warehouseHTMLquery(companyData.warehouseBasicInfo)}

          </div>
        </div>
      </div>
      <div>
        <h3>Location: ${companyData.location || 'Washington'}</h3>
      </div>
  </div>
</article>`
} 

function displayAllChildCompanies(childCompanies) {
    console.log(childCompanies);
    let allQueries = "";
    childCompanies.childCompany.forEach(company => {
        allQueries += childCompanyHTMLquery(company);
    })
    return allQueries;
}

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const childCompanies = await API.getChildCompanies();
        console.log(childCompanies);
        const allCompanyQuery = displayAllChildCompanies(childCompanies[0]);
        document.getElementById('display-child-company').innerHTML = allCompanyQuery;
    }catch(err) {
        console.error(err);
    }
});
