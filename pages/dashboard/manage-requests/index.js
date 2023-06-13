import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Box, Button } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { GlobalContext } from '../../../utils/GlobalContextProvider'
import { useContext } from 'react'
import useDatabase from '../../../hooks/useDatabase'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export default function BasicTable() {
    const database = useDatabase()
    const {user} = useContext(GlobalContext)
    const [requests, setRequests] = useState([])

    useEffect(() => {
        database.requestsForMe().then((res) => {
            console.log(res)
            setRequests(res)
        }).catch((e) => console.log(e))
    }, [])

    const handleAction = (action, requestId) => {
        database.pickupAction(action, requestId).then((res) => {
            console.log(res)
            if(res){
                const newRequests = requests.map((r) => {
                    if(r.requestId === requestId){
                        return {
                            ...r,
                            status: action
                        }
                    }
                })

                setRequests(newRequests)
            }
        }).catch((e) => {
            console.log(e)
        })
    }

  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Listing Id</TableCell>
              <TableCell align="right">Food Name</TableCell>
              <TableCell align="right">Requested By&nbsp(g)</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((row, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.listingId}
                </TableCell>
                <TableCell align="right">{row.foodName}</TableCell>
                <TableCell align="right">{row.requestedBy}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">
                <Box>
                    <Button onClick={() => handleAction("approved", row.requestId)}>Approve</Button>
                    <Button onClick={() => handleAction("rejected", row.requestId)}>Reject</Button>
                    <Button onClick={() => handleAction("delivered", row.requestId)}>Deliver</Button>
                </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  )
}
