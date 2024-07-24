package net.easyhouse.repository;

import java.util.List;
//import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import net.easyhouse.model.Property;
import net.easyhouse.model.PropertyStatus;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Integer> {
	
	// for property approve, get seller id and property status
	List<Property> findBySellerIdAndPropertyStatus(Integer sellerId, PropertyStatus status);
	List<Property> findByPropertyStatus(PropertyStatus status);
	
	List<Property> findBySellerId(Integer sellerId);
//  Optional<Property> findByNameOrImageUrl(String propertyName, String propertyImageUrl);
	Property findByPropertyName(String propertyName);

}