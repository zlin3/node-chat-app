const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
  });
  var res = isRealString(100);
  expect(res).toBe(false);
  it('should reject empty string values', () => {
    var res = isRealString('         ');
    expect(res).toBe(false);
  });
  it('should accept valid string values', () => {
    var res = isRealString('  aaron lin  ');
    expect(res).toBe(true);
  });
});
