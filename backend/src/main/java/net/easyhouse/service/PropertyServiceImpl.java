package net.easyhouse.service;

import net.easyhouse.model.Property;
import net.easyhouse.model.PropertyStatus;
import net.easyhouse.model.User;
import net.easyhouse.repository.PropertyRepository;
import net.easyhouse.repository.UserRepository;
import net.easyhouse.exception.PropertyAlreadyExistsException;
//import net.housing.springboot.exception.DuplicatePropertyException;
import net.easyhouse.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
//import java.util.Optional;
import java.util.UUID;

@Service
public class PropertyServiceImpl implements PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private EmailSenderService emailService;

//    @Override
//    public List<Property> getAllProperties() { // seller (initially, not now) and admin
//        return propertyRepository.findAll();
//    }
    
    public List<Property> getAllProperties() { // admin
    	 return propertyRepository.findAll();
    	 }

//    @Override
//    public Property getPropertyById(Long id) throws ResourceNotFoundException { // initally for seller
//        return propertyRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + id));
//    }
    
    public Optional<Property> getPropertyById(Integer id) { //admin
    	 return propertyRepository.findById(id);
    	 }

    
    // DIFFERENT NAME
    
    @Override
    public boolean findIfPropertyExists(String propertyName) throws PropertyAlreadyExistsException { //seller
        Property existingProperty = propertyRepository.findByPropertyName(propertyName);
        if (existingProperty != null) {
            throw new PropertyAlreadyExistsException("Enter a unique property value");
        }
        return true;
    }

    @Override
    public Property addProperty(Property property) throws PropertyAlreadyExistsException { //seller
        findIfPropertyExists(property.getPropertyName());
//        property.setPropertyStatus(PropertyStatus.AVAILABLE); //default value available
     // for property approval
        property.setPropertyStatus(PropertyStatus.PENDING);
        
        Property addedProperty = propertyRepository.save(property);

        // Fetch seller details
        User seller = userRepository.findById(property.getSellerId()).orElse(null);
        
        if (seller != null) {
            String subject = "New Property Added";
            String body = "Dear " + seller.getUserName() + ",\n\n" +
                          "A new property has been added by you:\n" +
                          "Property Name: " + addedProperty.getPropertyName() + "\n" +
                          "Property Type: " + addedProperty.getPropertyType() + "\n" +
                          "Property Cost: " + addedProperty.getPropertyCost() + "\n" +
                          "Property Area: " + addedProperty.getPropertyArea() + "\n" +
                          "Property Address: " + addedProperty.getPropertyAddress() + "\n" +
                          "Property Description: " + addedProperty.getPropertyDescription() + "\n" +
                          "Property Status: " + addedProperty.getPropertyStatus().toString() + "\n\n" +
                          "Thank you!";
            emailService.sendEmail(seller.getEmail(), subject, body);
        }

        return addedProperty;
    }
    
    
    // CHECK FOR DUPLICATE NAME AND URL
    
