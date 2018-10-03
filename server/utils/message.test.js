const expect = require('expect');
let {generateMessage}=require('./message');
describe('genearte Message',()=>{

    it('it should generate message right',()=>{
        let from = 'jen';
        let text='some message';
        let message= generateMessage(from,text);

        expect (message).toInclude({text,from})
        expect(message.createdAt).toBeA('number');
    });
})