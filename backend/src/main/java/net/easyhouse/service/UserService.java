package net.easyhouse.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import net.easyhouse.exception.EmailAlreadyExistsException;
import net.easyhouse.exception.PhoneAlreadyExistsException;
import net.easyhouse.exception.UsernameAlreadyExistsException;
import net.easyhouse.model.User;
import net.easyhouse.model.UserRole;
import net.easyhouse.repository.UserRepository;
import net.easyhouse.validation.PasswordValidator;
import jakarta.annotation.PostConstruct;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordService passwordService;
    
    @Autowired
    private EmailSenderService emailSenderService;
    
    private final String loginUrl = "http://localhost:4200/easyhouse/login"; // URL to login page

    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
//            throw new RuntimeException("Email is already taken");
        	throw new EmailAlreadyExistsException("Email is already taken");
        }

        if (userRepository.findByUserName(user.getUserName()) != null) {
//            throw new RuntimeException("Username is already taken");
        	throw new UsernameAlreadyExistsException("Username is already taken");
        }
        
        // for phone number taken
        if (userRepository.findByPhone(user.getPhone()) != null) {
//            throw new RuntimeException("Phone number is already taken");
        	throw new PhoneAlreadyExistsException("Phone number is already taken");
        }
        
        // for password regex
        if (!PasswordValidator.isValid(user.getUserPassword())) {
        	throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol");
        }

        // Hash the password before saving
        user.setUserPassword(passwordService.hashPassword(user.getUserPassword()));
        user.setConfirmPassword(passwordService.hashPassword(user.getConfirmPassword()));
        
        User registeredUser = userRepository.save(user);

        // Send email after successful registration
        String subject = "Registration Successful";
        String body = "Dear " + registeredUser.getFirstName() + " " + registeredUser.getLastName() + ",\n\n" +
                      "You have successfully registered with the following details:\n" +
                      "Username: " + registeredUser.getUserName() + "\n" +
                      "Email: " + registeredUser.getEmail() + "\n" +
                      "Phone Number: " + registeredUser.getPhone() + "\n" +
                      "Role: " + registeredUser.getUserRole().toString() + "\n\n" +
                      "You can login using the following link: " + loginUrl + "\n\n" +
                      "Thank you for registering!";
        emailSenderService.sendEmail(registeredUser.getEmail(), subject, body);

        return userRepository.save(user);
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User findUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }
    
    
    // when there are multiple admins in the database
    @PostConstruct
    public void createAdminAccount() {
        List<User> admins = userRepository.findByUserRole(UserRole.ADMIN);
        List<User> superAdmins = userRepository.findByUserRole(UserRole.SUPER_ADMIN);
        
        if ((admins == null || admins.isEmpty()) && (superAdmins == null || superAdmins.isEmpty())) {
            User superAdmin = new User();
            superAdmin.setFirstName("Admin");
            superAdmin.setLastName("User");
            superAdmin.setUserName("admin");
            superAdmin.setPhone("1234567890");
            superAdmin.setEmail("admin@test.com");
            superAdmin.setAddress("Admin Address");
            superAdmin.setUserRole(UserRole.SUPER_ADMIN);
            superAdmin.setUserPassword(passwordService.hashPassword("admin"));
            superAdmin.setConfirmPassword(superAdmin.getUserPassword());
            userRepository.save(superAdmin);
        }
    }

    
    // didn't work when there are multiple admins in the database
//    @PostConstruct
//    public void createAdminAccount() {
//        if (userRepository.findByUserRole(UserRole.ADMIN) == null) {
//            User admin = new User();
//            admin.setFirstName("Admin");
//            admin.setLastName("User");
//            admin.setUserName("admin");
//            admin.setPhone("1234567890");
//            admin.setEmail("admin@test.com");
//            admin.setAddress("Admin Address");
//            admin.setUserRole(UserRole.ADMIN);
//            admin.setUserPassword(passwordService.hashPassword("admin"));
//            admin.setConfirmPassword(admin.getUserPassword());
//            userRepository.save(admin);
//        }
//    }
    
    
	public Optional<User> getUserById(Integer id) // buyer
	{
		return userRepository.findById(id);
	}
    
}