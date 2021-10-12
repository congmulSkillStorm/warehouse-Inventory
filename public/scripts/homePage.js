async function childCompanyOnClick(event) {
  // const childCompanyId = event.target.dataset.id;
  // location.search = "?id=" + childCompanyId;
  // document
  //     .querySelector("a[href='/warehouse?']")
  //     .setAttribute("href", `/warehouse?id=${childCompanyId}`);

  // const childCompany = await API.getChildCompany(childCompanyId);
  // console.log("childCompany", childCompany);
  // document.getElementById('warehousetest').innerText = childCompany[0].companyName;
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

  return allqueries;
}

const childCompanyHTMLquery = (companyData) => {
    // console.log(companyData, 'in childCOmpanyHTMLquery func')
    return `
<article>
  <a href="/warehouse?childCompanyId=${companyData._id}"> <h1 class="childcompany-btn" data-id=${companyData._id}>${companyData.companyName}</h1></a>
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
    // console.log(childCompanies);
    let allQueries = "";
    childCompanies.forEach(company => {
        allQueries += childCompanyHTMLquery(company);
    })
    return allQueries;
}

function init(childCompanies) {
  // console.log(childCompanies);
  const allCompanyQuery = displayAllChildCompanies(childCompanies);
  document.getElementById('display-child-company').innerHTML = allCompanyQuery;
  
  // Display Graph
  let allWarehouse = [];
  childCompanies.forEach(company => {
      if(company.warehouseBasicInfo.length > 0){
          allWarehouse = [...allWarehouse, ...company.warehouseBasicInfo];
      }
  }) 

  // console.log("allWarehouse", allWarehouse)
  allWarehouse.forEach(warehouse => {
      displayGraph(warehouse);
  })
}

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const childCompanies = await API.getChildCompanies();
        // console.log(childCompanies);
        // const allCompanyQuery = displayAllChildCompanies(childCompanies[0]);
        // document.getElementById('display-child-company').innerHTML = allCompanyQuery;


        // NavBar Generator from scripts/components
        navGenInit(childCompanies[0]);
        
        // // Display Graph
        // let allWarehouse = [];
        // childCompanies[0].childCompany.forEach(company => {
        //     if(company.warehouseBasicInfo.length > 0){
        //         allWarehouse = [...allWarehouse, ...company.warehouseBasicInfo];
        //     }
        // }) 

        // // console.log("allWarehouse", allWarehouse)
        // allWarehouse.forEach(warehouse => {
        //     displayGraph(warehouse);
        // })

        init(childCompanies[0].childCompany);

        // Active Search Function. script/components/searchFunction();
        searchFunction();

        // const childCompanybtnEl = document.getElementsByClassName('childcompany-btn');
        // for(let element of childCompanybtnEl){
        //   element.onclick = childCompanyOnClick;
        // }

        // Search Form
        document.getElementById('search-form-input').addEventListener("keyup", function(event){
          let userInput = document.getElementById('search-form-input').value;
          let originalChildCom = childCompanies[0].childCompany;
          let selectedChildCom = originalChildCom.filter(childCom => childCom.companyName.toLowerCase().includes(userInput));
          // console.log(selectedChildCom);
          init(selectedChildCom);
        })

    }catch(err) {
        console.error(err);
    }
});


