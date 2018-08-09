const aws = require('./aws');

describe('A function', () => {
  it('is a function', () => {
    expect(aws).toEqual(expect.any(Function));
  });
});
