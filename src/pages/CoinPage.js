import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './coinpage.css'


const CoinPage = () => {
  const [mc,setMc] = useState('')
  const [price,setPrice] = useState('')
  const [desc, setDesc] = useState("")
  const [icon, setIcon] = useState('')
  const [name, setName] = useState('')
  const [rank, setRank] = useState('')

  const params = useParams();
  const { id } = params;



  async function fetchDetails() {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
    const data = await response.json()
    setDesc(data.description.en)
    setIcon(data.image.large)
    setName(data.name)
    setRank(data.market_cap_rank)
    setPrice(data.market_data.current_price.inr)
    setMc(data.market_data.market_cap.inr)
  }

  useEffect(() => {
    fetchDetails()
  },[])



  return (
    <>
                <h2 style={{textAlign:'center',marginBlock:'30px'}}>Crypto Apex</h2>

    <div className='new-container'>
      <div className="info-section">
        <div className="left">
          <img src={icon} alt="" width={'100px'} />
          <h1>{name}</h1>
         

          <h3>Rank : {rank}</h3>
          <h3>Current Price : ₹{price.toLocaleString("en-US")}</h3>
          <h3>Market Capital : ₹{mc.toLocaleString("en-US")}</h3>
        </div>

        <div className="right">
          <strong>Description : </strong> <br /><br />
          <div dangerouslySetInnerHTML={{ __html: desc }} />
        </div>
      </div>
    </div>
    </>
  )
}

export default CoinPage