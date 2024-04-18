const hambut = document.getElementById("hamburg");
const nav = document.getElementById("navlist");
const navlinks = document.querySelectorAll("nav ul li a");
const navdiv = document.querySelectorAll(".navdiv");

navdiv.forEach((n) => n.addEventListener("click", clicked(n)));

function clicked(element) {
  resetBackgroundColors();
  element.style.backgroundColor = "rgba(255, 230, 255, 1.0)";
}

function resetBackgroundColors() {
  navdiv.forEach((n) => {
    n.style.backgroundColor = "";
  });
}

// Function to set active link based on current page URL
function setActiveLink() {
  const currentpage = window.location.href;
  const normalizedCurrentPage = currentpage.replace(/\/$/, "");
  console.log(normalizedCurrentPage);

  navlinks.forEach((link) => {
    const normalizedHref = link.href.replace(/\/$/, "");
    const renormalizedHref = normalizedHref.replace(/.html$/, "");
    console.log(normalizedHref);
    if (normalizedHref === normalizedCurrentPage) {
      // Set background color of parent div
      link.querySelector(".navdiv").style.backgroundColor =
        "rgba(255, 230, 255, 1.0)";
    } else {
      link.querySelector(".navdiv").style.backgroundColor = "";
    }
  });
}

// Call the setActiveLink function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", setActiveLink);

function togglebutton() {
  nav.classList.toggle("show");
}

hambut.addEventListener("click", togglebutton);

const form = document.getElementById("formid");

var formsubmitted = false;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  // Make an asynchronous POST request to the backend endpoint
  const response = await fetch(
    "https://portfoliobackend-8lrwnqd8.b4a.run/submit",
    {
      method: "POST", // Use the POST method for form submission
      body: formData, // Include the form data in the request body
    },
  );

  if (response.ok) {
    const responseData = await response.json();
    if (responseData.success) {
      sessionStorage.setItem("formSubmitted", "true");
      window.location.href = "/redirect.html";
    } else {
      console.error("Form submission failed:", responseData.error);
    }
  } else {
    window.location.href = "/maintenance.html";
    console.error("Network error:", response.statusText);
  }
});
