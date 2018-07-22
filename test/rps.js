var rps = artifacts.require("./rps.sol");

contract('rps', function(accounts) {

  var contract;

  // beforeEach(function() {
  //    return rps.new()
  //    .then(function(instance) {
  //       contract = instance;
  //    });
  // });

  it("...should store the value 89.", function() {
    let rpsInstance;
    return rps.deployed().then(function(instance) {
      rpsInstance = instance;
      debugger;
      return rpsInstance.register('scissors', { from: accounts[0], value: 2 });
    }).then(function() {
      return Promise.all([rpsInstance.getRegistered.call(), rpsInstance.balance(), rpsInstance.fee()]);
    }).then(function([registered, balance, fee]) {
      assert.equal(registered.length, 1, "Should have registered 1.");
      assert.equal(registered[0], accounts[0], "Should have registered account 0.");
      assert.equal(balance, 1, "Should have balance 1."); 
      assert.equal(fee, 1, "Should have balance 1.");
    });
  });

});
