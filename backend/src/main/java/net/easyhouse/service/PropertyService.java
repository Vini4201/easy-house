package net.easyhouse.service;

import net.easyhouse.model.Property;
import net.easyhouse.model.PropertyStatus;
import net.easyhouse.exception.PropertyAlreadyExistsException;
//import net.housing.springboot.exception.DuplicatePropertyException;
import net.easyhouse.exception.ResourceNotFoundException;

import java.io.IOException;
import java.util.List;
//import java.util.Optional;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

public interface PropertyService {
    List<Property> getAllProperties();
//    Property getPropertyById(Long id) throws ResourceNotFoundException; // initially for seller
    Optional<Property> getPropertyById(Integer id);
//    Property createProperty(Property property) throws DuplicatePropertyException;
//    Optional<Property> findByNameOrImageUrl(String propertyName, String propertyImageUrl); // Declare method
    boolean findIfPropertyExists(String propertyName) throws PropertyAlreadyExistsException;
    Property addProperty(Property property) throws PropertyAlreadyExistsException;
//    Property createProperty(Property property) throws PropertyAlreadyExistsException;
    Property updateProperty(Integer id, Property propertyDetails) throws ResourceNotFoundException;
    void deleteProperty(Integer id) throws ResourceNotFoundException;
    List<Property> getPropertiesBySellerId(Integer sellerId);
    // for upload image
    String storeImage(MultipartFile imageFile) throws IOException; // Add image from device
 // for approve property
    Property approveProperty(Integer id) throws ResourceNotFoundException;
    Property rejectProperty(Integer id) throws ResourceNotFoundException;
    
 // for property approve, get seller id and property status
    List<Property> findPropertiesBySellerIdAndStatus(Integer sellerId, PropertyStatus status);
    List<Property> getApprovedProperties();
}

