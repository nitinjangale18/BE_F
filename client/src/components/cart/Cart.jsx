import { useSelector } from "react-redux";
import { Grid, Box, Typography, styled, Button } from "@mui/material";
import CartItem from "./CartItem";
import TotalView from "./TotalView";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';
import EmptyCart from "./EmptyCart";

const Container = styled(Box)`
    padding: 30px 135px;
`;

const Header = styled(Box)`
    padding: 15px 24px;
    font-size: 18px;
    font-weight: bold;
`;
const ButtonWrapper=styled(Box)`
padding:16px 22px;
background:#fff;
box-shadow:0 -2px 10px 0 rgb(0 0 0 / 10% ) ;

`

const StyledButton=styled(Button)`
display:flex;
margin-left:auto;
background:#fb641b;
width:250px;
height:51px;
border-radius:10px;
color:#fff;
`

const Cart = () => {
    const { cartItems } = useSelector(state => state.cart);
    const { id } = useParams();

    const dispatch = useDispatch();
    
    useEffect(() => {
        if(cartItems && id !== cartItems.id)   
            dispatch(addToCart(id));
    }, [dispatch, cartItems, id]);

    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
    }
    return (
        <>
            {cartItems.length > 0 ? (
                <Grid container>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                        <Container>
                            <Header>My cart ({cartItems.length})</Header>
                            {cartItems.map(item => (
    <CartItem key={item.id} item={item} removeItemFromCart={removeItemFromCart} />
))}

                            <ButtonWrapper>
                                <StyledButton>
                                    place order
                                </StyledButton>
                            </ButtonWrapper>
                        </Container>
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}> {/* Fixed width for TotalView */}
                        <TotalView cartItems={cartItems}/>
                    </Grid>
                </Grid>
            ) : (
               <EmptyCart/>
            )}
        </>
    );
};

export default Cart;
