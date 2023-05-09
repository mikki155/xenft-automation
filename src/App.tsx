import { useState } from 'react';
import './App.css';
import Web3 from 'web3';
import Button from '@material/react-button';
import '@material/react-button/dist/button.css';
import React from 'react';
import { Divider } from "@fluentui/react-divider";

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {

let web3;

const [vmuState, setVmuState] = useState<number>(1);
const [durationState, setDurationState] = useState<number>(1);
const [tokenId, setTokenId] = useState<number>(1);
const [clicked, setClicked] = useState<boolean>(false);
const [status, setStatus] = useState<string>("idle");
const [claimBtn, setClaimBtn] = useState<boolean>(false);

// We are in the browser and MetaMask is running
web3 = new Web3(window.ethereum);
// Request MetaMask to enable itself
window.ethereum.enable();

const contractAddress = '0x0a252663DBCc0b073063D6420a40319e438Cfa59';
const contractAbi = JSON.parse('[{"inputs":[{"internalType":"address","name":"xenCrypto_","type":"address"},{"internalType":"uint256[]","name":"burnRates_","type":"uint256[]"},{"internalType":"uint256[]","name":"tokenLimits_","type":"uint256[]"},{"internalType":"uint256","name":"startBlockNumber_","type":"uint256"},{"internalType":"address","name":"forwarder_","type":"address"},{"internalType":"address","name":"royaltyReceiver_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"OperatorNotAllowed","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"address","name":"to","type":"address"}],"name":"EndTorrent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"xenContract","type":"address"},{"indexed":true,"internalType":"address","name":"tokenContract","type":"address"},{"indexed":false,"internalType":"uint256","name":"xenAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"Redeemed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"count","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"term","type":"uint256"}],"name":"StartTorrent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"AUTHORS","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BLACKOUT_TERM","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"COMMON_CATEGORY_COUNTER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LIMITED_CATEGORY_TIME_THRESHOLD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"OPERATOR_FILTER_REGISTRY","outputs":[{"internalType":"contract IOperatorFilterRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"POWER_GROUP_SIZE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ROYALTY_BP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SPECIAL_CATEGORIES_VMU_THRESHOLD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trustedForwarder","type":"address"}],"name":"addForwarder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"bulkClaimMintReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"count","type":"uint256"},{"internalType":"uint256","name":"term","type":"uint256"}],"name":"bulkClaimRank","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"count","type":"uint256"},{"internalType":"uint256","name":"term","type":"uint256"},{"internalType":"uint256","name":"burning","type":"uint256"}],"name":"bulkClaimRankLimited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"callClaimMintReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"term","type":"uint256"}],"name":"callClaimRank","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"genesisTs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"isApex","outputs":[{"internalType":"bool","name":"apex","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"}],"name":"isTrustedForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"mintInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"burned","type":"uint256"}],"name":"onTokenBurned","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"ownedTokens","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"powerDown","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"salePrice","type":"uint256"}],"name":"royaltyInfo","outputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"royaltyAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"specialClassesBurnRates","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"specialClassesCounters","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"specialClassesTokenLimits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startBlockNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenIdCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"vmuCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"xenBurned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"xenCrypto","outputs":[{"internalType":"contract XENCrypto","name":"","type":"address"}],"stateMutability":"view","type":"function"}]')

const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);

async function mintXenfts(count, term) {
    const accounts = await web3.eth.getAccounts();
    setStatus("bulk claiming rank for account: " + accounts[0]);
    const result = await contractInstance.methods.bulkClaimRank(count, term).send({
    from: accounts[0],
  });
  setStatus("Finished claiming, transaction hash: " + result.transactionHash);
  await mintXenfts(count, term);
}

async function claimXenfts(tokenId) {
  const accounts = await web3.eth.getAccounts();
  setStatus("bulk minting for account: " + accounts[0] + ", with token ID: " + tokenId);
  const result = await contractInstance.methods.bulkClaimMintReward(tokenId, accounts[0]).send({
    from: accounts[0],
  });
  setTokenId(tokenId-1);
  await claimXenfts(tokenId);
}

  return (
    <div className="App">
      <div className='title'>This is an automated protocol for minting XENFTs</div>
      How many VMUs do you want? (max 128)
      <input 
        type="number"
        min="1"
        max="128"
        onInput={(e) => setVmuState(parseInt(e.currentTarget.value))}
        value={vmuState}
      />
      What is the duration of the mints? (max 440 days)
      <input 
        type="number"
        min="1"
        max="440"
        onInput={(e) => setDurationState(parseInt(e.currentTarget.value))}
        value={durationState}
      />
     <Button raised disabled={clicked} onClick={() => {
      setClicked(true);
      setStatus("starting infinite minting protocol");
      mintXenfts(vmuState, durationState)
    }}>
        {clicked ? 'Running' : 'Start'}
      </Button>

      <div className='divider-padding'>
        <Divider />
      </div>

      <div className='mint-title'>
        Use the protocol below to automatically claim XENFTs *some transactions will likely fail and you'll need to refresh the page*
      </div>
      Input the TokenId of your highest claimable XENFT
      <input
        type="number"
        min="1"
        onInput={(e) => setTokenId(parseInt(e.currentTarget.value))}
        value={tokenId}
      />
      <Button raised disabled={claimBtn} onClick={() => {
        setClaimBtn(true);
        setStatus("starting mint protocol");
        claimXenfts(tokenId);
      }}>
        {claimBtn ? 'Running' : 'Start'}
      </Button>
      
      <div className='divider-padding'>
        <Divider />
      </div>
      
      <div className="status-title">
        Status:
      </div>
      <div className='status'>{status}</div>
    </div>
  );
}

export default App;
