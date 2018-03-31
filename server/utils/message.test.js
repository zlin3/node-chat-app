const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'Andy';
    var text = 'Hello guys!';
    var res = generateMessage(from, text);

    expect(res.createdAt).toBeA('number');
    expect(res).toInclude({from, text});
  });
});
