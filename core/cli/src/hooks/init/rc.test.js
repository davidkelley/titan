const rc = require('./rc');

describe('A function', () => {
  it('is a function', () => {
    expect(rc).toEqual(expect.any(Function));
  });
});
