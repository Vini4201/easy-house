package net.easyhouse.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.easyhouse.model.Booking;
import net.easyhouse.service.BookingService;

@RestController
@RequestMapping("/easyhouse/bookings") // changed /api/bookings in seller to /easyhouse/bookings 
//@CrossOrigin("http://localhost:4200")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:52441"})
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("/seller/{sellerId}") 
    public List<Booking> getBookingsBySellerId(@PathVariable Integer sellerId) { // seller
        return bookingService.getBookingsBySellerId(sellerId);
    }
    
    
//    @PostMapping
//    public Booking createBooking(@RequestBody Booking booking) { //admin
//        return bookingService.saveBooking(booking);
//    }

    @GetMapping
    public List<Booking> getAllBookings() { // admin
    return bookingService.getAllBookings();
    }

    @GetMapping("/{id}") // admin
    public Optional<Booking> getBookingById(@PathVariable Integer id) { 
    return bookingService.getBookingById(id);
    }

//    @PutMapping("/{id}") //admin
//    public Booking updateBooking(@PathVariable Long id, @RequestBody Booking booking) { 
//        booking.setId(id);
//        return bookingService.saveBooking(booking);
//    }


//    @DeleteMapping("/{id}") //admin
//    public void deleteBookingById(@PathVariable Long id) { //changed from int to long
//        bookingService.deleteBookingById(id);
//    }
}