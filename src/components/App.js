import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import { ethers } from "ethers"
import { Spinner } from 'react-bootstrap'

import Navigation from './Navbar';
import Home from './Home.js'
//import Create from './Create.js'
//import MyListedItems from './MyListedItems.js'

// ABIs 
import NFT_ABI from '../abis/NFT.json'
import Market_ABI from '../abis/Marketplace.json'
import NFTAddress from '../abis/contractsData/NFT-address.json'
import MarketplaceAddress from '../abis/contractsData/Market-address.json'

// config
//import config from '../config.json';

import '../App.css';

function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [nft, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({})
  // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // Get signer
    const signer = provider.getSigner()

    loadContracts(signer)
  }
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(MarketplaceAddress.address, Market_ABI, signer)
    setMarketplace(marketplace)
    const nft = new ethers.Contract(NFTAddress.address, NFT_ABI, signer)
    setNFT(nft)
    setLoading(false)
  }
  return (
    <BrowserRouter>
      <div className="App">
      <Navigation web3Handler={web3Handler} account={account} />
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <Spinner animation="border" style={{ display: 'flex' }} />
            <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
          </div>
          ) : (
            <Routes>
              <Route path="/" element={
                <Home />
              } />
              <Route path="/create"  />
              <Route path="/my-listed-items" />
            </Routes>
          )}
      </div>
    </BrowserRouter>
  );
}

export default App;
