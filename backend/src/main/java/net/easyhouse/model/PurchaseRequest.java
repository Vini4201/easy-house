package net.easyhouse.model;

import java.util.List;

public class PurchaseRequest {

	private Integer buyerId;
	private List<Integer> cartItemIds;
	private Booking.PaymentMethod paymentMethod;
	
	
	public Integer getBuyerId() {
		return buyerId;
	}
	public void setBuyerId(Integer buyerId) {
		this.buyerId = buyerId;
	}
	public List<Integer> getCartItemIds() {
		return cartItemIds;
	}
	public void setCartItemIds(List<Integer> cartItemIds) {
		this.cartItemIds = cartItemIds;
	}
	public Booking.PaymentMethod getPaymentMethod() {
		return paymentMethod;
	}
	public void setPaymentMethod(Booking.PaymentMethod paymentMethod) {
		this.paymentMethod = paymentMethod;
	}
	
}