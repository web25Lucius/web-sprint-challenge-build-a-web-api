// Write your "projects" router here!
const express = require("express")
const projects = require("./projects-model")

const router = express.Router()
// router.use(express.json()) on index.js

router.get("/api/projects", (req, res) => {
//returns an array of projects (or an empty array) as the body of the response.
    projects.get(req.query)
    .then((projects) => {
        res.status(200).json(projects)
    })
    .catch((error) => {
        console.log(`Error: ${error}`)
        res.status(500).json({
            message: "Error retreiving list of projects. Please contact your administrator or try again."
        })
    })

})

router.get("/api/projects/:id", (req, res) => {
//returns a project with the given `id` as the body of the _response_
    projects.get(req.params.id)
        .then((projects) => {
            if (projects) {
             res.status(200).json(projects)
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

router.get("/api/projects/:id/actions", (req, res) => {
    // add an endpoint for retrieving the list of actions for a project
    if (!req.body.project_id) {
        return res.status(400).json({
            message: "Project not found. Please check project id and try again."
        })
    }  

    projects.getProjectActions(req.params.id, req.body)
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

router.post("/api/projects", (req, res) => {
// returns the newly created project as the body of the _response_
   projects.insert()
   .then((projects) => {
    if(!req.body.text) {
        res.status(400).json({
            message: "Text required to post. Please try again.",
        })
    } else {
        res.status(201).json(projects)
    }
   })
})

router.put("/api/projects/:id", (req, res) => {
//returns the updated project as the body of the _response_
    projects.update(req.id.params, req.body)
        .then((projects) => {
            if (projects) {
              res.status(200).json(projects)
            } else {
                res.status(400).json({
                    message: "Project not found. Please try again or contact your administrator.",
                })
            }
        })

})

router.delete("/api/projects/:id", (req, res) => {
//returns no _response_ body
    projects.remove(req.params.id)
        .then((projects) => {
            if (!projects) {
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