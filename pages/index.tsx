
import React, { useState } from "react";
import { useContract, useContractWrite,useBalance } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { ethers } from 'ethers';
import {TokenAddress,ContractAddress} from "../const/addresses";

const TotalSupply = 100000;

function App() {
    const { contract:tokenContract } = useContract(TokenAddress);
    const { mutateAsync: transferMatic,isLoading } = useContractWrite(tokenContract, "transfer");
    const [status, setStatus] = useState('initial'); // 'initial', 'sending', 'received'
    const [maticAmount, setMaticAmount] = useState('0.1'); // default to 0.1 MATIC


    const sendMatic = async () => {
        setStatus('sending');
        const amountToSend = maticAmount; // for example, 0.1 MATIC
        const ethers = require('ethers');
        const amountInWei = ethers.utils.parseEther(maticAmount);  // Convert 0.1 matic to wei
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        try{
            await signer.sendTransaction({
                to: ContractAddress,
                value: amountInWei
            });
            setStatus('received');
            //after 5 seconds, reset the status
            setTimeout(() => {
                setStatus('initial');
            }, 5000);
        }catch(error){
            console.log('Error sending MATIC', error);
            setStatus('initial');
        }
    };

    return (
      <div className={styles.appContainer}>
      <div className={styles.contentCenter}>
        <p className={styles.explanationText}>
        Welcome to our Halloween Special Project! By sending MATIC, you participate in our "Trick or Treat" game.
        </p>
        <p className={styles.addresses}>
        Smart Contract: <a href="url">{ContractAddress}</a>
        </p>
        <p className={styles.addresses}>
        Token Contract: <a href="url">{TokenAddress}</a>
        </p>
          <h1 className = {`${styles.textPopUpTop} ${styles.flicker1}`}>Trick or Treat</h1>
          <p> Send 0.1 MATIC or more to get a treat!</p>
          <p>Recieve up to 200,000 $PMPTKNS!</p>
          {status === 'initial' &&(
            // add a text input to allow users to enter the amount of MATIC they want to send
            <div>
            <input className={styles.inputBox}
              type="text"
              value={maticAmount}
              onChange={e => setMaticAmount(e.target.value)}
              placeholder="Enter MATIC amount"
            />
        
             <button className={`${styles.bigButton} ${styles.wobbleHorBottom}`} onClick={sendMatic} disabled={isLoading}>
             Send MATIC
            </button>
            </div>
          )}
          {status == 'sending' && <p> Sending MATIC.... Approve in your wallet</p>}
          {status == 'received' && <p> Tokens recieved!!! Check your wallet for your tokens.</p>}
      </div>
  </div>
    );
}

export default App;

