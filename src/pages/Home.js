import React, { useState, useEffect } from 'react'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Box, TextField, CircularProgress } from '@mui/material';
import "./home.css"
import Coin from '../components/Coin';

const Home = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');


    async function fetchCoins() {
        setLoading(true)
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=250&page=1&sparkline=false`
        const response = await fetch(url)
        const data = await response.json()
        setCoins(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchCoins()
    }, [search])

    return (
        <div className="container">
            <h2 style={{textAlign:'center',marginBlock:'30px'}}>Crypto Apex</h2>
            <Box
                component="form"
                sx={{
                    width: 500,
                    maxWidth: '100%',
                    marginInline: 'auto',
                    marginBlock: '50px'
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="Search" fullWidth size='small' variant="outlined" onChange={(e) => { setSearch(e.target.value) }} />
            </Box>
            <TableContainer sx={{ maxWidth: '80vw', marginInline: 'auto' }}>
                {
                    loading ?
                        (
                            <Box sx={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
                                <CircularProgress />
                            </Box>
                        ) :
                        (

                            <Table >
                                <TableHead style={{ background: '#000' }}>
                                    <TableRow>
                                        <TableCell align='center' style={{ color: '#fff', fontWeight: '700', fontFamily: 'Poppins' }}>COIN</TableCell>
                                        <TableCell align='center' style={{ color: '#fff', fontWeight: '700', fontFamily: 'Poppins' }}>NAME</TableCell>
                                        <TableCell align="center" style={{ color: '#fff', fontWeight: '700', fontFamily: 'Poppins' }}>PRICE</TableCell>
                                        <TableCell align="center" style={{ color: '#fff', fontWeight: '700', fontFamily: 'Poppins' }}>24h CHANGE</TableCell>
                                        <TableCell align="center" style={{ color: '#fff', fontWeight: '700', fontFamily: 'Poppins' }}>MARKET CAP</TableCell>

                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    
                                    {React.Children.toArray(

                                        coins.filter((x) => {
                                            if (search === "") {
                                                return x
                                            } else {
                                                return (x.name.toLowerCase().includes(search) || x.symbol.toLowerCase().includes(search))
                                            }
                                        }).map((x) => (
                                            <Coin 
                                            id={x.id} 
                                            image={x.image} 
                                            name={x.name} 
                                            symbol={x.symbol.toUpperCase()} 
                                            price={x.current_price.toFixed(2)} 
                                            pricePercent={x.price_change_percentage_24h.toFixed(2)} 
                                            marketCap={x.market_cap.toLocaleString("en-US")} />
                                        ))
                                    )
                                    }

                                </TableBody>
                            </Table>
                        )
                }
            </TableContainer>
        </div>
    )
}

export default Home
