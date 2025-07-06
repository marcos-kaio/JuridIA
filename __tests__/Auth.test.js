// requireAuth.test.js
import { requireAuth } from './auth.js';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('requireAuth middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      header: jest.fn(),
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('retorna 401 se não houver header Authorization', () => {
    req.header.mockReturnValue(undefined);

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token não fornecido.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('retorna 401 se o formato do header for inválido', () => {
    req.header.mockReturnValue('Basic abc.def.ghi');

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Formato de token inválido.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('chama next() e define req.user quando o token é válido', () => {
    const fakeToken = 'valid.token.here';
    const payload = { userId: 123 };

    req.header.mockReturnValue(`Bearer ${fakeToken}`);
    jwt.verify.mockReturnValue(payload);

    requireAuth(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith(fakeToken, process.env.JWT_SECRET);
    expect(req.user).toEqual({ id: 123 });
    expect(next).toHaveBeenCalled();
  });

  it('retorna 401 se o token for inválido ou expirado', () => {
    const fakeToken = 'invalid.token';
    const error = new Error('jwt expired');

    req.header.mockReturnValue(`Bearer ${fakeToken}`);
    jwt.verify.mockImplementation(() => { throw error });

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ 'Token inválido ou expirado': error });
    expect(next).not.toHaveBeenCalled();
  });
});
