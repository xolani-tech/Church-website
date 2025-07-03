function openForm(type) {
  document.getElementById("giving-form").classList.remove("hidden");
  document.getElementById("form-title").innerText = `${type.charAt(0).toUpperCase() + type.slice(1)} Giving Form`;
  document.getElementById("giving-type").value = type;
}

function closeForm() {
  document.getElementById("giving-form").classList.add("hidden");
}

function submitPaystack() {
  const amount = document.querySelector('#donation-form input[name="amount"]').value;
  const type = document.getElementById("giving-type").value;
  alert(`Paystack donation for ${type} of R${amount} would be processed here.`);

  // 👉 Here you'd call Paystack SDK logic
}

function submitPaypal() {
  const amount = document.querySelector('#donation-form input[name="amount"]').value;
  const type = document.getElementById("giving-type").value;
  alert(`PayPal donation for ${type} of R${amount} would be processed here.`);

  // 👉 Here you'd redirect to PayPal checkout URL
}
