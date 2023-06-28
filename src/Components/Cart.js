import React, { useEffect } from 'react'
import { Typography,Button,Toolbar,AppBar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Box from '@mui/material/Box';
import CartItem from './CartItem';
function Cart() {
    const navigate = useNavigate()
    let cart = JSON.parse(localStorage.getItem("cartItems"));
    const [bill,setBill] = React.useState(0)
    if( !cart)
        cart=[]

    const amount = ()=>{
        let sum = 0
        for( let i=0;i<cart.length;i++)
            sum+=cart[i].price * cart[i].buy
        setBill(sum)
    }
    const handleDelete = (id)=>{
        const newCart = cart.filter((item)=> item.id !== id)
        localStorage.setItem("cartItems",JSON.stringify(newCart));
        window.location.reload()
    }  
    const handleQuantity= (id,qty)=>{
        let newCart = []
        for( let i=0;i<cart.length;i++)
        {
            if(cart[i].id=== id)
            {
                let item = cart[i];
                item.buy = qty
                newCart.push(item)
                
            }
            else
            {
                newCart.push(cart[i]);
            }
        }
        cart = newCart
        amount()
        
        localStorage.setItem("cartItems",JSON.stringify(newCart))
    }
    useEffect(()=>{
    amount()
    })
  return (
    <Box sx={{marginBottom:20}}>
        <AppBar
        position="fixed"
      >
        <Toolbar sx={{  justifyContent:'space-around',backgroundColor:'white', color:'black'}}>
            <Typography sx={{fontSize:25, cursor:'pointer'}} >TeeRex Store</Typography>
        <Box sx={{  margin:2, display:'flex', justifyContent:'center'}} >
        <Typography  onClick={()=>navigate("/")} sx={{ fontSize:25, color:'black', cursor:'pointer',padding:2, textDecoration:'underline' ,borderRadius:'5px' }}>Products</Typography>
        <Button sx={{marginLeft:'5ch'}} onClick={()=>{navigate("/cart")}} ><AddShoppingCartIcon sx={{color:'black'}} /></Button>
      </Box>
        </Toolbar>
      </AppBar>
        
        
      <Box sx={{ marginTop:20, display:'flex' , flexDirection:'column', alignItems:'center' }} >
        {
            cart.map((item)=>{
                return ( <CartItem buy={item.buy} maxQuantity={item.quantity} handleQuantity={handleQuantity} handleDelete={handleDelete} image={item.imageURL} key={item.id} price={item.price} id={item.id} name={item.name} />)
            })
        }
        
      </Box>
      <hr style={{ width:'80%', 'margin':'2'}}/>
    <Box sx={{ marginInline:20, display:'flex' , justifyContent:'space-around' }}  >
        <Typography sx={{fontSize:30 }} >Total</Typography>
        <Typography sx={{fontSize:30 }} >=</Typography>
        <Typography sx={{fontSize:30 }}>{bill}</Typography>
    </Box>
    </Box>
  )
}

export default Cart