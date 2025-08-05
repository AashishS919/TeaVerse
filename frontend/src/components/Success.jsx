import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("data");
  const decoded = jwtDecode(token);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const verifyPaymentAndUpdateStatus = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/payment-status",
        {
          product_id: decoded.transaction_uuid,
        }
      );

      if (response.status === 200) {
        const orderRes = await axios.post("/api/order/online", {
          items: JSON.parse(localStorage.getItem("cartItems")),
          address: localStorage.getItem("selectedAddress"),
          transactionId: decoded.transaction_uuid,
        });

        if (orderRes.data.success) {
          localStorage.removeItem("cartItems");
          localStorage.removeItem("selectedAddress");
          setIsSuccess(true);
          setIsLoading(false);

          // Redirect to home after 3 seconds
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          throw new Error("Order creation failed");
        }
      } else {
        throw new Error("Payment verification failed");
      }
    } catch (error) {
      console.error("Error in payment/order process:", error);
      setIsLoading(false);
      setIsSuccess(false);
    }
  };

  useEffect(() => {
    verifyPaymentAndUpdateStatus();
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center text-center">
      {isLoading ? (
        <p className="text-xl text-gray-600">Verifying payment...</p>
      ) : isSuccess ? (
        <div>
          <h2 className="text-green-600 text-2xl font-semibold mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-500">Redirecting to homepage...</p>
        </div>
      ) : (
        <div>
          <h2 className="text-red-600 text-2xl font-semibold mb-2">
            Payment Failed!
          </h2>
          <p className="text-gray-500">Please try again later.</p>
        </div>
      )}
    </div>
  );
};

export default Success;
