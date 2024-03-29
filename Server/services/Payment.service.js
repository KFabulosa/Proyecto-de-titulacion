const axios = require("axios");

class PaymentService {
  async createPayment() {
    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      // payer_email: "test_user_91810408@testuser.com",
      payer_email: "test_user_91810408@testuser.com",
      items: [
        {
          title: "Consulta",
          description: "Consulta Nurgo paquete completo",
          picture_url: "http://www.myapp.com/myimage.jpg",
          category_id: "category123",
          quantity: 1,
          unit_price: 350
        }
      ],
      back_urls: {
        failure: "https://nurgo-clinica.netlify.app/profile.html",
        pending: "https://nurgo-clinica.netlify.app/profile.html",
        success: "https://nurgo-clinica.netlify.app/profile.html"
      }
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return payment.data;
  }

  async createSubscription() {
    const url = "https://api.mercadopago.com/preapproval";

    const body = {
      reason: "Suscripción de ejemplo",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 10,
        currency_id: "ARS"
      },
      back_url: "https://google.com.mx",
      payer_email: "antonio15198able@gmail.com"
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return subscription.data;
  }
}

module.exports = PaymentService;
