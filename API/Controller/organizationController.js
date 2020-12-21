const orgModal = require('../Model/orgModal');

exports.getOrgList = (req, res) => {
    // console.log('Get All Employee')
    orgModal.getList((err, user) => {
        console.log('user', user)
        if (err) 
            resp.send(err);
            console.log('user', user)
            res.send(user)
        
    })
}

//add organisation

exports.createNewOrg = (req, res) => {
    // console.log('create new user', req.body)
    const body = req.body;
    console.log('body', body)
    const companyData = new orgModal(req.body)
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({ success:'false', message:'Please Enter Details'})
    } else {
        orgModal.addOrg(companyData, (err, user) => {
          if (err) {
            res.send({status: false, message:'something went wrong'})
          } else {
              res.send({status: true, message:'inserted successfully'})
          }
        })
    }
}
