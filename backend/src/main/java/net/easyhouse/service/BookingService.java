package net.easyhouse.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.easyhouse.model.Booking;
import net.easyhouse.model.Property;
import net.easyhouse.repository.BookingRepository;
import net.easyhouse.repository.PropertyRepository;
//import net.housing.springboot.repository.UserRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    public List<Booking> getBookingsBySellerId(Integer sellerId) { //seller
        List<Property> properties = propertyRepository.findBySellerId(sellerId);
        List<Integer> propertyIds = properties.stream().map(Property::getId).collect(Collectors.toList());
        return bookingRepository.findByPropertyIdIn(propertyIds);
    }
    
    
//    public Booking saveBooking(Booking booking) { //admin
//        return bookingRepository.save(booking);
//    }
    
    public List<Booking> getAllBookings() { //admin
    	 return bookingRepository.findAll();
    	 }

    public Optional<Booking> getBookingById(Integer id) { // admin
    	 return bookingRepository.findById(id);
    	 }

//    public void deleteBookingById(Long id) { //admin
//        bookingRepository.deleteById(id);
//    }
}