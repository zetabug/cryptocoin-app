import React from 'react'
import {TableRow,TableCell }from '@mui/material'

const Coin = ({id,image,name,symbol,price,pricePercent,marketCap}) => {
  return (
    <TableRow
    onClick={() => { window.location.href = `./coins/${id}` }}
    sx={{ '&:last-child td, &:last-child th': { border: 0 },cursor:'pointer',':hover':{background:'#f0f0f0'}}}>
    <TableCell align='center' >
        <img src={image} alt='cryptoimg' width='50px' />
    </TableCell>
    <TableCell align='center' style={{fontWeight:'700',fontFamily:'Poppins'}}>
        {name}({symbol})
    </TableCell>
    <TableCell align='center' style={{fontWeight:'700',fontFamily:'Poppins'}}>₹ {price}</TableCell>

    <TableCell align='center' style={{fontWeight:'700',fontFamily:'Poppins'}}>{pricePercent}%</TableCell>
    <TableCell align='center' style={{fontWeight:'700',fontFamily:'Poppins'}}>₹ {marketCap}</TableCell>

</TableRow>
  )
}

export default Coin