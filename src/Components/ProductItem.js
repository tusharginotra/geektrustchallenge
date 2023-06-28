import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ProductItem(props) {
  const handleAddToCart = props.handleAddToCart
  // console.log(props.id)
  return (
    <div className='flex-item'>
    <Card sx={{ minWidth:200 , margin:2 }}>
      <CardMedia
        sx={{ height: 200 }}
        image={props.img}
        // title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        
      </CardContent>
      <CardActions style={{display:'flex', flexDirection:'row'}} >
      <Button variant="text">{props.price} Rs</Button>
        <Button onClick={()=>handleAddToCart(props.id)} sx={{padding : 1}} size='small' variant="contained">Add to Cart</Button>
      </CardActions>
    </Card>
    </div>
  );
}