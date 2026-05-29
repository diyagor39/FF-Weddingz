const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

// TAB SWITCH
loginTab.addEventListener("click", () => {
  loginForm.style.display = "block";
  signupForm.style.display = "none";

  loginTab.classList.add("active");
  signupTab.classList.remove("active");
});

signupTab.addEventListener("click", () => {
  signupForm.style.display = "block";
  loginForm.style.display = "none";

  signupTab.classList.add("active");
  loginTab.classList.remove("active");
});

// SIGNUP
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userData = {
    name: document.getElementById("signupName").value,
    email: document.getElementById("signupEmail").value,
    password: document.getElementById("signupPassword").value,
  };

  const response = await fetch("http://localhost:5000/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const result = await response.json();

  if (result.success) {
    alert("Signup successful ✅ Now login");

    signupForm.reset();
    loginTab.click();
  } else {
    alert(result.message || "Signup failed ❌");
  }
});

// LOGIN
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const loginData = {
    email: document.getElementById("loginEmail").value,
    password: document.getElementById("loginPassword").value,
  };

  const response = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  const result = await response.json();

  if (result.success) {
    alert("Login successful ✅");

    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("userName", result.user.name);

    window.location.href = "index.html";
  } else {
    alert(result.message || "Invalid email or password ❌");
  }
});

document.getElementById("goToSignup").addEventListener("click", () => {
  signupTab.click();
});

const goToSignup = document.getElementById("goToSignup");

if (goToSignup) {
  goToSignup.addEventListener("click", () => {
    signupTab.click();
  });
}