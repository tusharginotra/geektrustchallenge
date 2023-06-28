import ProductItem from './ProductItem';
import { Box } from '@mui/material';
function AllProducts(props) {

    const handleAddToCart =props.handleAddToCart
    
    const products = props.products
      
  return (
    <Box sx={{marginTop:10}}>
    {<div style={{"display":'flex', "flexDirection":'row',"flexWrap":'wrap' }} >
       {
        products.map((item)=>{
            return (
                <ProductItem handleAddToCart={handleAddToCart}  name={item.name} img={item.imageURL} price={item.price} key={item.id} id={item.id}/>
            )
        })
       }  
    </div>}
    </Box>
  )
}

export default AllProducts