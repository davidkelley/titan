const git = require('./git');

describe('A function', () => {
  it('is a function', () => {
    expect(git).toEqual(expect.any(Function));
  });
});
