/* =========================================================
   KRISHNA RAJOO
   PROFESSIONAL DATA SCIENCE PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   EMAILJS INITIALIZATION
========================================================= */

if (typeof emailjs !== "undefined") {

    emailjs.init({
        publicKey: "XrPPbVJz7x1zYDE4e"
    });

} else {

    console.error(
        "EmailJS library is not available."
    );

}


/* =========================================================
   SCREEN LOADER
========================================================= */

const screenLoader =
    document.getElementById("screenLoader");


window.addEventListener(
    "load",
    () => {

        if (!screenLoader) {
            return;
        }

        setTimeout(() => {

            screenLoader.classList.add(
                "loader-hidden"
            );

        }, 3000);

    }
);


/* =========================================================
   ELEMENTS
========================================================= */

const navbar =
    document.getElementById("navbar");


const navLinks =
    document.getElementById("navLinks");


const menuToggle =
    document.getElementById("menuToggle");


const navigationItems =
    document.querySelectorAll(
        ".nav-links a"
    );


const year =
    document.getElementById("year");


const contactForm =
    document.getElementById("contactForm");


const formStatus =
    document.getElementById("formStatus");


/* =========================================================
   THEME ELEMENTS
========================================================= */

const themeToggle =
    document.getElementById("themeToggle");


const themeIcon =
    themeToggle
        ? themeToggle.querySelector("i")
        : null;


/*
    dark.css should be linked in HTML like:

    <link
        rel="stylesheet"
        href="dark.css"
        id="darkTheme"
        disabled
    >
*/

let darkTheme =
    document.getElementById("darkTheme");


/* =========================================================
   CREATE DARK CSS LINK IF NOT PRESENT
========================================================= */

if (!darkTheme) {

    darkTheme =
        document.createElement("link");

    darkTheme.rel =
        "stylesheet";

    darkTheme.href =
        "dark.css";

    darkTheme.id =
        "darkTheme";

    darkTheme.disabled =
        true;

    document.head.appendChild(
        darkTheme
    );

}


/* =========================================================
   THEME SWITCHING
========================================================= */

function setTheme(isDark) {

    if (!darkTheme) {
        return;
    }


    /* Enable / disable dark.css */

    darkTheme.disabled =
        !isDark;


    /* Update button icon */

    if (themeIcon) {

        if (isDark) {

            themeIcon.classList.remove(
                "fa-sun"
            );

            themeIcon.classList.add(
                "fa-moon"
            );

        } else {

            themeIcon.classList.remove(
                "fa-moon"
            );

            themeIcon.classList.add(
                "fa-sun"
            );

        }

    }


    /* Update accessibility text */

    if (themeToggle) {

        if (isDark) {

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light theme"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to light theme"
            );

        } else {

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark theme"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to dark theme"
            );

        }

    }


    /* Save theme */

    localStorage.setItem(
        "portfolio-theme",
        isDark
            ? "dark"
            : "light"
    );

}


/* =========================================================
   LOAD SAVED THEME
========================================================= */

const savedTheme =
    localStorage.getItem(
        "portfolio-theme"
    );


if (savedTheme === "dark") {

    setTheme(true);

} else {

    setTheme(false);

}


/* =========================================================
   THEME BUTTON CLICK
========================================================= */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const currentlyDark =
                darkTheme &&
                !darkTheme.disabled;


            setTheme(
                !currentlyDark
            );

        }
    );

}


/* =========================================================
   CURRENT YEAR
========================================================= */

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

if (
    menuToggle &&
    navLinks
) {

    menuToggle.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "open"
            );

            menuToggle.classList.toggle(
                "active"
            );

        }
    );

}


/* =========================================================
   CLOSE MOBILE MENU
   WHEN NAVIGATION LINK IS CLICKED
========================================================= */

navigationItems.forEach(
    link => {

        link.addEventListener(
            "click",
            () => {

                if (navLinks) {

                    navLinks.classList.remove(
                        "open"
                    );

                }


                if (menuToggle) {

                    menuToggle.classList.remove(
                        "active"
                    );

                }

            }
        );

    }
);


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        if (!navbar) {
            return;
        }


        if (window.scrollY > 30) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


