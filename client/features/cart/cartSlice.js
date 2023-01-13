import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrderDetailsAsync = createAsyncThunk('/AllOrderDetails', async()=>{
    try{ 
        const {data} = await axios.get('/api/orderDetails')
        return data;
    }
    catch (error){
        console.error(error)
    }
})

export const fetchSingleOrderDetailAsync = createAsyncThunk('/orderDetails', async(id)=>{
    try{
        const {data} = await axios.get(`/api/cart/${id}`);
        return data; 
    }
    catch (error){
        console.error(error)
    }
})

export const addExistingToCartAsync = createAsyncThunk('/updateOrderDetails', async({orderId, productId, quantity})=>{
    const {data} = await axios.put('/api/orderDetails/', {
        orderId,
        productId, 
        quantity
    });
    return data; 
})

export const

export const cartSlice = createSlice({
    name: 'cart', 
    initialState: [],
    reducers: {
    }, 
    extraReducers: (builder)=>{
        builder.addCase(fetchOrderDetailsAsync.fulfilled, (state, action)=>{
            return action.payload; 
        });
        builder.addCase(fetchSingleOrderDetailAsync.fulfilled, (state, action)=>{
            return action.payload;
        })
        builder.addCase(addExistingToCartAsync.fulfilled, (state, action)=>{
            return action.payload; 
        })
    }
})

export const selectCart = (state) => state.cart; 

export default cartSlice.reducer; 