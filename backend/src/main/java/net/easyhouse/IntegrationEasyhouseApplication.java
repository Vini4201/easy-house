package net.easyhouse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
//@CrossOrigin("http://localhost:4200")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:52441"})
public class IntegrationEasyhouseApplication {

	public static void main(String[] args) {
		SpringApplication.run(IntegrationEasyhouseApplication.class, args);
	}

}
