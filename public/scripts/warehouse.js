const warehouseOnchange = async (event) => {
    // console.log(event.target.value);
    const warehouseId = event.target.value;

    const warehouseData = await API.getWarehouse(warehouseId)
    // console.log("in Warehouse on click", warehouseData)

    // Change warehouseName & id in Dataset
    document.getElementById('warehouse-header-title').innerText = warehouseData[0].warehouseName;
    document.getElementById('warehouse-header-address').innerText = warehouseData[0].address;
    document.getElementById('display-warehouse-name').dataset.warehouseId = warehouseData[0]._id;

    // Dispaly Product Table
    if(warehouseData[0].product.length > 0){
        document.getElementById('display-product-table').innerHTML = productTable(warehouseData[0].product);
    }else{
      document.getElementById('display-product-table').innerHTML = productTable([]);
    }
    // Watch if products are checked to delete on product list // scripts/components/productDeleteBar.js
    initWatchSelect();

    // To Update product on a warehouse.
    initUpdateModal();
}


const productTableBdoy = (productArr) => {
    let allQueries = "";

    productArr.forEach(product => {
      // console.log(product.color);
      // console.log(product.price);
      // console.log(product.quantity);
      // console.log(product.sqft);
        allQueries += `<tr class="product-tbody-row align-middle" data-product-id=${product._id}>
        <td class="table-check-box"> <input type="checkbox" data-id=${product._id} class="select-product-delete"></td>
        <td class="open-update-modal">${product.productName}</td>
        <td class="table-center open-update-modal">${product.color}</td>
        <td class="table-center open-update-modal">$${NumberComma(product.price)}</td>
        <td class="table-center open-update-modal">${product.quantity}</td>
        <td class="table-center open-update-modal">${product.sqft}</td>
      </tr>`;
    })

    return allQueries;
}

const productTableHeader = () => {
    return `<thead>
    <tr class="thead-title">
      <th scope="col"></th>
      <th scope="col" class="col-8">Product</th>
      <th class="table-center" scope="col">Color</th>
      <th class="table-center" scope="col">Price</th>
      <th class="table-center" scope="col">Quantity</th>
      <th class="table-center" scope="col">Sqft</th>
    </tr>
  </thead>`;
}

const productTable = (productArr) => {
    return `
    ${productTableHeader()}
    <tbody>
    ${productTableBdoy(productArr)}
    </tbody>
    `;

}

const createSelectOptions = (warehouseArr) =>{
    let allQueries = "";

    warehouseArr.forEach(warehouse => {
        allQueries += `<option value=${warehouse._id}>${warehouse.warehouseName}</option>`;
    })

    return allQueries;
}

const productHeader = (warehouseArr) => {
    return `
    <article class="m-3 row">
    <div class="col-8">
      <div class="row">
        <h3><span id="warehouse-header-title">${warehouseArr[0].warehouseName}</span>\'s Inventory</h3>
      </div>
      <div class="row">  
        <p><i class="fas fa-map-marker-alt"></i> <span id="warehouse-header-address"> ${warehouseArr[0].address}</span></p>
      </div>
      
    </div>
    <div class="col-4">
      <select class="form-select form-select-sm mb-3" id="selector-warehouse-onwarehousepage" aria-label=".form-select-lg example">
        <option selected>Choose warehouse</option>
        ${createSelectOptions(warehouseArr)}
      </select>
    </div>
 </article>
    `
}

const calculatePercentage = (currentCapacity, maxCapacity) => {
    let used = ((currentCapacity / maxCapacity) * 100).toFixed(2);
    let available = (100 - used).toFixed(2);

    return { used, available}
}

