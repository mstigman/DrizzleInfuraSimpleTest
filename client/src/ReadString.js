import React from "react";

class ReadString extends React.Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.MyStringStore;

    // let drizzle know we want to watch the `myString` method
    //const dataKey = contract.methods["myString"].cacheCall();
    this.props.contract.methods.myString().call().then((promise) => {
      this.setState({dataKey: promise});
    });

    // save the `dataKey` to local component state for later reference
  }

  render() {
    // get the contract state from drizzleState
    const { MyStringStore } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const myString = MyStringStore.myString[this.state.dataKey];

    // if it exists, then we display its value
    return (
    <p>My stored string: {this.state.dataKey}</p>
    );
  }
}

export default ReadString;
