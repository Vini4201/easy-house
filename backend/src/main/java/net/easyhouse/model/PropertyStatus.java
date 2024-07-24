package net.easyhouse.model;

public enum PropertyStatus {
    AVAILABLE("AVAILABLE"),
    SOLD("SOLD"),
	// for property approval
    PENDING("PENDING"),
    REJECTED("REJECTED"),
    APPROVED("APPROVED");

    private final String displayName;

    PropertyStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    @Override
    public String toString() {
        return this.displayName;
    }
}