const displayGraph = (warehouse) => {

    let percentages = calculatePercentage(warehouse.currentCapacity, warehouse.maxCapacity)
    // console.log(percentages);
    const labels = [
        `${warehouse.warehouseName}`
      ];
      const data = {
        labels: labels,
        datasets: [
          {
          label: 'Used',
          backgroundColor: 'rgb(255, 99, 132)',
          data: [percentages.used],
        },
        {
          label: 'Available',
          backgroundColor: 'rgb(230, 230, 230)',
          data: [percentages.available],
        },
      ]
      };
      const config = {
        type: 'bar',
        data: data,
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          scales: {
              x: {
                  display: false,
                  stacked: true
              },
              y: {
                  display: false,
                  stacked: true
              }
          },
          plugins: {
            legend: {
              align: 'end',
              display: false
            },
            tooltip: {
              callbacks: {
                  label: function(context) {
                    let myLabel = context['dataset']['label']+': ' + context['raw'] + '%';
                    return myLabel;
                  },

                  title: function(context) {
                    return;
                  }
              },
              titleMarginBottom: 0
            }
          }

        }
      };

      return new Chart(
        document.getElementById(`chart-${warehouse._id}`),
        config
      );
}

function warehouseHTMLquery(warehouseBasicInfo){
    let allqueries = "";
    warehouseBasicInfo.forEach(warehouse => {
        allqueries += `<div class="row collapse-box-warehouse">
        <div class="col-3 warehouse-name">
          <p>
            ${warehouse.warehouseName} :
          </p> 
        </div>
        <div class="col-9 fixed-height-chart">
          <div class="capacity-ft">${warehouse.maxCapacity - warehouse.currentCapacity} <span>ft</span> available of ${warehouse.maxCapacity} <span>ft</span></div>
          <canvas id="chart-${warehouse._id}"></canvas>
        </div>
      </div>`
    });

    return allqueries;
}

function displayAllwarehouse(companyData) {
    return`
    <article>
  <h1 class="childcompany-btn" data-id=${companyData._id}>${companyData.companyName}</h1>
  <div class="companies-status">
      <div class="px-2">
        <h3>Warehouse: ${companyData.warehouse.length} </h3>
      </div>
      
      <div class="mx-2">
        <h3>Location: ${companyData.location || 'USA'}</h3>
      </div>
      <div class="myHr"></div>
      <div class="">
        <div class="capacity-status">
          <div class="container collapse-box">
            
            ${warehouseHTMLquery(companyData.warehouseBasicInfo)}

          </div>
        </div>
      </div>
  </div>
</article>`
}

window.addEventListener('DOMContentLoaded', async () => {
    const childCompanyId = location.search.split("=")[1];
    const childCompany = await API.getChildCompany(childCompanyId);
    // console.log(childCompany[0]);
    const allWarehouseQuery = displayAllwarehouse(childCompany[0]);
    document.getElementById('display-warehouse').innerHTML = allWarehouseQuery;

    childCompany[0].warehouseBasicInfo.forEach(warehouse => {
        // console.log(warehouse)
        displayGraph(warehouse);
    })

    // NavBar Generator from scripts/components
    navGenInit(childCompany[0]);

    // Display Product Header
    document.getElementById('display-warehouse-name').innerHTML = productHeader(childCompany[0].warehouse);
    // Set data-id for first warehouse.
    document.getElementById('display-warehouse-name').dataset.warehouseId = childCompany[0].warehouse[0]._id;

    // Dispaly Product Table
    if(childCompany[0].warehouse[0].product.length > 0){
        document.getElementById('display-product-table').innerHTML = productTable(childCompany[0].warehouse[0].product);
    }

    // To display Warehouse's Product depending on Selected option.
    const formSelector = document.getElementById('selector-warehouse-onwarehousepage');
    formSelector.onchange = warehouseOnchange;

    // To create new product on a warehouse.
    document.getElementById('newProductbtn').onclick = newProductOnclick;

    // To Update product on a warehouse.
    initUpdateModal();

    
    // Watch if products are checked to delete on product list // scripts/components/productDeleteBar.js
    initWatchSelect();


})