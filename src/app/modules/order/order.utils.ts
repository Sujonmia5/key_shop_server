export const paymentSession = async (customerInfo, amount) => {
  try {
    const { name, email, phone } = customerInfo;
    const baseUrl = "https://sandbox.aamarpay.com/jsonpost.php/";
    const formData = {
      cus_name: name,
      cus_email: email,
      cus_phone: phone,
      amount,
      desc: "Amount",
      tran_id: "28c78bb1f45112",
      signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
      store_id: "aamarpaytest",
      currency: "BDT",
      success_url: `http://localhost:5000/api/v1/orders/success`,
      fail_url: `${baseUrl}callback`,
      cancel_url: `${baseUrl}callback`,
      type: "json",
    };
    const res = await fetch("https://sandbox.aamarpay.com/jsonpost.php/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};
