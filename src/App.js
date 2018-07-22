// import React, { Component } from 'react'
// import rps from '../build/contracts/rps.json'
// import getWeb3 from './utils/getWeb3'

// import './css/oswald.css'
// import './css/open-sans.css'
// import './css/pure-min.css'
// import './App.css'

// class App extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       storageValue: 0,
//       web3: null,
//       accounts: []
//     }
//   }

//   componentWillMount() {
//     // Get network provider and web3 instance.
//     // See utils/getWeb3 for more info.

//     getWeb3
//     .then(results => {
//       this.setState({
//         web3: results.web3
//       })

//       // Instantiate contract once web3 provided.
//       this.instantiateContract()
//     })
//     .catch(() => {
//       console.log('Error finding web3.')
//     })
//   }

//   instantiateContract() {
//     /*
//      * SMART CONTRACT EXAMPLE
//      *
//      * Normally these functions would be called in the context of a
//      * state management library, but for convenience I've placed them here.
//      */

//     const contract = require('truffle-contract')
//     const rps = contract(rps)
//     rps.setProvider(this.state.web3.currentProvider)

//     // Declaring this for later so we can chain functions on rps.s
//     var rpsInstance

//     // Get accounts.
//     this.state.web3.eth.getAccounts((error, accounts) => {
//       this.setState(accounts);
//       rps.deployed().then((instance) => {
//         rpsInstance = instance

//         // Stores a given value, 5 by default.
//         return rpsInstance.set(2, {from: accounts[0]})
//       }).then((result) => {
//         // Get the value from the contract to prove it worked.
//         return rpsInstance.get.call(accounts[0])
//       }).then((result) => {
//         // Update state with the result.
//         return this.setState({ storageValue: result.c[0] })
//       })
//     })
//   }

//   onGame() {

//   }

//   handleChange = (player) => {
//     this.setState({ player: player });
//   };

//   renderAccount(account) {
//     return <option >
//       account.address
//     </option>;
//   }

//   renderAccounts() {
//     return <select onChange={this.handleChange}>
//       this.state.accounts.map(a => renderAccount)
//     </select>;
//   }

//   handleGameOptionChange(playerChoice) {
//     this.setState({ player: playerChoice });
//   }

//   renderGameOption(name) {
//     <option key={name} value={name}>
//       {name}
//     </option>
//   }

//   renderGameOptions() {
//     <select onChange={this.handleGameOptionChange}>
//       {['rock', 'scissor', 'paper'].map(this.renderGameOption)}
//     </select>;    
//   }

//   render() {
//     return (
//       <div className="App">
//         <nav className="navbar pure-menu pure-menu-horizontal">
//             <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
//         </nav>
//         <button
//           className="btn btn-default"
//           onClick={this.props.createGame}>Create game</button>
//         <button
//           className="btn btn-default"
//           onClick={this.props.finishGame}>Finish game</button>
//         <main className="container">
//           <div className="pure-g">
//             <div className="pure-u-1-1">
//               {this.renderGameOptions()}
//               {this.renderAccounts()}
//               <button
//                 className="btn btn-default"
//                 onClick={this.props.play}>Play</button>
//             </div>
//           </div>
//         </main>
//       </div>
//     );
//   }
// }

// export default App
