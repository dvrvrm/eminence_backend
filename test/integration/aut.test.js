const { createJSONToken } = require('../../util/auth'); 
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('createJSONToken', () => {
  const user = { _id: 'someUserId', email: 'test@example.com' };
  const {JWT_SECRET} = require("../../config/credentials");

  it('should call jsonwebtoken.sign with correct parameters', () => {
    createJSONToken(user);
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
  });

  it('should return a valid JSON Web Token', () => {
    jwt.sign.mockReturnValue('dummyToken');
    const result = createJSONToken(user);
    expect(result).toBe('dummyToken');
  });
});
