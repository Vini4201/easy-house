package net.easyhouse.exception;

public class PhoneAlreadyExistsException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public PhoneAlreadyExistsException(String message) {
        super(message);
    }
}
