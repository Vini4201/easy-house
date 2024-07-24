package net.easyhouse.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import net.easyhouse.exception.EmailAlreadyExistsException;
import net.easyhouse.exception.PhoneAlreadyExistsException;
import net.easyhouse.exception.UsernameAlreadyExistsException;
import net.easyhouse.model.LoginRequest;
import net.easyhouse.model.User;
import net.easyhouse.model.UserRole;
import net.easyhouse.service.PasswordService;
import net.easyhouse.service.UserService;

@RestController
@RequestMapping("/easyhouse")
//@CrossOrigin("http://localhost:4200")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:52441"})
public class UserController {
	
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordService passwordService;
    

    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@Valid @RequestBody User user, HttpServletResponse response) {
        try {
            User u = userService.registerUser(user);
            return ResponseEntity.status(HttpStatus.OK).body(u);
        } //catch (RuntimeException e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", e.getMessage()));
//        }
            // for already exists
            catch (EmailAlreadyExistsException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is already taken");
            } catch (UsernameAlreadyExistsException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username is already taken");
            } catch (PhoneAlreadyExistsException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Phone number is already taken");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
            }
    }

    
    //---------------------------- TO TRY ----------------------------
    
//    @PostMapping("/login")
//    public ResponseEntity<Map<String, String>> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
//        User user = userService.findUserByEmail(loginRequest.getEmail());
//        if (user != null && passwordService.checkPassword(loginRequest.getUserPassword(), user.getUserPassword())) {
//            Map<String, String> response = new HashMap<>();
//            response.put("message", user.getUserName() + " has successfully logged in");
//            response.put("role", user.getUserRole().toString());
//            response.put("id", String.valueOf(user.getId())); // Common ID for all users
//            
//            // Check the user role and set additional response items accordingly
//            if (user.getUserRole() == UserRole.SELLER) {
//                response.put("sellerId", String.valueOf(user.getId()));
//            } else if (user.getUserRole() == UserRole.BUYER) {
//                response.put("buyerId", String.valueOf(user.getId()));
//            } else if (user.getUserRole() == UserRole.ADMIN) {
//                // Optionally, you can add a specific message or log for admin
//                response.put("adminId", String.valueOf(user.getId())); // Using same id as user ID
//            } else {
//                // Handle the case where userRole is not recognized
//                response.put("message", "Unknown user role");
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
//            }
//
//            return ResponseEntity.status(HttpStatus.OK).body(response);
//        } else {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "Invalid email or password"));
//        }
//    }
    
    
//    @PostMapping("/login")
//    public ResponseEntity<Map<String, Object>> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
//        User user = userService.findUserByEmail(loginRequest.getEmail());
//        Map<String, Object> response = new HashMap<>();
//        if (user != null && passwordService.checkPassword(loginRequest.getUserPassword(), user.getUserPassword())) {
//            response.put("role", user.getUserRole().toString());
//            response.put("message", user.getUserName() + " has successfully logged in");
//            return ResponseEntity.ok(response);  // Return 200 OK
//        } else {
//            response.put("message", "Invalid email or password");
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);  // Return 400 Bad Request for failure
//        }
//    }

    
    
    //---------------- WORKING BEFORE RED LOGOUT BUTTON -------------------
    
//    @PostMapping("/login")
//    public ResponseEntity<Map<String, String>> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
//        User user = userService.findUserByEmail(loginRequest.getEmail());
//        if (user != null && passwordService.checkPassword(loginRequest.getUserPassword(), user.getUserPassword())) {
//            Map<String, String> response = new HashMap<>();
//            response.put("message", user.getUserName() + " has successfully logged in");
//            response.put("role", user.getUserRole().toString());
//            if (user.getUserRole() == UserRole.SELLER) {
//                response.put("sellerId", String.valueOf(user.getId())); // Convert int to String
//            }
//            return ResponseEntity.status(HttpStatus.OK).body(response);
//        } else {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "Invalid email or password"));
//        }
//    }


    
    
    // RESPONDING WITH 302 STATUS WHICH FRONTEND IS CONSIDERING AS AN ERROR AS IT ACCPETS ONLY 200-299
    
//    @PostMapping("/login")
//    public ResponseEntity<Map<String, String>> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
//        User user = userService.findUserByEmail(loginRequest.getEmail());
//        if (user != null && passwordService.checkPassword(loginRequest.getUserPassword(), user.getUserPassword())) {
//            Map<String, String> response = new HashMap<>();
//            response.put("message", user.getUserName() + " has successfully logged in");
//            response.put("role", user.getUserRole().toString());
//            return ResponseEntity.status(HttpStatus.OK).body(response);
//        } else {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "Invalid email or password"));
//        }
//    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        System.out.println("Received login request: " + loginRequest); // Log received login request
        
        // Fetch the user by email
        User user = userService.findUserByEmail(loginRequest.getEmail());

        // Additional logging for debugging
        if (user == null) {
            System.out.println("User not found with email: " + loginRequest.getEmail());
        } else {
            System.out.println("User found: " + user.getUserName() + ", role: " + user.getUserRole());
        }

        // Verify the password
        boolean isPasswordCorrect = passwordService.checkPassword(loginRequest.getUserPassword(), user.getUserPassword());
        if (!isPasswordCorrect) {
            System.out.println("Password mismatch for user: " + loginRequest.getEmail());
        }

        if (user != null && isPasswordCorrect) {
            Map<String, Object> response = new HashMap<>();
            response.put("userId", user.getId());
            response.put("message", user.getUserName() + " has successfully logged in");
            response.put("role", user.getUserRole().toString());

            if (user.getUserRole() == UserRole.SELLER) {
                response.put("sellerId", String.valueOf(user.getId()));
            } else if (user.getUserRole() == UserRole.ADMIN || user.getUserRole() == UserRole.SUPER_ADMIN) {
                response.put("adminId", String.valueOf(user.getId()));
            } else if (user.getUserRole() == UserRole.BUYER) {
                response.put("buyerId", String.valueOf(user.getId()));
            } else {
                // Handle the case where userRole is not recognized
                response.put("message", "Unknown user role");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "Invalid email or password"));
        }
    }



    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logoutUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // Get the session if it exists
        if (session != null) {
            session.invalidate(); // Invalidate the session
        }
        Map<String, String> response = new HashMap<>();
        response.put("message", "User has successfully logged out");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    @GetMapping("/status")
    public ResponseEntity<Map<String, String>> checkStatus(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // Get the session if it exists
        Map<String, String> response = new HashMap<>();
        if (session != null && session.getAttribute("user") != null) {
            User user = (User) session.getAttribute("user");
            response.put("message", "User is authenticated");
            response.put("userRole", user.getUserRole().toString());
        } else {
            response.put("message", "User is not authenticated");
        }
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    
}

