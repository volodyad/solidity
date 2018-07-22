// simple rock paper scissors game on ethereum in a very naive implementation, just to showcase some basic features of Solidity
pragma solidity 0.4.24;

contract rps{
    mapping (string => mapping(string => int)) payoffMatrix;
    uint ownerBalance;
    uint public balance = 0;
    uint public fee = 1 wei;
    uint bid = 2 wei;
    address public owner;
    address[] public registeredPlayersAddresses;

    function getBalance() public returns(uint) {
        return balance;
    }

    function getRegistered() public returns(address[]) {
        return registeredPlayersAddresses;
    }

    mapping (address => Player) public players;
    struct Player {
        uint bid;
        Choice choice;
    }
    enum State { Active, Inactive }
    
    enum Choice { None, Scissor, Rock }

    constructor() {
        owner = msg.sender;
       // registeredPlayersAddresses.push(owner);
    }

    modifier ownerOnly {
        require(msg.sender == owner, "Should be owner only");
        _;
    }

    modifier notRegisteredYet
    {
        require(players[msg.sender].bid == 0, "User already registered");
        _;
    }
    
    modifier sentEnoughCash()
    {
        require(msg.value == bid, "Incorrect bid, shoud be 2 wei");
        _;
    }

    function stringToChoice(string choice) private pure returns (Choice) {
        if(compareStringsbyBytes(choice, "rock")) {
            return Choice.Rock;
        }
        else if(compareStringsbyBytes(choice, "scissors")) {
            return Choice.Scissor;
        }
        else return Choice.None;
    }
    
    function getWinnersCount() view private returns (uint) {
        uint winnerCount = 0;
        for (uint i=0; i<registeredPlayersAddresses.length; i++) {
            address playerAddress = registeredPlayersAddresses[i];
            if(players[playerAddress].choice == Choice.Scissor) {
                winnerCount++;
            }  
        }
        return winnerCount;
    }
    
    function play() public {
        // for simplicity we just have rock and scissor - and return money only for winners
        // do not ask me why anyone would take scissor
        // draw considered as lose
      
        uint winnersCount = getWinnersCount();
        
        uint share = balance / winnersCount;
        for (uint j=0; j<registeredPlayersAddresses.length; j++) {
            address playerAddress = registeredPlayersAddresses[j];
            if(players[playerAddress].choice == Choice.Scissor) {
                playerAddress.transfer(share);
                balance -= share;
            }  
        }
        
        // add some undevided token to owner
        ownerBalance += balance;
        balance = 0;
    }

    function register(string choiceStr) public payable
         sentEnoughCash
         notRegisteredYet  
    {
        Choice choice = stringToChoice(choiceStr);
        require(choice != Choice.None, "choice should be rock or scissor");
        registeredPlayersAddresses.push(msg.sender);
        Player memory player = Player(msg.value, choice);
        players[msg.sender] = player;
        ownerBalance += fee;
        balance += msg.value - fee;
    }
    
    function withdraw() ownerOnly public returns(bool) {
        owner.transfer(ownerBalance);
        ownerBalance = 0;
    }
    
    function compareStringsbyBytes(string s1, string s2) public pure returns(bool){
        return keccak256(s1) == keccak256(s2);
    }
}