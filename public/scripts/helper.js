function NumberComma( num ) {
    // console.log("In currencyComma")
    var str = num.toString().split('.');
    // console.log(str);
    if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    // console.log(str);
    if(!str[1]){
        str[1] = '00';
    }
    return str.join('.');
  }