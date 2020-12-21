const express = require('express')
const router = express.Router()
const organization = require('../Controller/organizationController')

router.get('/', organization.getOrgList)

// create new organization
router.post('/', organization.createNewOrg)

module.exports = router