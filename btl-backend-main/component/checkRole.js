const coutDownroleUser = (roleUser) => {
    if(roleUser == "A1"){
        return "A2";
    }else if(roleUser == "A2"){
        return "A3"
    }else if(roleUser == "A3"){
        return "B1"
    }else{
        return "B2"
    }
}

module.exports = coutDownroleUser();