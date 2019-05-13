import isOwner from '../../../helpers/isOwner';

const user = {
  username: 'testuser',
  token: 'testtoken',
};

localStorage.setItem('user', JSON.stringify(user));

describe('is owner function', () => {
  it('should return true', () => {
    const response = isOwner('testuser');
    expect(response).toEqual(true);
  });
  it('should return false', () => {
    const response = isOwner('testus');
    expect(response).toEqual(false);
  });
});
