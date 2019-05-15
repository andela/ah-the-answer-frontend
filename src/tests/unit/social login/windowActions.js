const goodRes = {
  status: {
    signed_in : true,
  },
  id_token: 'adfadsfasdfsdf',
  error: false,
};

window.gapi = {
  auth: {
    signIn: jest.fn(),
  },
  client: {
    load: jest.fn()
  }

};
window.OAuth = {
  initialize : jest.fn(),
  popup: jest.fn().mockImplementation(() => {
    return new Promise(resolve => {
        jest.fn()
    })
  })
};
window.fbAsyncInit = {};
window.FB = {
  init: jest.fn(),
  login: jest.fn()
};
