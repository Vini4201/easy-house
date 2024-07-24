package net.easyhouse.model;

//import java.math.BigDecimal;
//import java.sql.Date;
import java.time.LocalDate;

import jakarta.persistence.*;


@Entity
@Table(name = "properties")
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "seller_id")
    private Integer sellerId;

    @Column(name = "property_name")
    private String propertyName;

    @Column(name = "property_type")
    private String propertyType;

    @Column(name = "property_cost")
    private Double propertyCost;

    @Column(name = "property_area")
    private Float propertyArea;

    @Column(name = "property_address")
    private String propertyAddress;

    @Column(name = "property_description")
    private String propertyDescription;

    @Column(name = "property_image_url")
    private String propertyImageUrl;

    @Column(name = "property_status")
    @Enumerated(EnumType.STRING)
//    private PropertyStatus propertyStatus;
 // for property approval
    private PropertyStatus propertyStatus = PropertyStatus.PENDING; // Default to PENDING

    @Column(name = "property_post_date")
//    @Temporal(TemporalType.DATE)
    private LocalDate propertyPostDate;
    
    // Default Constructor
    public Property() {}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getSellerId() {
		return sellerId;
	}

	public void setSellerId(Integer sellerId) {
		this.sellerId = sellerId;
	}

	public String getPropertyName() {
		return propertyName;
	}

	public void setPropertyName(String propertyName) {
		this.propertyName = propertyName;
	}

	public String getPropertyType() {
		return propertyType;
	}

	public void setPropertyType(String propertyType) {
		this.propertyType = propertyType;
	}

	public Double getPropertyCost() {
		return propertyCost;
	}

	public void setPropertyCost(Double propertyCost) {
		this.propertyCost = propertyCost;
	}

	public float getPropertyArea() {
		return propertyArea;
	}

	public void setPropertyArea(Float propertyArea) {
		this.propertyArea = propertyArea;
	}

	public String getPropertyAddress() {
		return propertyAddress;
	}

	public void setPropertyAddress(String propertyAddress) {
		this.propertyAddress = propertyAddress;
	}

	public String getPropertyDescription() {
		return propertyDescription;
	}

	public void setPropertyDescription(String propertyDescription) {
		this.propertyDescription = propertyDescription;
	}

	public String getPropertyImageUrl() {
		return propertyImageUrl;
	}

	public void setPropertyImageUrl(String propertyImageUrl) {
		this.propertyImageUrl = propertyImageUrl;
	}

	public PropertyStatus getPropertyStatus() {
		return propertyStatus;
	}

	public void setPropertyStatus(PropertyStatus propertyStatus) {
		this.propertyStatus = propertyStatus;
	}

	public LocalDate getPropertyPostDate() {
		return propertyPostDate;
	}

	public void setPropertyPostDate(LocalDate propertyPostDate) {
		this.propertyPostDate = propertyPostDate;
	}

	public Property(Integer sellerId, String propertyName, String propertyType, Double propertyCost,
			Float propertyArea, String propertyAddress, String propertyDescription, String propertyImageUrl,
			PropertyStatus propertyStatus, LocalDate propertyPostDate) {
		super();
		this.sellerId = sellerId;
		this.propertyName = propertyName;
		this.propertyType = propertyType;
		this.propertyCost = propertyCost;
		this.propertyArea = propertyArea;
		this.propertyAddress = propertyAddress;
		this.propertyDescription = propertyDescription;
		this.propertyImageUrl = propertyImageUrl;
		this.propertyStatus = propertyStatus;
		this.propertyPostDate = propertyPostDate;
	}    
}