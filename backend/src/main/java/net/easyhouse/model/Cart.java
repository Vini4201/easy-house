package net.easyhouse.model;

//import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "carts")
public class Cart {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id; // changed to integer from long for consistency
	
//	@NotNull
//	@Column(name = "property_id")
//	private Integer propertyId;

	@NotNull
	@Column(name = "buyer_id")
	private Integer buyerId; // changed for consistency
	
	@NotNull
	@Column(name = "property_name")
	private String propertyName;

	@NotNull
	@Column(name = "property_cost") 
	private Double propertyCost; //changed from BigDecimal to double for consistency

	@ManyToOne
    @JoinColumn(name = "property_id", nullable = false)
	private Property property;
	
	public Integer getId() { //changed for consistency
		return id;
	}

	public void setId(Integer id) { //changed for consistency
		this.id = id;
	}

//	public Integer getPropertyId() {
//		return propertyId;
//	}
//
//	public void setPropertyId(Integer propertyId) {
//		this.propertyId = propertyId;
//	}

	public Integer getBuyerId() { // changed for consistency
		return buyerId; 
	}

	public void setBuyerId(Integer buyerId) { //changed for consistency
		this.buyerId = buyerId; 
	}

	public String getPropertyName() {
		return propertyName;
	}

	public void setPropertyName(String propertyName) {
		this.propertyName = propertyName;
	}

	public Double getPropertyCost() { // changed to double
		return propertyCost;
	}

	public void setPropertyCost(Double propertyCost) { // changed from double
		this.propertyCost = propertyCost;
	}
	
	public Property getProperty() {
        return property;
    }

    public void setProperty(Property property) {
        this.property = property;
    }
	
}
