const defaultUsers = [
  {
    username: "admin",
    password: "admin",
    firstName: "Admin",
    lastName: "User",
    dob: "1990-01-15",
    employeeId: "1001",
    email: "admin@beehyv.com",
    designation: "Senior Software Engineer",
    contact: "9876543210",
    address: "Hyderabad, Telangana",
    link: "https://git.beehyv.com/admin",
    language: "English",
    profilePicture: "/assets/profile.png",
  },
  {
    username: "vineetks",
    password: "vineetks",
    firstName: "Vineet",
    lastName: "Kumar",
    dob: "1992-05-20",
    employeeId: "1002",
    email: "vineet.kumar@beehyv.com",
    designation: "Software Engineer",
    contact: "9123456789",
    address: "Bangalore, Karnataka",
    link: "https://git.beehyv.com/vineetks",
    language: "English",
    profilePicture: "/assets/profile.png",
  },
  {
    username: "vaibhav",
    password: "vaibhav123",
    firstName: "Vaibhav",
    lastName: "Panda",
    dob: "2004-07-27",
    employeeId: "758",
    email: "vaibhav.panda@beehyv.com",
    designation: "Backend Developer",
    contact: "8249618325",
    address: "Odisha, India",
    link: "https://git.beehyv.com/vaibhavpanda",
    language: "English",
    profilePicture: "/assets/profile.png",
  },
  {
    username: "priya1004",
    password: "priya123",
    firstName: "Priya",
    lastName: "Verma",
    dob: "1993-11-05",
    employeeId: "1004",
    email: "priya.verma@example.com",
    designation: "UI Developer",
    contact: "9988776655",
    address: "Pune, Maharashtra",
    link: "https://git.beehyv.com/priya",
    language: "English",
    profilePicture: "/assets/profile.png",
  },
];

if (!localStorage.getItem("userList")) {
  localStorage.setItem("userList", JSON.stringify(defaultUsers));
}

function getUsers() {
  return JSON.parse(localStorage.getItem("userList")) || [];
}

function saveUsers(users) {
  localStorage.setItem("userList", JSON.stringify(users));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function saveCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function redirectToProfile() {
  window.location.href = "profile.html";
}

function redirectToLogin() {
  window.location.href = "index.html";
}

function showSignupError(message) {
  const error = document.getElementById("signup-error");

  if (error) {
    error.textContent = message;
    error.style.display = "block";
  }
}

function isAtLeast20(dateOfBirth) {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 20;
}

const loginForm = document.getElementById("login-form");

if (loginForm) {
  if (getCurrentUser()) {
    redirectToProfile();
  }

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();

    const password = document.getElementById("password").value;

    const error = document.getElementById("login-error");

    const users = getUsers();

    const user = users.find(function (item) {
      return item.username === username && item.password === password;
    });

    if (user) {
      saveCurrentUser(user);
      redirectToProfile();
    } else {
      if (error) {
        error.textContent = "Invalid username or password.";

        error.style.display = "block";
      }
    }
  });
}

const signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstname").value.trim();

    const lastName = document.getElementById("lastname").value.trim();

    const dob = document.getElementById("dob").value;

    const employeeId = document.getElementById("employeeId").value.trim();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    const designation = document.getElementById("designation").value.trim();

    const contact = document.getElementById("contact").value.trim();

    const address = document.getElementById("address").value.trim();

    const link = document.getElementById("link").value.trim();

    const language = document.getElementById("language").value;

    const profilePictureInput = document.getElementById("profilePicture");

    if (
      !firstName ||
      !lastName ||
      !dob ||
      !employeeId ||
      !email ||
      !password ||
      !designation ||
      !contact ||
      !address ||
      !link ||
      !language
    ) {
      showSignupError("All fields must be filled out.");
      return;
    }

    if (!/^\d+$/.test(employeeId)) {
      showSignupError("Employee ID must contain numbers only.");
      return;
    }

    const users = getUsers();

    const employeeExists = users.some(function (user) {
      return user.employeeId === employeeId;
    });

    if (employeeExists) {
      showSignupError("Employee ID already exists.");
      return;
    }

    if (!/^\d{10}$/.test(contact)) {
      showSignupError("Contact number must contain exactly 10 digits.");
      return;
    }

    if (!isAtLeast20(dob)) {
      showSignupError("User must be at least 20 years old.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      showSignupError("Please enter a valid email address.");
      return;
    }

    const username = firstName.toLowerCase() + employeeId;

    const usernameExists = users.some(function (user) {
      return user.username === username;
    });

    if (usernameExists) {
      showSignupError("A user with this username already exists.");
      return;
    }

    const newUser = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      employeeId: employeeId,
      email: email,
      designation: designation,
      contact: contact,
      address: address,
      link: link,
      language: language,
      profilePicture: "",
    };

    if (profilePictureInput && profilePictureInput.files.length > 0) {
      const file = profilePictureInput.files[0];

      const reader = new FileReader();

      reader.onload = function () {
        newUser.profilePicture = reader.result;

        users.push(newUser);

        saveUsers(users);
        saveCurrentUser(newUser);

        redirectToProfile();
      };

      reader.readAsDataURL(file);
    } else {
      users.push(newUser);

      saveUsers(users);
      saveCurrentUser(newUser);

      redirectToProfile();
    }
  });
}

