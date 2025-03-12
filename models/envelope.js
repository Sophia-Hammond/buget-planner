// simulating a database in-memory till database is designed and added //

let envelopes =[]; 

class envelopes {
    constructor(title, amount) {
        this.id = envelopes.length + 1;
        this.title = title;
        this.amount = amount;
    };


static createEnvelope(title, amount) {
    const newEnvelope = new envelopes(title, amount);
    envelopes.push(newEnvelope);
    return newEnvelope;
};

static getAllEnvelopes() {
    return envelopes;
};

static getTotalBudget() {
    return envelopes.reduce((total, envelope) => total + envelope.amount, 0);
   };
 };

 module.exports = Envelope;