//    @Override
//    public Property createProperty(Property property) throws DuplicatePropertyException {
//        Optional<Property> existingProperty = propertyRepository.findByNameOrImageUrl(property.getPropertyName(), property.getPropertyImageUrl());
//        if (existingProperty.isPresent()) {
//            throw new DuplicatePropertyException("Property with the same name or image URL already exists");
//        }
//        return propertyRepository.save(property);
//    }

    
//    @Override
//    public Property createProperty(Property property) {
//        return propertyRepository.save(property);
//    }
    
    

    @Override
    public Property updateProperty(Integer id, Property propertyDetails) throws ResourceNotFoundException { //seller
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + id));

     // Keep track of changes
        Map<String, String> changes = new HashMap<>();
        
        if (!property.getPropertyName().equals(propertyDetails.getPropertyName())) {
            changes.put("Property Name", property.getPropertyName() + " -> " + propertyDetails.getPropertyName());
            property.setPropertyName(propertyDetails.getPropertyName());
        }
        if (!property.getPropertyType().equals(propertyDetails.getPropertyType())) {
            changes.put("Property Type", property.getPropertyType() + " -> " + propertyDetails.getPropertyType());
            property.setPropertyType(propertyDetails.getPropertyType());
        }
        if (!property.getPropertyCost().equals(propertyDetails.getPropertyCost())) {
            changes.put("Property Cost", property.getPropertyCost() + " -> " + propertyDetails.getPropertyCost());
            property.setPropertyCost(propertyDetails.getPropertyCost());
        }
        if (property.getPropertyArea() != propertyDetails.getPropertyArea()) {
            changes.put("Property Area", property.getPropertyArea() + " -> " + propertyDetails.getPropertyArea());
            property.setPropertyArea(propertyDetails.getPropertyArea());
        }
        if (!property.getPropertyAddress().equals(propertyDetails.getPropertyAddress())) {
            changes.put("Property Address", property.getPropertyAddress() + " -> " + propertyDetails.getPropertyAddress());
            property.setPropertyAddress(propertyDetails.getPropertyAddress());
        }
        if (!property.getPropertyDescription().equals(propertyDetails.getPropertyDescription())) {
            changes.put("Property Description", property.getPropertyDescription() + " -> " + propertyDetails.getPropertyDescription());
            property.setPropertyDescription(propertyDetails.getPropertyDescription());
        }
        if (!property.getPropertyImageUrl().equals(propertyDetails.getPropertyImageUrl())) {
            changes.put("Property Image URL", property.getPropertyImageUrl() + " -> " + propertyDetails.getPropertyImageUrl());
            property.setPropertyImageUrl(propertyDetails.getPropertyImageUrl());
        }
        if (!property.getPropertyStatus().equals(propertyDetails.getPropertyStatus())) {
            changes.put("Property Status", property.getPropertyStatus().toString() + " -> " + propertyDetails.getPropertyStatus().toString());
            property.setPropertyStatus(propertyDetails.getPropertyStatus());
        }

        Property updatedProperty = propertyRepository.save(property);

        // Fetch seller details
        User seller = userRepository.findById(property.getSellerId()).orElse(null);
        
        if (seller != null) {
            String subject = "Property Updated";
            StringBuilder body = new StringBuilder("Dear " + seller.getUserName() + ",\n\n" +
                          "Your property has been updated:\n" +
                          "Property Name: " + updatedProperty.getPropertyName() + "\n" +
                          "Property Type: " + updatedProperty.getPropertyType() + "\n" +
                          "Property Cost: " + updatedProperty.getPropertyCost() + "\n" +
                          "Property Area: " + updatedProperty.getPropertyArea() + "\n" +
                          "Property Address: " + updatedProperty.getPropertyAddress() + "\n" +
                          "Property Description: " + updatedProperty.getPropertyDescription() + "\n" +
                          "Property Status: " + updatedProperty.getPropertyStatus().toString() + "\n\n");

            if (!changes.isEmpty()) {
                body.append("Changes made:\n");
                changes.forEach((key, value) -> body.append(key).append(": ").append(value).append("\n"));
            }
            
            body.append("\nThank you!");
            
            emailService.sendEmail(seller.getEmail(), subject, body.toString());
        }

        return updatedProperty;
    }

    @Override
    public void deleteProperty(Integer id) throws ResourceNotFoundException { 
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + id));
        
     // Fetch seller details
        User seller = userRepository.findById(property.getSellerId()).orElse(null);

        propertyRepository.delete(property);

        if (seller != null) {
            String subject = "Property Deleted";
            String body = "Dear " + seller.getUserName() + ",\n\n" +
                          "The following property has been deleted by you:\n" +
                          "Property Name: " + property.getPropertyName() + "\n" +
                          "Property Type: " + property.getPropertyType() + "\n" +
                          "Property Cost: " + property.getPropertyCost() + "\n" +
                          "Property Area: " + property.getPropertyArea() + "\n" +
                          "Property Address: " + property.getPropertyAddress() + "\n" +
                          "Property Description: " + property.getPropertyDescription() + "\n" +
                          "Property Status: " + property.getPropertyStatus().toString() + "\n\n" +
                          "Thank you!";
            emailService.sendEmail(seller.getEmail(), subject, body);
        }
//        propertyRepository.delete(property);
    }
    
    
 // for property approve, get by seller id and approve
    @Override
    public List<Property> findPropertiesBySellerIdAndStatus(Integer sellerId, PropertyStatus status) {
        return propertyRepository.findBySellerIdAndPropertyStatus(sellerId, status);
    }
    
    // for property approve
    @Override
    public List<Property> getApprovedProperties() {
        return propertyRepository.findByPropertyStatus(PropertyStatus.APPROVED);
    }
    
    // for approve property
    @Override
    public Property approveProperty(Integer id) throws ResourceNotFoundException {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + id));
        property.setPropertyStatus(PropertyStatus.APPROVED); // Set to APPROVED
        return propertyRepository.save(property);
    }

    @Override
    public Property rejectProperty(Integer id) throws ResourceNotFoundException {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + id));
        property.setPropertyStatus(PropertyStatus.REJECTED);
        return propertyRepository.save(property);
    }
    
    
    @Override
    public List<Property> getPropertiesBySellerId(Integer sellerId) { //seller
        return propertyRepository.findBySellerId(sellerId);
    }
    
    // for upload image
    @Override
    public String storeImage(MultipartFile imageFile) throws IOException {
        String uploadDir = "property-images/";
        String originalFilename = imageFile.getOriginalFilename();
        String fileExtension = StringUtils.getFilenameExtension(originalFilename);
        String newFilename = UUID.randomUUID().toString() + "." + fileExtension;
        Path filePath = Paths.get(uploadDir + newFilename);
        
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, imageFile.getBytes());
        
        return "http://localhost:8080/property-images/" + newFilename;
    }
    
//    public Property saveProperty(Property property) { //admin
//        return propertyRepository.save(property);
//    }
    
//    @Override
//    public Optional<Property> findByNameOrImageUrl(String propertyName, String propertyImageUrl) {
//        return propertyRepository.findByNameOrImageUrl(propertyName, propertyImageUrl);
//    }
    
}