const profilePage = document.querySelector(".profile-page");

if (profilePage) {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    redirectToLogin();
  } else {
    displayUser(currentUser);
  }
}

function displayUser(user) {
  const fullName = user.firstName + " " + user.lastName;

  const profileName = document.getElementById("profile-name");

  const profileDesignation = document.getElementById("profile-designation");

  const profileAddress = document.getElementById("profile-address");

  const profileContact = document.getElementById("profile-contact");

  const profileEmail = document.getElementById("profile-email");

  const profileLink = document.getElementById("profile-link");

  const profileLanguage = document.getElementById("profile-language");

  const modalName = document.getElementById("modal-name");

  const modalDesignation = document.getElementById("modal-designation");

  const modalAddress = document.getElementById("modal-address");

  const modalContact = document.getElementById("modal-contact");

  const modalEmail = document.getElementById("modal-email");

  const modalLink = document.getElementById("modal-link");

  const modalLanguage = document.getElementById("modal-language");

  const profileImage = document.getElementById("profile-image-display");

  const defaultProfileIcon = document.getElementById("default-profile-icon");

  const modalProfileImage = document.getElementById("profile-picture-display");

  const modalDefaultIcon = document.getElementById(
    "modal-default-profile-icon",
  );

  if (profileName) {
    profileName.textContent = fullName;
  }

  if (profileDesignation) {
    profileDesignation.textContent = user.designation || "";
  }

  if (profileAddress) {
    profileAddress.textContent = user.address || "";
  }

  if (profileContact) {
    profileContact.textContent = user.contact || "";
  }

  if (profileEmail) {
    profileEmail.textContent = user.email || "";
  }

  if (profileLink) {
    profileLink.textContent = user.link || "#";

    profileLink.href = user.link || "#";
  }

  if (profileLanguage) {
    profileLanguage.textContent = user.language || "";
  }

  if (modalName) {
    modalName.value = fullName;
  }

  if (modalDesignation) {
    modalDesignation.value = user.designation || "";
  }

  if (modalAddress) {
    modalAddress.value = user.address || "";
  }

  if (modalContact) {
    modalContact.value = user.contact || "";
  }

  if (modalEmail) {
    modalEmail.value = user.email || "";
  }

  if (modalLink) {
    modalLink.value = user.link || "";
  }

  if (modalLanguage) {
    modalLanguage.value = user.language || "English";
  }

  if (user.profilePicture) {
    if (profileImage) {
      profileImage.src = user.profilePicture;

      profileImage.style.display = "block";
    }

    if (defaultProfileIcon) {
      defaultProfileIcon.style.display = "none";
    }

    if (modalProfileImage) {
      modalProfileImage.src = user.profilePicture;

      modalProfileImage.style.display = "block";
    }

    if (modalDefaultIcon) {
      modalDefaultIcon.style.display = "none";
    }
  }
}

const signoutButton = document.getElementById("signout");

if (signoutButton) {
  signoutButton.addEventListener("click", function (event) {
    event.preventDefault();

    localStorage.removeItem("currentUser");

    window.location.href = "index.html";
  });
}

const editForm = document.getElementById("edit-form");

if (editForm) {
  editForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const currentUser = getCurrentUser();

    if (!currentUser) {
      redirectToLogin();
      return;
    }

    const name = document.getElementById("modal-name").value.trim();

    if (!name) {
      return;
    }

    const nameParts = name.split(/\s+/);

    currentUser.firstName = nameParts[0];

    currentUser.lastName = nameParts.slice(1).join(" ");

    currentUser.designation = document
      .getElementById("modal-designation")
      .value.trim();

    currentUser.address = document.getElementById("modal-address").value.trim();

    currentUser.contact = document.getElementById("modal-contact").value.trim();

    currentUser.email = document.getElementById("modal-email").value.trim();

    currentUser.link = document.getElementById("modal-link").value.trim();

    currentUser.language = document.getElementById("modal-language").value;

    const profilePictureInput = document.getElementById("profile-picture");

    if (profilePictureInput && profilePictureInput.files.length > 0) {
      const file = profilePictureInput.files[0];

      const reader = new FileReader();

      reader.onload = function () {
        currentUser.profilePicture = reader.result;

        updateUser(currentUser);
      };

      reader.readAsDataURL(file);
    } else {
      updateUser(currentUser);
    }
  });
}

function updateUser(user) {
  const users = getUsers();

  const userIndex = users.findIndex(function (item) {
    return item.username === user.username;
  });

  if (userIndex !== -1) {
    users[userIndex] = user;
    saveUsers(users);
  }

  saveCurrentUser(user);

  displayUser(user);

  const modal = document.getElementById("edit-modal");

  if (modal) {
    modal.checked = false;
  }

  const profilePictureInput = document.getElementById("profile-picture");

  if (profilePictureInput) {
    profilePictureInput.value = "";
  }
}
