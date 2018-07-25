var rps = artifacts.require("./rps.sol");

contract('rps', function(accounts) {

  const owner = accounts[9];
  const player1 = accounts[0];
  const player2 = accounts[1];

  
  it("Should have owner.", async function() {
    const rpsInstance = await rps.deployed();
    const ownerActual = await rpsInstance.owner();
    assert.equal(ownerActual, owner, "Should have owner."); 
  });
  
  it("Should register one account.", async function() {
    const rpsInstance = await rps.deployed();
    await rpsInstance.register('rock', { from: player1, value: 2 });
    const [registered, balance] = await Promise.all([rpsInstance.getRegistered.call(), rpsInstance.gameBalance()]);
    const contractBalance = await web3.eth.getBalance(rpsInstance.address);
    assert.equal(registered.length, 1, "Should have registered 1.");
    assert.equal(registered[0], accounts[0], "Should have registered account 0.");
    assert.equal(balance, 1, "Should have balance 1."); 
    assert.equal(contractBalance, 2, "Should have contract balance 2.");
  });

  it("Should add second account.", async function() {
    const rpsInstance = await rps.deployed();
    await rpsInstance.register('scissors', { from: player2, value: 2 });
    const [registered, balance] = await Promise.all([rpsInstance.getRegistered.call(), rpsInstance.gameBalance()]);
    const contractBalance = await web3.eth.getBalance(rpsInstance.address);
    assert.equal(registered.length, 2, "Should have registered 2.");
    assert.equal(registered[1], player2, "Should have registered account 1.");
    assert.equal(balance, 2, "Should have balance 2.");
    assert.equal(contractBalance, 4, "Should have contract balance 4.");
  });

  it("Play.", async function() {
    const rpsInstance = await rps.deployed();

    const player1BalanceBefore = await web3.eth.getBalance(player1);
    const player2BalanceBefore = await web3.eth.getBalance(player2);

    await rpsInstance.play({ from: owner });
    const gameBalance =  await rpsInstance.gameBalance();
    const player1BalanceAfter = await web3.eth.getBalance(player1);
    const player2BalanceAfter = await web3.eth.getBalance(player2);
    assert.equal(gameBalance, 0, 'game balance should be reseted');
    assert.equal(player1BalanceBefore.plus(2).toString(10), player1BalanceAfter.toString(10), 'should assign game balance to winner')
    assert.equal(player2BalanceBefore.toString(10), player2BalanceAfter.toString(10), 'should not transfer anythi')
  });
});
