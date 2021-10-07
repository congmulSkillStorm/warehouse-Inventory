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
    const emailInputQuery = `<label for="inputEmail" class="col-form-label">Email address</label>
    <input type="email" class="form-control" id="inputEmail" name="inputEmail" required>
    <div class="valid-feedback">
      Looks good!
    </div>
    <div class="invalid-feedback">
      Please enter a email.
    </div>`
    
    let emailInputEl = document.getElementById('inputEmail-input');
    let inputCompanyNameEl = document.getElementById('inputCompanyName');
    
    if(event.target.dataset.ischecked === 'false'){
      event.target.dataset.ischecked = true;

      emailInputEl.innerHTML = emailInputQuery;
      inputCompanyNameEl.value = "Skill Storm";
      inputCompanyNameEl.disabled = true;
    }else{
      event.target.dataset.ischecked = false;

      inputCompanyNameEl.value = "";
      inputCompanyNameEl.disabled = false;
      emailInputEl.innerHTML= "";
     
    }
  })