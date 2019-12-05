import React from "react";

class SetString extends React.Component {
  state = { stackId: null, test: null, count: 0 };

  componentDidMount() {
    this.props.web3.eth.getTransactionCount("0x26106ce414a6353EB18c8aC01B17ff0647Db5989").then((count) => {
      this.setState({ count: count });
    })
  }

  handleKeyDown = e => {
    // if the enter key is pressed, set the value with the string
    if (e.keyCode === 13) {
      this.setValue(e.target.value);
    }
  };

  setValue = value => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.MyStringStore;

    // let drizzle know we want to call the `set` method with `value`
    //const stackId = contract.methods.set.cacheSend(value, {from: "0x26106ce414a6353EB18c8aC01B17ff0647Db5989"});

    const tx = {
      // this could be provider.addresses[0] if it exists
      from: "0x26106ce414a6353EB18c8aC01B17ff0647Db5989", 
      // target address, this could be a smart contract address
      to: this.props.contract.options.address, 
      // optional if you want to specify the gas limit 
      gas: 60000,
      nonce: this.state.count, 
      // optional if you are invoking say a payable function 
      //value: value,
      // this encodes the ABI of the method and the arguements
      data: this.props.contract.methods.set(value).encodeABI() 
    };

    this.props.web3.eth.accounts.signTransaction(tx, "475802FA6E0826A6456FC44F364E98CFDA435B6E213FF171BA55559F744CEB00").then((signedTx) => {  // raw transaction string may be available in .raw or 
      // .rawTransaction depending on which signTransaction
      // function was called
      console.log("transaction sent");
      const sentTx = this.props.web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);  
      
      sentTx.on("receipt", receipt => {
        console.log(receipt)
      });
      sentTx.on("error", err => {
        console.log("error" + err);
      });
    }).catch((err) => {
      console.log(err);
    });

    //const datakey = this.props.contract.methods.set(value).buildTransaction();
    /*
    const stackId = contract.methods["set"].cacheSend(value, {
      from: "0x26106ce414a6353EB18c8aC01B17ff0647Db5989"
    });
    */

    // save the `stackId` for later reference
    //this.setState({ stackId: datakey });
  };

  getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props.drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
  };

  render() {
    return (
      <div>
        <input type="text" onKeyDown={this.handleKeyDown} />
        <div>{this.getTxStatus()}</div>
        {console.log(this.state.count)}
      </div>
    );
  }
}

export default SetString;
