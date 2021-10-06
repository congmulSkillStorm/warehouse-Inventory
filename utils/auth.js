const withParentCompany = (req, res, next) => {
    console.log(req.session.companyId);
    if(!req.session.loggedIn){
        res.redirect("/");
    }

    if (!req.session.isParentCompany) {
      res.redirect("/warehouse");
    } else {
      next();
    }
};

const withLoggedId = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect("/");
    } else {
        next();
    }
}

const withLoggedIdForloginPage = (req, res, next) => {
    if (req.session.loggedIn) {
        res.redirect("/home");
    }else{
        next();
    }
}
  
export {
    withParentCompany,
    withLoggedId,
    withLoggedIdForloginPage
};