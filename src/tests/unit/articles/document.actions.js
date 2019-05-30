document = {
  getElementById : {
    style: {
      display: jest.fn()
    }
  },
  onmouseup : jest.fn(),
  getSelection: jest.fn().mockImplementation(() => {
    return {
      baseOffset: 1,
      extentOffset: 10,
      toString: jest.fn().mockReturnValue('there is some text here')
    }
  })
};
