
const express = require("express")
const actions = require("./actions-model")

const router = express.Router()
// router.use(express.json()) on index.js

router.get("/api/actions", (req, res) => {
//returns an array of actions (or an empty array) as the body of the response.
    actions.get(req.query)
    .then((actions) => {
        res.status(200).json(actions)
    })
    .catch((error) => {
        console.log(`Error: ${error}`)
        res.status(500).json({
            message: "Error retreiving list of actions. Please contact your administrator or try again."
        })
    })

})

router.get("/api/actions/:id", (req, res) => {
//returns a project with the given `id` as the body of the _response_
    actions.get(req.params.id)
        .then((actions) => {
            if (actions) {
             res.status(200).json(actions)
            } else {
                res.status(404).json({
                    message: "Project not found. Please check id and try again."
                })
            }
        })
        .catch((error) => {
            console.log(`Error: ${error}`)
            res.status(500).json({
                message: "Error retrieving project. Please contact your administrator or try again.",
            })
        })


})

router.get("/api/actions/:id/actions", (req, res) => {
    // add an endpoint for retrieving the list of actions for a project
    if (!req.body.project_id) {
        return res.status(400).json({
            message: "Project not found. Please check project id and try again."
        })
    }  

    actions.getProjectActions(req.params.id, req.body)
        .then((actions) => {
            res.status(200).json(actions)
        })

        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error retrieving list of actions. Please contact your administrator or try agian.",
            })
        })

})

router.post("/api/actions", (req, res) => {
// returns the newly created project as the body of the _response_
   actions.insert()
   .then((actions) => {
    if(!req.body.text) {
        res.status(400).json({
            message: "Text required to post. Please try again.",
        })
    } else {
        res.status(201).json(actions)
    }
   })
})

router.put("/api/actions/:id", (req, res) => {
//returns the updated project as the body of the _response_
    actions.update(req.id.params, req.body)
        .then((actions) => {
            if (actions) {
              res.status(200).json(actions)
            } else {
                res.status(400).json({
                    message: "Action not found. Please try again or contact your administrator.",
                })
            }
        })

})

router.delete("/api/actions/:id", (req, res) => {
//returns no _response_ body
    actions.remove(req.params.id)
        .then((actions) => {
            if (!actions) {
                res.status(200).json({
                    message: "Request complete. Project has been deleted.",
                })
            } else {
                res.status(500).json({
                    message: "There was a problem deleting your project. Please contact your administrator or try again.",
                })
            }
        })

})

module.exports = router