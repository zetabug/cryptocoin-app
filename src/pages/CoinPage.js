import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './coinpage.css'


const CoinPage = () => {
  const params = useParams();
  const [coin,setCoin] = useState()
  const [error,setError] = useState()
  const { id } = params;

  const baseURL = `https://api.coingecko.com/api/v3/coins/${id}?market_data=true`

  useEffect(() => {
   axios.get(baseURL).then((response)=>{
    setCoin(response.data)
   }).catch((error)=>{
    setError(error)
   })
  }, [baseURL])
  
  if (error) return `Error: ${error.message}`;
  if (!coin) return "No post!"


  return (
    <>
      <h2 style={{ textAlign: 'center', marginBlock: '30px' }}>Crypto Apex</h2>

       <div className='new-container'>
         <div className="info-section">
           <div className="left">
             <img src={coin.image.large} alt="" width={'100px'} />
             <h1>{coin.name}</h1>
      
      
             <h3>Rank : {coin.market_cap_rank}</h3>
             <h3>Current Price : ${coin.market_data.current_price.usd.toLocaleString("en-US")}</h3>
             <h3>High(24h) : ${coin.market_data.high_24h.usd.toLocaleString("en-US")}</h3>
             <h3>Low(24h) : ${coin.market_data.low_24h.usd.toLocaleString("en-US")}</h3>

           </div>
      
           <div className="right">
             <strong>Description : </strong> <br /><br />
             <div dangerouslySetInnerHTML={{ __html: coin.description.en }} />
           </div>
         </div>
       </div>
    </>
  )
}

export default CoinPage