package net.easyhouse.repository;

import net.easyhouse.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import net.easyhouse.model.UserRole; // Import UserRole

import java.util.List;

public interface Admin_user_repository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
    User findByUserName(String userName);
    List<User> findByUserRole(UserRole role); // Use UserRole type here
}
