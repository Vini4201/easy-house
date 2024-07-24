package net.easyhouse.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class CartNotEmptyException extends RuntimeException {
	public CartNotEmptyException(String message) {
		super(message);
	}
}
