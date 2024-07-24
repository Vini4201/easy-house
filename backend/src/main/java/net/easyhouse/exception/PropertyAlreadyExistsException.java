package net.easyhouse.exception;

public class PropertyAlreadyExistsException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public PropertyAlreadyExistsException(String message) {
        super(message);
    }
}