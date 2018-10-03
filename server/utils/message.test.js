const expect = require('expect');
let {generateMessage,generateLocationMessage}=require('./message');
describe('genearte Message',()=>{

    it('it should generate message right',()=>{
        let from = 'jen';
        let text='some message';
        let message= generateMessage(from,text);

        expect (message).toInclude({text,from})
        expect(message.createdAt).toBeA('number');
    });
});


describe('generate location message',()=>{
    it('should generate correct location',()=>{
        let from = 'deb';
        let latitude= 15;
        let longitude=19;
        let url =`https://www.google.com/maps?q=15,19`
        let message= generateLocationMessage(from,latitude,longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,url});
    });
});