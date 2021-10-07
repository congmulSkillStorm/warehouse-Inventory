const footerGen = () => {
    return`<footer class="footer mt-auto py-4 bg-light text-center">
    <div class="container">
      <span class="text-muted">© 2021 Jehyun Jung</span>
    </div>
    </footer>`
}


document.getElementsByClassName('footerGen')[0].innerHTML = footerGen();