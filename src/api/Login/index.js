import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Login, { schema } from './model'

const router = new Router()
const { Nome, Email, Password } = schema.tree

/**
 * @api {post} /Logins Create login
 * @apiName CreateLogin
 * @apiGroup Login
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam Nome Login's Nome.
 * @apiParam Email Login's Email.
 * @apiParam Password Login's Password.
 * @apiSuccess {Object} login Login's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Login not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ Nome, Email, Password }),
  create)

/**
 * @api {get} /Logins Retrieve logins
 * @apiName RetrieveLogins
 * @apiGroup Login
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} logins List of logins.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /Logins/:id Retrieve login
 * @apiName RetrieveLogin
 * @apiGroup Login
 * @apiSuccess {Object} login Login's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Login not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /Logins/:id Update login
 * @apiName UpdateLogin
 * @apiGroup Login
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam Nome Login's Nome.
 * @apiParam Email Login's Email.
 * @apiParam Password Login's Password.
 * @apiSuccess {Object} login Login's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Login not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ Nome, Email, Password }),
  update)

/**
 * @api {delete} /Logins/:id Delete login
 * @apiName DeleteLogin
 * @apiGroup Login
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Login not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
