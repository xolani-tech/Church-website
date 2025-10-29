const axios = require("axios");

exports.initializePayment = async (req, res) => {
  const { amount, email, name } = req.body;

  // Convert amount to kobo (Paystack uses the smallest currency unit)
  const koboAmount = amount * 100;

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: koboAmount,
        metadata: { name },
        callback_url: "../Frontend/thank-you.html/", // ✅ fixed the typo (was 0.01)
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json", // ✅ fixed missing quotes
        },
      }
    );

    // ✅ fixed res.jon → res.json
    res.json(response.data);
  } catch (error) {
    console.error("Error initializing payment:", error.response?.data || error.message);
    res.status(500).json({ error: "Payment initialization failed" });
  }
};
