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
            ${warehouse.warehouseName.split("-")[1]} :
          </p> 
        </div>
        <div class="col-9 fixed-height-chart">
          <div class="capacity-ft">${warehouse.currentCapacity} <span>ft</span> available of ${warehouse.maxCapacity} <span>ft</span></div>
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
      <div>
        <h3>Warehouse: ${companyData.warehouse.length} </h3>
      </div>
      <div>
        <h3>Location: ${companyData.location || 'Washington'}</h3>
      </div>
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
    console.log(childCompany[0]);
    const allWarehouseQuery = displayAllwarehouse(childCompany[0]);
    document.getElementById('display-warehouse').innerHTML = allWarehouseQuery;

    childCompany[0].warehouseBasicInfo.forEach(warehouse => {
        console.log(warehouse)
        displayGraph(warehouse);
    })
})