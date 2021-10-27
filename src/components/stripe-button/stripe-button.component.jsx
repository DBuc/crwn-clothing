import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51JotO8FsfohfP3t7AkNu7jwLYCDA0DQrkc19O8i0XWxbBja6qL6jN33Ibi9xb51AEZfwmMYFWZwh8JZCueIxWKbX00IWezzxa0';
    const onToken = token => {
        alert('Payment Successful')
    }
    return (
        <StripeCheckout
          label='Pay Now'
          name='CRWN Clothing Ltd.'
          billingAddress
          shippingAddress
          image='https://svgshare.com/i/CUz.svg'
          description={`Your total is $${price}`}
          amount={priceForStripe}
          panelLabel='Pay Now'
          token={onToken}
          stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;