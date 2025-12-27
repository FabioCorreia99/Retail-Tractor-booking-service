const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookings.controller.js');
const { authenticateUserToken, authenticateBookingToken } = require("../middlewares/auth");
const { ensureSameUser, ensureUserIsAdmin } = require("../middlewares/ensureSameUser");
const { paginationMiddleware } = require("../middlewares/pagination");

//booking routes

router.post('/', authenticateUserToken, bookingsController.createBooking);

router.get('/', authenticateUserToken, paginationMiddleware, bookingsController.getAllBookings);

router.get('/:id',authenticateUserToken, bookingsController.getBookingById);

router.put('/:id/status', authenticateBookingToken, bookingsController.updateBookingStatus);

router.delete('/:id', authenticateUserToken, ensureUserIsAdmin, bookingsController.deleteBooking);

router.get('/user/:userId', authenticateUserToken, ensureSameUser, paginationMiddleware, bookingsController.getBookingsByUserId);

router.get('/equipment/:equipmentId',authenticateUserToken , paginationMiddleware,/* checks if the user is authorized to view bookings for this equipment */  bookingsController.getBookingsByEquipmentId);

router.get('/check-availability', bookingsController.checkAvailability);

module.exports = router;