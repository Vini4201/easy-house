package net.easyhouse.controller;

import net.easyhouse.model.User;
import net.easyhouse.model.UserRole;
import net.easyhouse.service.Admin_user_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/easyhouse/users") // changed from /users to /easyhouse/users
//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:52441"})
public class Admin_user_controller {

    @Autowired
    private Admin_user_service userService;

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Integer id) {
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Integer id, @RequestBody User userDetails, @RequestParam UserRole currentUserRole) {
        User existingUser = userService.getUserById(id).orElseThrow(() -> new RuntimeException("User not found"));
        
        if (currentUserRole != UserRole.SUPER_ADMIN && existingUser.getUserRole() == UserRole.SUPER_ADMIN) {
            throw new RuntimeException("Only SUPER_ADMIN can modify SUPER_ADMIN user.");
        }

        if (currentUserRole == UserRole.ADMIN && existingUser.getUserRole() == UserRole.SUPER_ADMIN) {
            throw new RuntimeException("ADMIN cannot modify SUPER_ADMIN user.");
        }

        return userService.updateUser(id, userDetails, existingUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Integer id, @RequestParam UserRole currentUserRole) {
        User existingUser = userService.getUserById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (currentUserRole != UserRole.SUPER_ADMIN && existingUser.getUserRole() == UserRole.SUPER_ADMIN) {
            throw new RuntimeException("Only SUPER_ADMIN can delete SUPER_ADMIN user.");
        }

        if (currentUserRole == UserRole.ADMIN && existingUser.getUserRole() == UserRole.SUPER_ADMIN) {
            throw new RuntimeException("ADMIN cannot delete SUPER_ADMIN user.");
        }

        userService.deleteUserById(id, existingUser.getUserRole());

        return ResponseEntity.ok().build();
    }


    @GetMapping("/role/{role}")
    public List<User> getUsersByRole(@PathVariable String role) {
        return userService.getUsersByRole(role);
    }
}
