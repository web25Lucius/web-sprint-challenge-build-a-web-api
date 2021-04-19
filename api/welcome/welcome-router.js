const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.json({
        message: "Welcome to Projects-Projects-Projects...and actions",
    })
})

module.exports = router