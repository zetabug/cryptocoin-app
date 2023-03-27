import React, { useState, useEffect } from 'react'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Box, TextField, CircularProgress } from '@mui/material';
import "./home.css"

const Home = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');


    async function fetchCoins() {
        setLoading(true)
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
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
            <h2 style={{ textAlign: 'center', marginBlock: '30px' }}>Crypto Apex</h2>
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
            <TableContainer sx={{ maxWidth: '90vw', marginInline: 'auto' }}>
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

                                            <TableRow
                                                onClick={() => { window.location.href = `./coins/${x.id}` }}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', ':hover': { background: '#f0f0f0' } }}>
                                                <TableCell align='center' >
                                                    <img src={x.image} alt='cryptoimg' width='50px' />
                                                </TableCell>
                                                <TableCell align='center' style={{ fontWeight: '700', fontFamily: 'Poppins' }}>
                                                    {x.name}({x.symbol.toUpperCase()})
                                                </TableCell>
                                                <TableCell align='center' style={{ fontWeight: '700', fontFamily: 'Poppins' }}>$ {x.current_price.toFixed(2)}</TableCell>
                                                {x.price_change_percentage_24h > 0
                                                    ? <TableCell align='center' style={{ fontWeight: '700', fontFamily: 'Poppins', color: 'green' }}>{x.price_change_percentage_24h.toFixed(2)}%</TableCell>

                                                    : <TableCell align='center' style={{ fontWeight: '700', fontFamily: 'Poppins', color: 'red' }}>{x.price_change_percentage_24h.toFixed(2)}%</TableCell>
                                                }
                                                <TableCell align='center' style={{ fontWeight: '700', fontFamily: 'Poppins' }}>$ {x.market_cap.toLocaleString("en-US")}</TableCell>

                                            </TableRow>
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
