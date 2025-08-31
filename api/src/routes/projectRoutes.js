import {Router} from 'express'
import { createProject, deleteProject, getAllProjects, updateProject } from '../controllers/projectsController.js'

const route = Router()

route.post('/', createProject)
route.get('/', getAllProjects)
route.put('/:projectId/update', updateProject)
route.delete("/:id/delete", deleteProject)

export default route