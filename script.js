const animations = [
  "flipInX",
  "slideInDown",
  "slideInUp",
  "slideInLeft",
  "slideInRight",
];

const homeSection = document.getElementById("home");
const aboutSection = document.getElementById("about");
const resumeSection = document.getElementById("resume");
const portfolioSection = document.getElementById("portfolio");
const contactSection = document.getElementById("contact");

// Add all sections to a single array for control
const allSections = [
  homeSection,
  aboutSection,
  resumeSection,
  portfolioSection,
  contactSection,
];

function applyAnimation(sectionToShow) {
  const anim = animations[Math.floor(Math.random() * animations.length)];

  // Hide all other sections
  allSections.forEach((section) => {
    section.classList.add("d-none");
    section.style.display = "none";
    section.classList.remove("animate__animated");
  });

  // Show the selected section
  sectionToShow.classList.remove("d-none");
  sectionToShow.style.display = sectionToShow.id === "home" ? "flex" : "block";

  // Add animation
  sectionToShow.classList.add("animate__animated", `animate__${anim}`);

  // Remove animation class after it ends
  sectionToShow.addEventListener(
    "animationend",
    () => {
      sectionToShow.classList.remove("animate__animated", `animate__${anim}`);
    },
    { once: true }
  );

  // Manage scroll behavior
  document.body.style.overflow =
    sectionToShow.id === "home" ? "hidden" : "auto";
}

function closeSidebarOnMobile() {
  if (window.innerWidth < 768) {
    document.getElementById("sidebar").classList.remove("show");
  }
}

// Handle nav links for all sections
document.querySelector('a[href="#home"]').addEventListener("click", (e) => {
  e.preventDefault();
  applyAnimation(homeSection);
  closeSidebarOnMobile();
});

document.querySelector('a[href="#about"]').addEventListener("click", (e) => {
  e.preventDefault();
  applyAnimation(aboutSection);
  closeSidebarOnMobile();
});

document.querySelector('a[href="#resume"]').addEventListener("click", (e) => {
  e.preventDefault();
  applyAnimation(resumeSection);
  closeSidebarOnMobile();
});

document
  .querySelector('a[href="#portfolio"]')
  .addEventListener("click", (e) => {
    e.preventDefault();
    applyAnimation(portfolioSection);
    closeSidebarOnMobile();
  });

document.querySelector('a[href="#contact"]').addEventListener("click", (e) => {
  e.preventDefault();
  applyAnimation(contactSection);
  closeSidebarOnMobile();
});

// Auto-close sidebar on nav click (for mobile)
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", closeSidebarOnMobile);
});

// Prevent scroll on initial load (home section)
document.body.style.overflow = "hidden";

// portfolio data
const portfolioData = {
  1: {
    title: "My Portfolio",
    desc: "I turn ideas into interactive web solutions.",
    website: "https://my-portfolio-aquib-shaikh.netlify.app/",
    category: "Design, UI",
    img1: "img/1.png",
    img2: "img/2.png",
  },
  2: {
    title: "Dairy products",
    desc: "This was a entrepreneur projects this a frontend website with responsive ui...",
    website: "https://dairys-products.netlify.app",
    category: "Frontend website",
    img1: "img/3.png",
    img2: "img/4.png",
  },
  3: {
    title: "Beauty Parlour",
    desc: "It is a entrepreneur website",
    website: "https://beauty-parlor.netlify.app/",
    category: "Frontend Website",
    img1: "img/5.png",
    img2: "img/6.png",
  },
  4: {
    title: "blog-engine-with-markdown",
    desc: "Build a blog engine using React + TypeScript Support writing & previewing posts in Markdown Store blog posts in Firebase Firestore Secure API keys using .env (no hardcoded keys).",
    website: "https://blog-engine-with-markdown.netlify.app/",
    category: "react + typescript,firebase store",
    img1: "img/7.png",
    img2: "img/8.png",
  },
  5: {
    title: "Resort website",
    desc: "Snehaprabha Resort Website Project only frontend design",
    website: "https://resort-website-frontend.netlify.app/",
    category: "html + css +js + boostrap",
    img1: "img/9.png",
    img2: "img/10.png",
  },
  6: {
    title: "Lab website demo frontend design",
    desc: "Build a frontend design for a lab",
    website: "https://lab-frontend-web.netlify.app/",
    category: "html + css + bootstrap",
    img1: "img/11.png",
    img2: "img/12.png",
  },
  7: {
    title: "Stock Market frontend website",
    desc: "In this website update some frontend design",
    website: "https://stock-market-website.netlify.app/",
    category: "html + css + bootstrap",
    img1: "img/13.png",
    img2: "img/14.png",
  },
  8: {
    title: "React code very clean ui",
    desc: "React Code...",
    website: "https://react-code-clean-ui.netlify.app/",
    category: "react + react bootstrap",
    img1: "img/15.png",
    img2: "img/16.png",
  },
};

function getQueryParamFromUrl(url, param) {
  try {
    const queryString = url.split("?")[1];
    if (!queryString) return null;
    const params = new URLSearchParams(queryString);
    return params.get(param);
  } catch (e) {
    return null;
  }
}

$(document).ready(function () {
  $(".ajax-popup").magnificPopup({
    type: "ajax",
    closeBtnInside: true,
    midClick: true,
    closeOnBgClick: false, // ❌ prevent closing on background
    closeOnContentClick: false, // ❌ prevent closing on content click
    callbacks: {
      ajaxContentAdded: function () {
        const url = this.currItem.src;
        const id = getQueryParamFromUrl(url, "id");
        const project = portfolioData[id];

        if (project) {
          $("#work-title").text(project.title);
          $("#work-desc").text(project.desc);
          $("#work-client").text(project.client || "N/A");
          $("#work-website")
            .text(project.website)
            .attr("href", project.website)
            .attr("target", "_blank");
          $("#work-category").text(project.category);
          $("#work-img1").attr("src", project.img1);
          $("#work-img2").attr("src", project.img2);
        } else {
          $("#work-title").text("Project Not Found");
          $("#work-desc").text("No information available for this project.");
        }

        // Custom close button
        $(".popup-close").on("click", function () {
          $.magnificPopup.close();
        });
      },
    },
  });
});

//

let hasViewedMore = false; // Track if 'View More' was clicked

// Show more projects on click
document.getElementById("view-more-btn").addEventListener("click", function () {
  document.getElementById("more-projects").style.display = "flex"; // Show hidden items
  this.style.display = "none"; // Hide button
  document.getElementById("portfolio").classList.add("scrollable");
  hasViewedMore = true;
});

// Reset #more-projects and button on portfolio navigation
function resetPortfolioViewMore() {
  const moreProjects = document.getElementById("more-projects");
  const viewMoreBtn = document.getElementById("view-more-btn");

  if (moreProjects && viewMoreBtn) {
    moreProjects.style.display = "none";
    viewMoreBtn.style.display = "inline-block";
    document.getElementById("portfolio").classList.remove("scrollable");
    hasViewedMore = false;
  }
}

// Wrap the portfolio nav click logic to reset view more state
document
  .querySelector('a[href="#portfolio"]')
  .addEventListener("click", (e) => {
    e.preventDefault();
    resetPortfolioViewMore(); // 👈 reset view more state
    applyAnimation(portfolioSection);
    closeSidebarOnMobile();
  });
