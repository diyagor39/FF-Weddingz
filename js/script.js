function toggleMenu(){
    const nav = document.querySelector("nav");
    nav.classList.toggle("active");
}

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  bookingForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      name: bookingForm.name.value,
      phone: bookingForm.phone.value,
      email: bookingForm.email.value,
      service: bookingForm.service.value,
      date: bookingForm.date.value,
      message: bookingForm.message.value
    };

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        alert("Booking submitted successfully ✅");
        bookingForm.reset();
      } else {
        alert("Booking failed ❌");
      }
    } catch (error) {
      alert("Backend server running hai ya nahi check karo ❌");
      console.log(error);
    }
  });
}