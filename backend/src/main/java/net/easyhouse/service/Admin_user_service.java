package net.easyhouse.service;

import net.easyhouse.model.Property;
import net.easyhouse.model.User;
import net.easyhouse.model.UserRole;
import net.easyhouse.repository.Admin_user_repository;
import net.easyhouse.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class Admin_user_service {

    @Autowired
    private Admin_user_repository userRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    private PasswordService passwordService;

    @Transactional
    public User updateUser(Integer id, User userDetails, User currentUser) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found for this id :: " + id));

        // Ensure only superadmin can update any user, while admin cannot update superadmin
        if (currentUser.getUserRole() == UserRole.ADMIN && user.getUserRole() == UserRole.SUPER_ADMIN) {
            throw new RuntimeException("Admin cannot update superadmin.");
        }

        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setUserName(userDetails.getUserName());
        user.setPhone(userDetails.getPhone());
        user.setEmail(userDetails.getEmail());

        // Hash the password before updating
        user.setUserPassword(passwordService.hashPassword(userDetails.getUserPassword()));
        user.setConfirmPassword(passwordService.hashPassword(userDetails.getConfirmPassword()));

        user.setAddress(userDetails.getAddress());
        user.setUserRole(userDetails.getUserRole());

        User updatedUser = userRepository.save(user);

        // Send email notification
        String subject = "Profile Updated";
        String text = "Dear " + user.getFirstName() + ",\n\nYour profile has been updated successfully.\n\nRegards,\nAdmin";
        emailSenderService.sendEmail(user.getEmail(), subject, text);

        return updatedUser;
    }

    @Transactional
    public User saveUser(User user) {
        // Hash the password before saving
        user.setUserPassword(passwordService.hashPassword(user.getUserPassword()));
        user.setConfirmPassword(passwordService.hashPassword(user.getConfirmPassword()));

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    @Transactional
    public void deleteUserById(Integer id, UserRole currentUserRole) { // Corrected method signature
        // Retrieve user details before deletion
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found for this id :: " + id));

        // Ensure only superadmin can delete any user, while admin cannot delete superadmin
        if (currentUserRole == UserRole.ADMIN && user.getUserRole() == UserRole.SUPER_ADMIN) {
            throw new RuntimeException("Admin cannot delete superadmin.");
        }

        // Retrieve properties of the user
        List<Property> properties = propertyRepository.findBySellerId(id);

        // Delete properties
        for (Property property : properties) {
            propertyRepository.delete(property);
            // Send email notification for property deletion
            String propertySubject = "Property Deleted";
            String propertyText = "Dear " + user.getFirstName() + ",\n\nYour property with the following details has been deleted:\n\n" +
                    "Name: " + property.getPropertyName() + "\n" +
                    "Cost: " + property.getPropertyCost() + "\n" +
                    "Address: " + property.getPropertyAddress() + "\n\nRegards,\nAdmin";
            emailSenderService.sendEmail(user.getEmail(), propertySubject, propertyText);
        }

        // Delete user
        userRepository.deleteById(id);

        // Send email notification for user deletion
        String subject = "Profile Deleted";
        String text = "Dear " + user.getFirstName() + ",\n\nYour profile has been deleted.\n\nRegards,\nAdmin";
        emailSenderService.sendEmail(user.getEmail(), subject, text);
    }

//    public List<User> getUsersByRole(String role) {
//        // Implement method to fetch users by role if needed
//        return null;
//    }
    
    public List<User> getUsersByRole(String role) {
        UserRole userRole = UserRole.valueOf(role.toUpperCase()); // Convert String to UserRole enum
        return userRepository.findByUserRole(userRole);
    }
}
