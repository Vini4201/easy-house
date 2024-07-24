package net.easyhouse.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.easyhouse.model.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart,Integer> { 

	List<Cart> findByBuyerId(Integer buyerId);
	boolean existsByBuyerIdAndPropertyId(Integer buyerId,Integer propertyId);
}