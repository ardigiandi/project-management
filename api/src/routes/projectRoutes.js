import {Router} from 'express'
import { createProject } from '../controllers/projectsController.js'

const route = Router()

route.post('/', createProject)

export default route