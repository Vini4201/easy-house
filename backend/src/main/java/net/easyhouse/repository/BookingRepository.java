package net.easyhouse.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.easyhouse.model.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    List<Booking> findByPropertyIdIn(List<Integer> propertyIds);
    List<Booking> findByBuyerId(Integer buyerId);
    boolean existsByBuyerIdAndPropertyId(Integer buyerId,Integer propertyId);
}