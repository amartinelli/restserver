import { Login } from '.'

let login

beforeEach(async () => {
  login = await Login.create({ Nome: 'test', Email: 'test', Password: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = login.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(login.id)
    expect(view.Nome).toBe(login.Nome)
    expect(view.Email).toBe(login.Email)
    expect(view.Password).toBe(login.Password)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = login.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(login.id)
    expect(view.Nome).toBe(login.Nome)
    expect(view.Email).toBe(login.Email)
    expect(view.Password).toBe(login.Password)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
