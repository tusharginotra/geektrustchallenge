import { Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
function CartItem(props) {
    const [qty, setQuantity] = React.useState(props.buy);

    const maxQuantity = props.maxQuantity
  const handleDelete= props.handleDelete
  const handleQuantity = props.handleQuantity
  const handleChange = (event) => {
    setQuantity(event.target.value);
    handleQuantity(props.id,event.target.value)
  };
    const addMenu = (val)=>{
        const arr = []
        for( let i=1;i<=val;i++)
        {
            arr.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
        }
        return arr
    }
  useEffect(()=>{

  })
  return (
    <div >
        <Box sx={{  margin:4,display:'flex' , maxHeight:200, alignItems:'center'}}>
            <img style={{ height:100}} src={props.image} alt='None' ></img>
            <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start' , alignItems:'center',boxSizing:'border-box' }}>
            <Typography sx={{fontWeight:'bold'}} >{props.name}</Typography>
            <Typography sx={{fontWeight:'bold'}}>{props.price} Rs</Typography>
            </Box>
            <FormControl sx={{ m: 2, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Quantity</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={qty}
                    label="Age"
                    onChange={handleChange}
                >
                    {
                        addMenu(maxQuantity)
                    }
                    {/* <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem> */}
                </Select>
            </FormControl>
            <Button onClick={()=>handleDelete(props.id)} sx={{margin:2}} >Delete</Button>
 
        </Box>
    </div>
  )
}

export default CartItem
