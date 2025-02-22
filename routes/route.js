import express from 'express'
import { userSignup,userLogin } from '../controller/user-controller.js';
import { getProducts,getProductsById } from '../controller/product-controller.js';
import { addPaymentGateway,verifyPayment } from '../controller/payment-controller.js';

const router=express.Router();

router.post('/signup',userSignup);
router.post('/login',userLogin);
router.get('/products',getProducts);
router.get('/product/:id',getProductsById);
router.post('/payment',addPaymentGateway);
router.post('/verify',verifyPayment);


export default router;