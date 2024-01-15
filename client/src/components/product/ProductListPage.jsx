/* eslint-disable react/prop-types */
import * as React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Grid, Box, Skeleton } from '@mui/material';
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { useNavigate } from 'react-router-dom';
import { StyledTypography, StyledBox, StyledButtonGroup, StyledButton } from './styledFile/productListPageStyle';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { updateCart } from '../cart/cartApi';
import { setCart } from '../../redux/userSlice';
function ProductItem({ product }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/product/${product._id}`);
    };
    return (
        <Card sx={{ backgroundColor: "white", padding: "8px", border: "1px solid #ccc" }} onClick={handleClick}>
            <CardMedia
                sx={{ height: 120 }}
                image={product && product.link ? product.link : ""}
                title={product ? product.name : ""}
            />
            <CardContent sx={{ padding: 0 }}>
                <StyledTypography>
                    {product ? product.name : ""}
                </StyledTypography>
                <Typography sx={{ color: "black", fontSize: "20px" }}>
                    {`$${product ? product.price.toFixed(2) : ""}`}
                </Typography>
            </CardContent>
            <ParoductButton product={product}></ParoductButton>
        </Card>
    );
}

export function ParoductButton({ product }) {
    const cart = useSelector(state => state.user.cart);
    const role = useSelector(state => state.user.role);
    const userId = useSelector(state => state.user.user_id);
    console.log("cart: ", cart);
    const isInCart = cart && cart.some(item => item.productId === product._id);
    const [quantity, setQuantity] = React.useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        const productInCart = cart.find(item => item.productId === product._id);
        const amount = productInCart ? productInCart.amount : 0;
        setQuantity(amount)
    }, [cart]);
    const navigate = useNavigate();
    const handleUpdate = async (e, type) => {
        e.stopPropagation();
        try {
            const updatedCart = await updateCart(userId, product._id, type);
            dispatch(setCart(updatedCart));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        navigate(`/productedit`, { state: { product: product } });
    };
    return <CardActions sx={{ display: 'flex', alignItems: 'center', padding: "0", flexWrap: 'wrap', maxWidth: "300px" }}>

        {isInCart ?
            <StyledBox>
                <StyledButtonGroup disableElevation variant="contained">
                    <Button size="small" onClick={(e) => handleUpdate(e, "decrease")}><RemoveRoundedIcon sx={{ fontSize: 20 }} /></Button>
                    <StyledButton size="small" disabled>{quantity}</StyledButton>
                    <Button size="small" onClick={(e) => handleUpdate(e, "add")}><AddRoundedIcon sx={{ fontSize: 20 }} /></Button>
                </StyledButtonGroup>
            </StyledBox>
            : <Button fullWidth sx={{
                backgroundColor: "#5048E5",
                color: "white",
            }} onClick={(e) => handleUpdate(e, "add")}>Add </Button>
        }

        {role === "Admin" && <Box sx={{ width: "40%" }}>
            <Button size="small" fullWidth
                onClick={handleEdit}
                sx={{ backgroundColor: "#f9fafb", color: "grey", border: "1px solid #ccc" }}>Edit</Button>
        </Box>}
    </CardActions>
}
const ProductListPage = ({ productsData }) => {
    console.log("productsData: ", productsData);
    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 10, sm: 15, md: 25 }}
        >
            {productsData
                ? productsData.map((product) => (
                    <Grid item xs={10} sm={5} md={5} key={product._id}>
                        <ProductItem product={product} />
                    </Grid>
                ))
                :
                Array.from(Array(10)).map((_, index) => (
                    <Grid xs={10} sm={5} md={5} key={index}>
                        <Box key={index} sx={{ marginRight: 0.5, my: 5, backgroundColor: "#f9fafb" }}>
                            <Skeleton variant="rectangular" height={130} sx={{ backgroundColor: "#ccc" }} />
                            <Box sx={{ pt: 0.5 }}>
                                <Skeleton sx={{ backgroundColor: "#ccc" }} />
                                <Skeleton width="60%" sx={{ backgroundColor: "#ccc" }} />
                            </Box>
                        </Box>
                    </Grid>
                ))
            }
        </Grid>
    )
}


export default ProductListPage
