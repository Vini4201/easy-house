package net.easyhouse.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import net.easyhouse.exception.PropertyAlreadyExistsException;
import net.easyhouse.model.Property;
import net.easyhouse.service.PropertyService;


@RestController
@RequestMapping("/easyhouse") //changed from /api/v1 to /easyhouse
//@CrossOrigin("http://localhost:4200")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:52441"})
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

//    @GetMapping("/properties") // initially for seller
//    public List<Property> getAllProperties() {
//        return propertyService.getAllProperties();
//    }
    
    @GetMapping("/properties") // admin
    public List<Property> getAllProperties() {
    return propertyService.getAllProperties();
    }

//    @GetMapping("/properties/{id}") // initially had added for seller
//    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
//        Property property = propertyService.getPropertyById(id);
//        return ResponseEntity.ok(property);
//    }
    
    @GetMapping("/properties/{id}") // admin
    public Optional<Property> getPropertyById(@PathVariable Integer id) {
    return propertyService.getPropertyById(id);
    }

    
 // for property approve
    @GetMapping("/properties/seller/{sellerId}")
    public ResponseEntity<List<Property>> getPropertiesBySellerId(@PathVariable Integer sellerId) {
        List<Property> properties = propertyService.getPropertiesBySellerId(sellerId);
        return ResponseEntity.ok(properties);
    }
    
	 // for property approve
	    @GetMapping("/properties/approved")
	    public ResponseEntity<List<Property>> getApprovedProperties() {
	        List<Property> properties = propertyService.getApprovedProperties();
	        return ResponseEntity.ok(properties);
	    }
	    
	 // for property approval
	    @PutMapping("/properties/{id}/approve")
	    public ResponseEntity<Property> approveProperty(@PathVariable Integer id) {
	        Property approvedProperty = propertyService.approveProperty(id);
	        return ResponseEntity.ok(approvedProperty);
	    }
	    
	    // for property approval
	    @PutMapping("/properties/{id}/reject")
	    public ResponseEntity<Property> rejectProperty(@PathVariable Integer id) {
	        Property rejectedProperty = propertyService.rejectProperty(id);
	        return ResponseEntity.ok(rejectedProperty);
	    }
    
//    @GetMapping("/properties/seller/{sellerId}") // seller
//    public List<Property> getPropertiesBySellerId(@PathVariable Integer sellerId) {
//        return propertyService.getPropertiesBySellerId(sellerId);
//    }
    
    
    @PostMapping("/properties") // seller
    public ResponseEntity<?> createProperty(@RequestBody Property property) {
    	// for upload image
    	Map<String, String> response = new HashMap<>();
        try {
        	
            boolean result = propertyService.findIfPropertyExists(property.getPropertyName());
            if (result) {
            	property.setPropertyPostDate(LocalDate.now()); // Set current date as post date
                propertyService.addProperty(property);
                // for upload image
                response.put("message", "Property added successfully");
                return ResponseEntity.status(HttpStatus.CREATED).body(response);
//                return ResponseEntity.status(HttpStatus.CREATED).body(property); //commented for upload image
            }
        } catch (PropertyAlreadyExistsException e) {
        	// for upload image
        	response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            // for upload image
            response.put("error", "An error occurred");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
        // for upload image
        response.put("error", "An error occurred");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
    }


//    @PostMapping("/properties")
//    public Property createProperty(@RequestBody Property property) {
//        return propertyService.createProperty(property);
//    }
    
//    @PostMapping("/properties")
//    public ResponseEntity<Property> createProperty(@RequestBody Property property) {
//        Property createdProperty = propertyService.createProperty(property);
//        return ResponseEntity.status(HttpStatus.CREATED).body(createdProperty);
//    }

    @PutMapping("/properties/{id}") //seller
    public ResponseEntity<Property> updateProperty(@PathVariable Integer id, @RequestBody Property propertyDetails) {
        Property updatedProperty = propertyService.updateProperty(id, propertyDetails);
        return ResponseEntity.ok(updatedProperty);
    }

    @DeleteMapping("/properties/{id}") //seller
    public ResponseEntity<Map<String, Boolean>> deleteProperty(@PathVariable Integer id) {
        propertyService.deleteProperty(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    
    // Upload image from device as well
    @PostMapping("/properties/uploadImage")
    public ResponseEntity<String> uploadImage(@RequestParam("imageFile") MultipartFile imageFile) {
        try {
            String imageUrl = propertyService.storeImage(imageFile);
            return ResponseEntity.status(HttpStatus.OK).body(imageUrl);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while uploading the image");
        }
    }
}
