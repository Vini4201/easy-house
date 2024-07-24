package net.easyhouse.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.easyhouse.exception.CartNotEmptyException;
import net.easyhouse.model.Booking;
import net.easyhouse.model.Cart;
import net.easyhouse.model.Property;
import net.easyhouse.model.PurchaseRequest;
import net.easyhouse.model.User;
import net.easyhouse.service.BuyerService;
//import net.easyhouse.service.UserService;

@RestController
@RequestMapping("/easyhouse/api") //changed from /api/easy_housing to /easyhouse/api
//@CrossOrigin("http://localhost:4200")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:52441"})
public class BuyerController {

	@Autowired
	private BuyerService buyerService;
	
//	@Autowired
//	private UserService userService;
	

	@GetMapping("/buyer/{buyerId}/bookings")
	public ResponseEntity<List<Map<String, Object>>> getBookings(@PathVariable Integer buyerId) {
	    List<Map<String, Object>> bookingsWithSellerDetails = buyerService.getBookingsByBuyerId(buyerId);
	    return ResponseEntity.ok(bookingsWithSellerDetails);
	}
	
	@GetMapping("/buyers/{buyerId}")
	public ResponseEntity<User> getBuyerById(@PathVariable Integer buyerId)
	{
		User buyer = buyerService.getBuyerById(buyerId);
		if(buyer != null)
			return new ResponseEntity<>(buyer,HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/properties")
	public ResponseEntity<List<Property>> getProperties()
	{
		List<Property> properties = buyerService.getAllProperties();
		return ResponseEntity.ok(properties);
	}
	
	@GetMapping("/buyer/{buyerId}/properties/{propertyId}")
	public ResponseEntity<Property> getPropertyById(@PathVariable Integer propertyId)
	{
		Property property = buyerService.getPropertyById(propertyId);
		if(property != null)
			return new ResponseEntity<>(property,HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/buyer/{buyerId}/cart")
	public ResponseEntity<List<Cart>> getCartItems(@PathVariable Integer buyerId)
	{
		List<Cart> cartItems = buyerService.getCartItemsByBuyerId(buyerId);
		return ResponseEntity.ok(cartItems);
	}
	
	
	@PostMapping("/add-to-cart")
	public ResponseEntity<?> addToCart(@RequestParam Integer buyerId, @RequestParam Integer propertyId)
	{
		boolean isAlreadyInCart = buyerService.isPropertyInCart(buyerId, propertyId);
		
		if(isAlreadyInCart)
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Property already exists in your cart");
		
		Cart cartItem = buyerService.addToCart(buyerId, propertyId);
		return ResponseEntity.status(HttpStatus.CREATED).body(cartItem);
	}
	
	@PostMapping("/buyer/{buyerId}/purchase")
    public ResponseEntity<List<Booking>> purchaseProperties(@PathVariable Integer buyerId,@RequestBody PurchaseRequest purchaseRequest)
	{
		List<Integer> cartItemIds = purchaseRequest.getCartItemIds();
		Booking.PaymentMethod paymentMethod = purchaseRequest.getPaymentMethod();
		
		List<Booking> bookings = buyerService.purchaseProperties(buyerId, cartItemIds, paymentMethod);
		return ResponseEntity.status(HttpStatus.CREATED).body(bookings);
    }
		
	@PostMapping("/buyer/{buyerId}/clear-cart")
	public ResponseEntity<Void> clearCart(@PathVariable Integer buyerId)
	{
		try {
			buyerService.clearCart(buyerId);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		} catch(CartNotEmptyException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		}
	}
}