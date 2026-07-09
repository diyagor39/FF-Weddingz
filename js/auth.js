// ============================================================
// FF Weddingz — Auth Script (user-auth.html)
// Handles: Tab switching, User Signup, User Login, Admin Login
// ============================================================

// ---- DOM References ----
const loginTab  = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const adminTab  = document.getElementById("adminTab");

const loginForm  = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const adminForm  = document.getElementById("adminForm");

const showSignupLink    = document.getElementById("showSignupLink");
const showLoginLink     = document.getElementById("showLoginLink");
const showUserLoginLink = document.getElementById("showUserLoginLink");
const forgotPassword      = document.getElementById("forgotPassword");
const forgotPasswordSignup = document.getElementById("forgotPasswordSignup");

// ---- Tab Switcher ----
function showForm(formToShow, activeTabBtn) {
  [loginForm, signupForm, adminForm].forEach(f => {
    if (f) f.style.display = "none";
  });
  [loginTab, signupTab, adminTab].forEach(t => {
    if (t) t.classList.remove("active");
  });
  if (formToShow) formToShow.style.display = "flex";
  if (activeTabBtn) activeTabBtn.classList.add("active");
}

if (loginTab)  loginTab.addEventListener("click",  () => showForm(loginForm,  loginTab));
if (signupTab) signupTab.addEventListener("click", () => showForm(signupForm, signupTab));
if (adminTab)  adminTab.addEventListener("click",  () => showForm(adminForm,  adminTab));

// ---- Link shortcuts ----
if (showSignupLink)    showSignupLink.addEventListener("click",    () => signupTab && signupTab.click());
if (showLoginLink)     showLoginLink.addEventListener("click",     () => loginTab  && loginTab.click());
if (showUserLoginLink) showUserLoginLink.addEventListener("click", () => loginTab  && loginTab.click());

// ---- Forgot password ----
if (forgotPassword) {
  forgotPassword.addEventListener("click", () => {
    alert("To reset your password, please contact us at:\nsupport@ffweddingz.com ✉️");
  });
}
if (forgotPasswordSignup) {
  forgotPasswordSignup.addEventListener("click", () => {
    alert("To reset your password, please contact us at:\nsupport@ffweddingz.com ✉️");
  });
}

// ============================================================
// Helpers
// ============================================================

async function postJson(url, body) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    return { ok: false, data: null, error: err };
  }
}

// Offline fallback: store users in localStorage
function getStoredUsers() {
  try { return JSON.parse(localStorage.getItem("ffweddingzUsers") || "[]"); }
  catch { return []; }
}

function saveStoredUser(user) {
  const users = getStoredUsers();
  const existing = users.find(u => u.email === user.email);
  if (existing) { existing.name = user.name; existing.password = user.password; }
  else users.push(user);
  localStorage.setItem("ffweddingzUsers", JSON.stringify(users));
}

function findStoredUser(email, password) {
  return getStoredUsers().find(u => u.email === email && u.password === password);
}

// ============================================================
// User SIGNUP
// ============================================================
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userData = {
      name:     document.getElementById("signupName").value.trim(),
      email:    document.getElementById("signupEmail").value.trim(),
      password: document.getElementById("signupPassword").value.trim(),
    };

    if (!userData.name || !userData.email || !userData.password) {
      alert("Please fill in all fields.");
      return;
    }

    const result = await postJson("https://ff-weddingz.onrender.com/api/signup", userData);

    if (result.ok && result.data?.success) {
      // Server accepted the signup
      saveStoredUser(userData);
      alert("Account created successfully! ✅\nPlease login now.");
      signupForm.reset();
      loginTab.click();

    } else if (result.error) {
      // Server is offline — save locally so login still works
      saveStoredUser(userData);
      alert("Server is offline.\nYour account has been saved locally.\nYou can login now ✅");
      signupForm.reset();
      loginTab.click();

    } else {
      // Server responded with an error (e.g. duplicate email)
      alert(result.data?.message || "Signup failed. This email may already be registered.");
    }
  });
}

// ============================================================
// User LOGIN
// ============================================================
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const loginData = {
      email:    document.getElementById("loginEmail").value.trim(),
      password: document.getElementById("loginPassword").value.trim(),
    };

    if (!loginData.email || !loginData.password) {
      alert("Please enter your email and password.");
      return;
    }

    const result = await postJson("https://ff-weddingz.onrender.com/api/login", loginData);

    if (result.ok && result.data?.success) {
      // Successful login via server
      localStorage.setItem("userLoggedIn", "true");
      localStorage.setItem("userName", result.data.user?.name || loginData.email);
      alert("Login successful! ✅ Welcome back, " + (result.data.user?.name || "User") + "!");
      window.location.href = "index.html";

    } else if (result.error) {
      // Server offline — try local fallback
      const localUser = findStoredUser(loginData.email, loginData.password);
      if (localUser) {
        localStorage.setItem("userLoggedIn", "true");
        localStorage.setItem("userName", localUser.name);
        alert("Login successful (offline)! ✅ Welcome back, " + localUser.name + "!");
        window.location.href = "index.html";
      } else {
        alert("Server is offline and no local account found.\nPlease check your credentials or try again later.");
      }

    } else {
      // Server said invalid credentials
      alert(result.data?.message || "Invalid email or password. Please try again ❌");
    }
  });
}

// ============================================================
// Admin LOGIN
// ============================================================
if (adminForm) {
  adminForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("adminUsername").value.trim();
    const password = document.getElementById("adminPassword").value.trim();

    if (!username || !password) {
      alert("Please enter admin username and password.");
      return;
    }

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAdminLoggedIn", "true");
      window.location.href = "admin.html";
    } else {
      alert("Invalid admin credentials ❌\nPlease check username and password.");
    }
  });
}

// ============================================================
// On page load — show Login tab by default
// ============================================================
window.addEventListener("DOMContentLoaded", () => {
  showForm(loginForm, loginTab);
});