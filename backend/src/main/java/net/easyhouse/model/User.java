package net.easyhouse.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // changed from long to int for consistency

    @Column(name = "first_name", nullable = false)
    @NotEmpty(message = "First name is required")
    private String firstName;

    @Column(name = "last_name", nullable = false)
    @NotEmpty(message = "Last name is required")
    private String lastName;

    @Column(name = "user_name", nullable = false, unique = true)
    @NotEmpty(message = "User name is required")
    private String userName;

    @Column(name = "phone", nullable = false)
    @NotEmpty(message = "Phone number is required")
    private String phone;

    @Column(name = "email", nullable = false, unique = true)
    @Email(message = "Email should be valid")
    @NotEmpty(message = "Email is required")
    private String email;

    @Column(name = "user_password", nullable = false)
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String userPassword;

    @Column(name = "confirm_password", nullable = false)
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String confirmPassword;

    @Column(name = "address", nullable = false)
    @NotEmpty(message = "Address is required")
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_role", nullable = false)
    private UserRole userRole;
    
    

	public User() {
		super();
	}
	
	

	public Integer getId() { //changed
		return id;
	}

	public void setId(Integer id) {  //changed
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public UserRole getUserRole() {
		return userRole;
	}

	public void setUserRole(UserRole userRole) {
		this.userRole = userRole;
	}

	public User(Integer id, @NotEmpty(message = "First name is required") String firstName,
			@NotEmpty(message = "Last name is required") String lastName,
			@NotEmpty(message = "User name is required") String userName,
			@NotEmpty(message = "Phone number is required") String phone,
			@Email(message = "Email should be valid") @NotEmpty(message = "Email is required") String email,
			@Size(min = 8, message = "Password must be at least 8 characters long") String userPassword,
			@Size(min = 8, message = "Password must be at least 8 characters long") String confirmPassword,
			@NotEmpty(message = "Address is required") String address, UserRole userRole) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.userName = userName;
		this.phone = phone;
		this.email = email;
		this.userPassword = userPassword;
		this.confirmPassword = confirmPassword;
		this.address = address;
		this.userRole = userRole;
	}

    
}