import { useEffect, useState } from "react";
import cartService from "../Appwrite/CartService";
import StripeCheckout from "react-stripe-checkout";
import authService from "../Appwrite/auth";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
  Paper,
  Box,
  Divider,
  Grid,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function CartItems() {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  async function fetchCartItems(email) {
    try {
      const items = await cartService.getCart(email);
      const mp = new Map();
      let mycart = [];
      for (let i = 0; i < items.length; i++) {
        if (mp.get(items[i].DishName) === 1) {
          for (let j = 0; j < mycart.length; j++) {
            if (mycart[j].dishname === items[i].DishName) {
              mycart[j].quantity = mycart[j].quantity + 1;
              mycart[j].price = mycart[j].price * mycart[j].quantity;
            }
          }
        } else {
          mp.set(items[i].DishName, 1);
          mycart.push({
            dishname: items[i].DishName,
            price: items[i].Price,
            quantity: 1,
          });
        }
      }
      setCartItems(mycart);
      console.log(mycart);
      let sum = items.reduce((acc, item) => acc + item.Price, 0);
      setTotalCost(sum);
    } catch (error) {
      console.error("Failed to fetch cart items", error);
    }
  }

  async function foodAdder(dishName, price) {
    const user = await authService.getCurrentUser();
    if (user) {
      await cartService.addtocart(user.email, dishName, Math.ceil(Number(price)));
      fetchCartItems(user.email); // Refresh cart items after adding
    } else {
      alert("You are not logged in.");
    }
  }

  async function getEmail() {
    try {
      const userdata = await authService.getCurrentUser();
      return userdata;
    } catch (error) {
      console.error('Failed to fetch user data', error);
      return null;
    }
  }

  useEffect(() => {
    async function fetchUserData() {
      const user = await getEmail();
      if (user && user.email) {
        fetchCartItems(user.email);
      }
    }
    fetchUserData();
  }, []); // Fetch data on mount only

  async function removeItemFromCart(dish) {
    try {
      const user = await getEmail();
      await cartService.DeleteItemFromCart(user.email, dish);
      fetchCartItems(user.email); // Refresh cart items after removing
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  }

  const makePayment = token => {
    const body = {
      token,
      product
    };
    const headers = {
      "Content-Type": "application/json"
    };

    return fetch(`http://localhost:3000/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
      .then(response => {
        setRes("true");
        const { status } = response;
        console.log("STATUS ", status);
      })
      .catch(error => console.log(error));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
          <ShoppingCartIcon fontSize="large" color="primary" />
          <Typography variant="h4" ml={2}>
            Your Cart
          </Typography>
        </Box>
        <List>
          {cartItems.length > 0 ? (
            cartItems.map((cartItem, index) => (
              <div key={index}>
                <ListItem>
                  <Grid container alignItems="center">
                    <Grid item xs={4}>
                      <Avatar
                        alt={cartItem.dishname}
                        src={`https://via.placeholder.com/150?text=${cartItem.dishname}`}
                        sx={{ width: 60, height: 60 }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <ListItemText
                        primary={cartItem.dishname}
                        secondary={`Price: $${(cartItem.price / cartItem.quantity).toFixed(2)}`}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body2" color="textSecondary">
                        Quantity: {cartItem.quantity}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <IconButton
                        color="primary"
                        onClick={() => foodAdder(cartItem.dishname, cartItem.price / cartItem.quantity)}
                      >
                        <AddIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => removeItemFromCart(cartItem.dishname)}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider />
              </div>
            ))
          ) : (
            <ListItem>
              <Typography variant="body1" color="textSecondary" align="center" sx={{ width: "100%" }}>
                Your cart is empty.
              </Typography>
            </ListItem>
          )}
        </List>
        <Box mt={4}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h5" color="primary">
                TOTAL: ${totalCost.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item>
              <StripeCheckout
                stripeKey="pk_test_51JyhF1SGZNht59Jn6x8w9LRZ5lncxOdJ8UfhQLGSoBUyNpREgVCUqCrjJ8Dvz8gzCSgFzboGehYoORlzEaLdGU9l007s2U5PrZ"
                token={makePayment}
                name="BILL PAYMENT"
                amount={totalCost * 100} // Stripe expects the amount in cents
                shippingAddress
                billingAddress
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ ml: 2 }}
                >
                  Checkout
                </Button>
              </StripeCheckout>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
