import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify"
const PaymentComponent = ({ setIsDoc }) => {
  const [amount, setAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const handlePayment = async () => {
    setLoading(true);

    try {
      const { data } = await axios.post(
        'https://funraiser.onrender.com/pay/order',
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.data) {
        const { id: order_id } = data.data;
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: amount * 100,
          currency: "INR",
          name: "Fund Raiser",
          description: "Payment for Fundraiser",
          order_id,
          handler: async function (response) {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

            try {

              const verifyResponse = await axios.post(
                'https://funraiser.onrender.com/pay/verify',
                {
                  razorpay_order_id,
                  razorpay_payment_id,
                  razorpay_signature,
                  amount: amount,
                  fundId: localStorage.getItem('selectedFundId'),
                  userId: localStorage.getItem('userId'),
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              setPaymentStatus(verifyResponse.data.message);
              toast.success("Payment Successfull");
              setIsDoc('');
            } catch (error) {
              toast.error("Transaction failed")
              console.error("Payment verification failed:", error);
              setPaymentStatus("Payment verification failed. Please try again.");
            }
          },
          prefill: {
            name: 'User Name',
            email: 'user@example.com',
            contact: '9876543210',
          },
          theme: {
            color: '#F37254',
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

      }
    } catch (error) {
      toast.error('Transaction Failed')
      console.error('Error creating payment order:', error);
      setPaymentStatus("Error creating payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mt-8 flex flex-col items-center w-full gap-4'>
      <h2 className='font-bold text-xl'>Donate Now</h2>
      <div className=''>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className='border mr-2 py-2 px-3 rounded-lg border-black text-black'
        />
        <button onClick={handlePayment} disabled={loading}
          className='border px-3 py-2 rounded-lg bg-black text-white hover:bg-[#aa4528] transition duration-300'>
          {loading ? 'Processing Payment...' : 'Pay Now'}
        </button>
      </div>


      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default PaymentComponent;
