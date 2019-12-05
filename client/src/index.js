import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Drizzle } from "drizzle";
import MyStringStore from "./contracts/MyStringStore.json";

const Web3 = require("web3");

//const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = 'clean bicycle nasty escape card inmate scorpion dragon cradle immune coast rookie';

const abi = [{"constant":true,"inputs":[],"name":"myString","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"x","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];

const provider = new Web3.providers.WebsocketProvider("wss://ropsten.infura.io/ws/a468ceeb8d374b00bed205d1d0e9d3b7");
const web3 = new Web3(provider);
const myStringStore = new web3.eth.Contract(abi, "0xf104FA1DEffF95b48D99ff66ddCA3C65d33D0002");
//const myStringStoreAt = myStringStore.at("0xf104FA1DEffF95b48D99ff66ddCA3C65d33D0002");

const options = {
    contracts: [MyStringStore],
  
    web3: {      
      fallback: {
        type: "ws",
        url: "wss://ropsten.infura.io/ws/a468ceeb8d374b00bed205d1d0e9d3b7"
        //url: "ws://127.0.0.1:8545",
      },
      
    },
  };

const drizzle = new Drizzle(options);

ReactDOM.render(<App drizzle={drizzle} contract={myStringStore} web3={web3}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
