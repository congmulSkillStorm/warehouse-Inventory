// disable form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()


  document.getElementById('parentCompany-checkbox').addEventListener('click', (event) =>{
    let emailInputEl = document.getElementById('inputEmail-input');
    let inputCompanyNameEl = document.getElementById('inputCompanyName');
    
    if(event.target.dataset.ischecked === 'false'){
      event.target.dataset.ischecked = true;

      emailInputEl.style.display = "block";
      inputCompanyNameEl.value = "Skill Storm";
      inputCompanyNameEl.disabled = true;
    }else{
      event.target.dataset.ischecked = false;

      inputCompanyNameEl.value = "";
      inputCompanyNameEl.disabled = false;
      emailInputEl.style.display = "none";
     
    }
  })