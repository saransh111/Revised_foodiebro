import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import No_Dish from './No_dish';
import { Grid, Card, CardMedia, CardContent, Typography, Button, TextField, Container, Box } from '@mui/material';
import authService from '../Appwrite/auth';
import cartService from '../Appwrite/CartService';

export default function Content() {
  const [dishes, setDishes] = useState(null);
  const [search, setSearch] = useState("");
  const { register, handleSubmit } = useForm();
  
  useEffect(() => {
    getData();
  }, [search]);

  async function getData() {
    const response = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search);
    // Add random prices to each dish
    const dishesWithPrices = response.data.meals.map(dish => ({
      ...dish,
      price: (Math.random() * (30 - 10) + 10).toFixed(2), // Random price between $10 and $30
    }));
    setDishes(dishesWithPrices);
  }

  async function foodAdder(dishName,price) {
    const user = await authService.getCurrentUser();
    if (user) {
      console.log(user.email);
      console.log(dishName);
      await cartService.addtocart(user.email, dishName, price);
    } else {
      alert("You are not logged in.");
    }
  }

  const onSubmit = data => {
    setSearch(data.Search);
  }

  return (
    <Box
      sx={{
        backgroundImage: 'url(https://source.unsplash.com/1600x900/?food)', // Replace with your preferred background image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <Container maxWidth="lg" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 2, padding: 4 }}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center mb-8">
          <TextField
            type="text"
            placeholder="Search for a dish..."
            {...register("Search")}
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{ backgroundColor: '#fff', borderRadius: 1 }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Search
          </Button>
        </form>
        {
          dishes ? (
            dishes.length ? (
              <Grid container spacing={4}>
                {dishes.map((dish, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      sx={{
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt={dish.strMeal}
                        height="140"
                        image={dish.strMealThumb}
                        sx={{ borderRadius: '4px 4px 0 0' }}
                      />
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography gutterBottom variant="h5" component="div">
                          {dish.strMeal}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {dish.strInstructions.substring(0, 100)}...
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ marginTop: 1 }}>
                          ${dish.price}
                        </Typography>
                        <Button
                          variant="contained"
                          color="secondary"
                          sx={{ marginTop: 2 }}
                          onClick={() => foodAdder(dish.strMeal,dish.price)}// Replace this with your add to cart logic
                        >
                          Add to Cart
                        </Button>
                        <Button
                          variant="outlined"
                          color="primary"
                          href={`https://www.youtube.com/watch?v=${dish.strYoutube?.split("v=")[1]}`}
                          target="_blank"
                          sx={{ marginTop: 2 }}
                        >
                          Watch Video
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <No_Dish />
            )
          ) : (
            <Typography variant="h6" align="center" color="textSecondary">
              Please search for a dish.
            </Typography>
          )
        }
      </Container>
    </Box>
  );
}
