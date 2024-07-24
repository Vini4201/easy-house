package net.easyhouse.model;

//import java.math.BigDecimal;
import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
//import jakarta.persistence.Temporal;
//import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "bookings")
public class Booking {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  
  @NotNull
  @Column(name = "order_id")
  private String orderId;

  @Column(name = "buyer_id")
  private Integer buyerId;
  
//  @Column(name = "seller_id")
//  private Integer sellerId;
  
  @ManyToOne
  @JoinColumn(name = "property_id", nullable = false)
  private Property property;
  
  @NotNull
  @Column(name = "property_name")
  private String propertyName;
  
  @NotNull
  @Column(name = "property_cost")
  private Double propertyCost; // changed my code from BigDecimal to double for consistency
  
  @NotNull
  @Enumerated(EnumType.STRING)
  @Column(name = "payment_method")
  private PaymentMethod paymentMethod;
  
  public enum PaymentMethod {
      CASH, CHEQUE, ONLINE;
  }
  
  @NotNull
  @Enumerated(EnumType.STRING)
  @Column(name = "payment_status")
  private PaymentStatus paymentStatus;
  
  public enum PaymentStatus {
      PENDING, FAILED, SUCCESS;
  }
  
  @NotNull
  @Column(name = "property_buy_date")
  private Date propertyBuyDate;

  public Integer getId() {
      return id;
  }

  public void setId(Integer id) {
      this.id = id;
  }

  public String getOrderId() {
      return orderId;
  }

  public void setOrderId(String orderId) {
      this.orderId = orderId;
  }

  public Integer getBuyerId() {
      return buyerId;
  }

  public void setBuyerId(Integer buyerId) {
      this.buyerId = buyerId;
  }

//  public Integer getSellerId() {
//      return sellerId;
//  }
//
//  public void setSellerId(Integer sellerId) {
//      this.sellerId = sellerId;
//  }

  public String getPropertyName() {
      return propertyName;
  }

  public void setPropertyName(String propertyName) {
      this.propertyName = propertyName;
  }

  public Double getPropertyCost() { //changed to double
      return propertyCost;
  }

  public void setPropertyCost(Double propertyCost) { //changed to double
      this.propertyCost = propertyCost;
  }

  public PaymentMethod getPaymentMethod() {
      return paymentMethod;
  }

  public void setPaymentMethod(PaymentMethod paymentMethod) {
      this.paymentMethod = paymentMethod;
  }

  public PaymentStatus getPaymentStatus() {
      return paymentStatus;
  }

  public void setPaymentStatus(PaymentStatus paymentStatus) {
      this.paymentStatus = paymentStatus;
  }

  public Date getPropertyBuyDate() {
      return propertyBuyDate;
  }

  public void setPropertyBuyDate(Date propertyBuyDate) {
      this.propertyBuyDate = propertyBuyDate;
  }

  public Property getProperty() {
      return property;
  }

  public void setProperty(Property property) {
      this.property = property;
  }
}