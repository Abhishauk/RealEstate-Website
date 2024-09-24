import express from 'express';
import {createUser , bookVisit , getAllBookings, cancelBooking, toFav, getAllFavorites} from '../controller/userCntlr.js';

const router = express.Router()

router.post("/register" , createUser);
router.post("/bookVisit/:id" , bookVisit);
router.get("/allBookings", getAllBookings);
router.post("/removeBooking/:id", cancelBooking);
router.post("/toFav/:rid",toFav);
router.post("/allFav/",getAllFavorites)


export {router as userRoute}