import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Login } from '.'

const app = () => express(routes)

let userSession, adminSession, login

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  login = await Login.create({})
})

test('POST /Logins 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: adminSession, Nome: 'test', Email: 'test', Password: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.Nome).toEqual('test')
  expect(body.Email).toEqual('test')
  expect(body.Password).toEqual('test')
})

test('POST /Logins 401 (user)', async () => {
  const { status } = await request(app())
    .post('/')
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /Logins 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /Logins 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /Logins 401 (user)', async () => {
  const { status } = await request(app())
    .get('/')
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /Logins 401', async () => {
  const { status } = await request(app())
    .get('/')
  expect(status).toBe(401)
})

test('GET /Logins/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${login.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(login.id)
})

test('GET /Logins/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /Logins/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`/${login.id}`)
    .send({ access_token: adminSession, Nome: 'test', Email: 'test', Password: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(login.id)
  expect(body.Nome).toEqual('test')
  expect(body.Email).toEqual('test')
  expect(body.Password).toEqual('test')
})

test('PUT /Logins/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`/${login.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /Logins/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${login.id}`)
  expect(status).toBe(401)
})

test('PUT /Logins/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: adminSession, Nome: 'test', Email: 'test', Password: 'test' })
  expect(status).toBe(404)
})

test('DELETE /Logins/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`/${login.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /Logins/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${login.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /Logins/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${login.id}`)
  expect(status).toBe(401)
})

test('DELETE /Logins/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