function updateActiveNavigation() {

    let current =
        "home";


    sections.forEach(
        section => {

            const sectionTop =
                section.offsetTop - 220;


            const sectionBottom =
                sectionTop +
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                current =
                    section.id;

            }

        }
    );


    navigationItems.forEach(
        link => {

            link.classList.remove(
                "active"
            );


            if (
                link.getAttribute(
                    "href"
                ) ===
                `#${current}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
        passive: true
    }
);


/* Run once when page loads */

updateActiveNavigation();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".section, .hero-content, .hero-visual, .resume-section, .contact-section"
    );


if (
    revealElements.length &&
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(

            (
                entries,
                observer
            ) => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.08
            }

        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    /*
        Fallback for browsers without
        IntersectionObserver.
    */

    revealElements.forEach(
        element => {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        anchor => {

            anchor.addEventListener(
                "click",
                function(event) {

                    const targetID =
                        this.getAttribute(
                            "href"
                        );


                    if (
                        targetID === "#" ||
                        !targetID
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    const offset =
                        navbar
                            ? navbar.offsetHeight + 20
                            : 20;


                    const position =
                        target
                            .getBoundingClientRect()
                            .top +
                        window.scrollY -
                        offset;


                    window.scrollTo({

                        top:
                            position,

                        behavior:
                            "smooth"

                    });

                }
            );

        }
    );


/* =========================================================
   CONTACT FORM — EMAILJS
========================================================= */

/*
    EmailJS Configuration

    Public Key:
    XrPPbVJz7x1zYDE4e

    Service ID:
    service_gkgva0w

    Template ID:
    template_yqfwh9p
*/


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            /* ---------------------------------------------
               STATUS ELEMENT
            --------------------------------------------- */

            if (!formStatus) {

                console.warn(
                    "formStatus element not found."
                );

            }


            /* ---------------------------------------------
               SUBMIT BUTTON
            --------------------------------------------- */

            const submitButton =
                contactForm.querySelector(
                    "button[type='submit']"
                );


            const originalButtonText =
                submitButton
                    ? submitButton.innerHTML
                    : "Send Message";


            /* ---------------------------------------------
               PREVENT DUPLICATE SUBMISSION
            --------------------------------------------- */

            if (
                submitButton &&
                submitButton.disabled
            ) {

                return;

            }


            /* ---------------------------------------------
               READ FORM VALUES
            --------------------------------------------- */

            const name =
                document
                    .getElementById("name")
                    ?.value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    ?.value
                    .trim();


            const subject =
                document
                    .getElementById("subject")
                    ?.value
                    .trim();


            const message =
                document
                    .getElementById("message")
                    ?.value
                    .trim();


            /* ---------------------------------------------
               VALIDATION
            --------------------------------------------- */

            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                if (formStatus) {

                    formStatus.textContent =
                        "Please complete all fields.";

                    formStatus.style.color =
                        "#dc2626";

                }

                return;

            }


            /* ---------------------------------------------
               EMAIL VALIDATION
            --------------------------------------------- */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(email)
            ) {

                if (formStatus) {

                    formStatus.textContent =
                        "Please enter a valid email address.";

                    formStatus.style.color =
                        "#dc2626";

                }

                return;

            }


            /* ---------------------------------------------
               CHECK EMAILJS
            --------------------------------------------- */

            if (
                typeof emailjs ===
                "undefined"
            ) {

                console.error(
                    "EmailJS library is not available."
                );


                if (formStatus) {

                    formStatus.textContent =
                        "Email service is currently unavailable. Please try again later.";

                    formStatus.style.color =
                        "#dc2626";

                }

                return;

            }


            /* ---------------------------------------------
               SENDING STATE
            --------------------------------------------- */

            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.innerHTML =
                    "Sending...";

            }


            if (formStatus) {

                formStatus.textContent =
                    "Sending your message...";

                formStatus.style.color =
                    "#2563eb";

            }


            /* ---------------------------------------------
               SEND THROUGH EMAILJS
            --------------------------------------------- */

            try {

                const response =
                    await emailjs.sendForm(

                        "service_gkgva0w",

                        "template_yqfwh9p",

                        contactForm

                    );


                console.log(
                    "EmailJS Success:",
                    response
                );


                /* -----------------------------------------
                   SUCCESS
                ----------------------------------------- */

                if (formStatus) {

                    formStatus.textContent =
                        "Your message has been sent successfully. Thank you for reaching out!";

                    formStatus.style.color =
                        "#16a34a";

                }


                /* Clear form */

                contactForm.reset();


            } catch (error) {

                /* -----------------------------------------
                   ERROR
                ----------------------------------------- */

                console.error(
                    "EmailJS Error:",
                    error
                );


                if (formStatus) {

                    formStatus.textContent =
                        "Unable to send your message right now. Please try again later.";

                    formStatus.style.color =
                        "#dc2626";

                }

            } finally {

                /* -----------------------------------------
                   RESTORE BUTTON
                ----------------------------------------- */

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.innerHTML =
                        originalButtonText;

                }

            }

        }
    );

}


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        document
            .querySelector(
                ".hero-content"
            )
            ?.classList.add(
                "visible"
            );


        document
            .querySelector(
                ".hero-visual"
            )
            ?.classList.add(
                "visible"
            );

    }
);


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%cKrishna Rajoo Portfolio",
    "font-size: 18px; font-weight: 700;"
);


console.log(
    "Data Analyst • Data Science • Machine Learning"
);


console.log(
    "Theme system initialized."
);


console.log(
    "EmailJS contact form initialized."
);