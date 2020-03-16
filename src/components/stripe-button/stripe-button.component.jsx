import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_k1A74rIzxjnbNpYWtgVLMqmb00l3ZbgpIh";

  const onToken = token => {
    //not processing payment so it's a console log + alert instead of backend integrated payments
    console.log(token);
    alert("Payment Successful! (Not Really)");
  };

  return (
    <StripeCheckout
      label="Pay Now (Demo)"
      name="E-Commerce App"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
