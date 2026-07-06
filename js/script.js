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

// Dynamic navbar integration for authentication
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  if (nav) {
    const userLoggedIn = localStorage.getItem("userLoggedIn") === "true";
    const userName = localStorage.getItem("userName");
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

    // If admin is logged in, show a link to the admin dashboard
    if (isAdminLoggedIn) {
      const adminLink = document.createElement("a");
      adminLink.href = "admin.html";
      adminLink.innerHTML = "🛠️ Admin";
      adminLink.style.color = "#d6a85d"; // Highlight the admin link with premium color
      nav.appendChild(adminLink);
    }

    // Create auth link
    const authLink = document.createElement("a");
    authLink.id = "navAuthLink";

    if (userLoggedIn || isAdminLoggedIn) {
      authLink.href = "#";
      const displayName = isAdminLoggedIn ? "Admin" : (userName || "User");
      authLink.innerHTML = `Logout (${displayName})`;
      authLink.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("userLoggedIn");
        localStorage.removeItem("userName");
        localStorage.removeItem("isAdminLoggedIn");
        alert("Logged out successfully ✅");
        window.location.reload();
      });
    } else {
      authLink.href = "user-auth.html";
      authLink.innerHTML = "Login";
    }

    nav.appendChild(authLink);
  }
});