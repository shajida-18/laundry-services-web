let cartItems = [];
let total = 0;
let cartTableBody = document.querySelector("#cart-table tbody");
let totalAmount = document.getElementById("total-amount");

function showCart() {
  cartTableBody.innerHTML = "";
  total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    let item = cartItems[i];
    total = total + item.price;
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.innerText = i + 1;
    let td2 = document.createElement("td");
    td2.innerText = item.name;
    let td3 = document.createElement("td");
    td3.innerText = "₹" + item.price;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    cartTableBody.appendChild(tr);
  }
  totalAmount.innerText = total;
}

// add item
let addBtns = document.querySelectorAll(".add-btn");
for (let i = 0; i < addBtns.length; i++) {
  addBtns[i].addEventListener("click", function () {
    let name = this.getAttribute("data-name");
    let price = parseInt(this.getAttribute("data-price"));
    let obj = { name: name, price: price };
    cartItems.push(obj);
    this.style.display = "none";
    this.nextElementSibling.style.display = "inline-block";
    showCart();
  });
}

// remove item
let removeBtns = document.querySelectorAll(".remove-btn");
for (let i = 0; i < removeBtns.length; i++) {
  removeBtns[i].addEventListener("click", function () {
    let name = this.getAttribute("data-name");
    cartItems = cartItems.filter(function (item) {
      return item.name !== name;
    });
    this.style.display = "none";
    this.previousElementSibling.style.display = "inline-block";
    showCart();
  });
}
// Booking form
document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (cartItems.length === 0) {
    document.getElementById("confirmationMessage").textContent =
      "Please add at least one service to your cart before booking!";
    document.getElementById("confirmationMessage").style.color = "red";
    return;
  }
  // Collect user input
  const name = this.user_name.value;
  const email = this.user_email.value;
  const phone = this.user_phone.value;

  // Build cart summary
  const cartDetails = cartItems
    .map((i) => `${i.name} - ₹${i.price}`)
    .join("\n");

  // Send email via EmailJS
  emailjs
    .send("service_s4272sg", "template_5rsxw2o", {
      user_name: name,
      user_email: email,
      user_phone: phone,
      cart: cartDetails,
      total: total,
    })
    .then(
      () => {
        document.getElementById("confirmationMessage").textContent =
          "Email has been sent succesfully";
        document.getElementById("confirmationMessage").style.color = "green";
        document.getElementById("confirmationMessage").style.display = "block";
        this.reset();
        cartItems = [];
        total = 0;
        showCart();
        document.querySelectorAll(".add-btn").forEach((btn) => {
          btn.style.display = "inline-block";
        });
        document.querySelectorAll(".remove-btn").forEach((btn) => {
          btn.style.display = "none";
        });
      },
      (error) => {
        alert("Booking failed: " + JSON.stringify(error));
      }
    );
});

