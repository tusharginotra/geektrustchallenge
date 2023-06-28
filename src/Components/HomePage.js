import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Search } from '@mui/icons-material';
import { Button, TextField, Typography } from '@mui/material';
import AllProducts from './AllProducts';
import { useNavigate } from 'react-router-dom'
const drawerWidth = 240;

function HomePage(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate()
  const [gender, setGender] = React.useState('');
  const [colour, setColour] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [type, setType] = React.useState('');
  const [search,setSearch] = React.useState('')
  const [products,setProducts] = React.useState([]);
  const [cart,setCart] = React.useState([])
  // const handleFilters = props.handleFilters;
  // const allProducts = props.allProducts;
  // const products = props.products;
  const handleGenderChange = (event) => {
    setGender(event.target.value);
    let gender = event.target.value;
    let newProducts = products.filter((product)=>{
        return product.gender === gender
    })
    setProducts(newProducts)
  };
 
//   console.log(props.products)
//   props.products=[]
  const handleColourChange = (event) => {
    let color = event.target.value
    setColour(event.target.value);
    // console.log(allProducts)
    // console.log(color)
    const newProducts = products.filter((product)=>{
        return product.color===color
    })
    setProducts(newProducts)
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    let price = event.target.value
    if( price === 450)
    {
        const newProducts = products.filter((product)=>{
            return product.price > 450;
        })
        setProducts(newProducts)
    }
    else
    {
        let low = price.split('-')[0],high = price.split('-')[1]
        const newProducts = products.filter((product)=>{
            return product.price > low && product.price<=high;
        })
        setProducts(newProducts)
    }

  };
  const handleTypeChange = (event) => {
    setType(event.target.value);
    const type = event.target.value;
    const newProducts = products.filter((product)=>{
        return product.type === type;
    })
    setProducts(newProducts)
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleSearch=()=>{
    if( search.length === 0)return
    let color = search.split(' ')[0];
    let type = search.split(' ')[1]

    const newProducts = products.filter(product=>{
        return product.color===color || product.type === type
    })
    setProducts(newProducts)
  }
  const makeApiCall =async ()=>{
    try{
        // setLoading(true)
        // localStorage.removeItem("cartItems")
        const response = await fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json')
        const data = await response.json();
        // console.log(data.length)
        setProducts(data)
        // console.log(data)
        if(localStorage.getItem("cartItems"))
        {
          setCart(JSON.parse(localStorage.getItem("cartItems")))
        }
        // setAllProducts(data)
        // setLoading(false)
    }
    catch(err)
    {
        alert(err);
        setProducts([]);
    }
  }
  const handleAddToCart = (id)=>{
    let present = false
    // console.log(typeof(id))
    // console.log(typeof(products[0].id))
    for( let i=0;i<cart.length;i++)
    {
      // console.log(cart[i].id)
      // console.log(id)
      if( cart[i].id === id ) 
      {
        present = true
        break
      }
    }
    if(present){
      alert("Item already in the cart, Please Update the quantity in the cart")
    }
    else
    {
      let item = products.filter(product=>{return product.id === id })
      item[0].buy =  1
      let newCart = []
      newCart.push(...cart)
      newCart.push(item[0])
      setCart(newCart)
      console.log(newCart)
      localStorage.setItem("cartItems",JSON.stringify(newCart))
    }
  }
 React.useEffect(()=>{
    makeApiCall()

 },[])

  const drawer = (
    <div>
      <Typography sx={{fontWeight:'bold', fontSize:20 , height:90, padding:5 }}>TeeRex Store</Typography>
      {/* <Toolbar /> */}
      <Divider />
      <FormControl sx={{marginLeft:3}}>
      <FormLabel id="demo-controlled-radio-buttons-group1">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={gender}
        onChange={handleGenderChange}
      >
        <FormControlLabel value="Men" control={<Radio />} label="Men" />
        <FormControlLabel value="Women" control={<Radio />} label="Women" />
      </RadioGroup>
    </FormControl>
    <FormControl sx={{marginLeft:3}}>
      <FormLabel id="demo-controlled-radio-buttons-group2">Colour</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={colour}
        onChange={handleColourChange}
      >
        <FormControlLabel value="Red" control={<Radio />} label="Red" />
        <FormControlLabel value="Blue" control={<Radio />} label="Blue" />
        <FormControlLabel value="Green" control={<Radio />} label="Green" />

      </RadioGroup>
    </FormControl>
    <FormControl sx={{marginLeft:3}}>
      <FormLabel id="demo-controlled-radio-buttons-group3">Price Range</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={price}
        onChange={handlePriceChange}
      >
        <FormControlLabel value="0-250" control={<Radio />} label="0-250Rs" />
        <FormControlLabel value="251-450" control={<Radio />} label="251-450Rs" />
        <FormControlLabel value="450" control={<Radio />} label="450 and above" />

      </RadioGroup>
    </FormControl>
    <FormControl sx={{marginLeft:3}}>
      <FormLabel id="demo-controlled-radio-buttons-group4">Type</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={type}
        onChange={handleTypeChange}
      >
        <FormControlLabel value="Polo" control={<Radio />} label="Polo" />
        <FormControlLabel value="Hoodie" control={<Radio />} label="Hoodie" />
        <FormControlLabel value="Basic" control={<Radio />} label="Basic" />

      </RadioGroup>
    </FormControl>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{  justifyContent:'center',backgroundColor:'white', color:'white'}}>
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography> */}
          <TextField
        id="outlined-controlled"
        label="Search"
        value={search}
        sx={{ width:'50ch', boxSizing:'border-box',margin : 2 }}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <Button onClick={()=>handleSearch()} ><Search sx={{color:'green'}} /></Button>
      <Typography onClick={()=>navigate("/")} sx={{color:'black', cursor:'pointer' }}>Products</Typography>
      <Button onClick={()=>{navigate("/cart")}} ><AddShoppingCartIcon sx={{color:'black'}} /></Button>
        </Toolbar>
        
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      

      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
          <AllProducts products={products} handleAddToCart={handleAddToCart}/>
        <Toolbar />
        
      </Box>
      
    </Box>
    
  );
}

HomePage.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default HomePage;