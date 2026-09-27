/* =========================================================
   YOUR BRAND — MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   01. CONFIGURATION
   ========================================================= */

// Replace this with the clothing store's real WhatsApp number.
// South African format: 27XXXXXXXXX
const WHATSAPP_NUMBER = "27774038916"; // Example: "27774038916" for +27 77 403 8916


/* =========================================================
   02. MOBILE MENU
   ========================================================= */

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            document.body.classList.toggle("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    // Close menu when a navigation link is clicked

    const mobileLinks =
        mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            document.body.classList.remove(
                "menu-open"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });

}


/* =========================================================
   03. PRODUCT FILTERING
   ========================================================= */

const filterButtons =
    document.querySelectorAll(".filter-button");

const productCards =
    document.querySelectorAll(".product-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedCategory =
            button.dataset.filter;


        // Update active button

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");


        // Filter products

        productCards.forEach(product => {

            const productCategory =
                product.dataset.category;


            if (
                selectedCategory === "all" ||
                productCategory === selectedCategory
            ) {

                product.style.display = "";

                requestAnimationFrame(() => {

                    product.style.opacity = "1";
                    product.style.transform =
                        "translateY(0)";

                });

            } else {

                product.style.opacity = "0";
                product.style.transform =
                    "translateY(10px)";

                setTimeout(() => {

                    product.style.display = "none";

                }, 200);

            }

        });

    });

});


/* =========================================================
   04. QUICK ADD / WHATSAPP ORDERING
   ========================================================= */

const quickAddButtons =
    document.querySelectorAll(".quick-add");

quickAddButtons.forEach(button => {

    button.addEventListener("click", () => {

        const productCard =
            button.closest(".product-card");

        if (!productCard) return;


        const productName =
            productCard.querySelector(
                ".product-info h3"
            )?.textContent.trim();


        const productPrice =
            productCard.querySelector(
                ".product-info strong"
            )?.textContent.trim();


        const message =
            `Hi! I'd like to order the ${productName} (${productPrice}). Please let me know about available sizes and colours.`;


        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    });

});


/* =========================================================
   05. UPDATE ALL WHATSAPP LINKS
   ========================================================= */

const whatsappLinks =
    document.querySelectorAll(
        'a[href*="wa.me"]'
    );

whatsappLinks.forEach(link => {

    const currentHref =
        link.getAttribute("href");

    if (
        !currentHref ||
        currentHref.includes("XXXXXXXXX")
    ) {

        link.setAttribute(
            "href",
            `https://wa.me/${WHATSAPP_NUMBER}`
        );

    }

});


/* =========================================================
   06. HEADER SCROLL EFFECT
   ========================================================= */

const header =
    document.querySelector(".site-header");

let lastScrollPosition = 0;

window.addEventListener(
    "scroll",
    () => {

        const currentScroll =
            window.scrollY;


        if (!header) return;


        if (currentScroll > 30) {

            header.classList.add(
                "header-scrolled"
            );

        } else {

            header.classList.remove(
                "header-scrolled"
            );

        }


        lastScrollPosition =
            currentScroll;

    },
    {
        passive: true
    }
);


/* =========================================================
   07. SEARCH BUTTON
   ========================================================= */

const searchButton =
    document.getElementById("search-button");

if (searchButton) {

    searchButton.addEventListener(
        "click",
        () => {

            const searchTerm =
                window.prompt(
                    "What are you looking for?"
                );


            if (
                !searchTerm ||
                searchTerm.trim() === ""
            ) {
                return;
            }


            const query =
                searchTerm
                    .trim()
                    .toLowerCase();


            let foundProduct = false;


            productCards.forEach(product => {

                const productName =
                    product.querySelector(
                        ".product-info h3"
                    )?.textContent
                        .toLowerCase() || "";


                const category =
                    product.dataset.category
                        ?.toLowerCase() || "";


                if (
                    productName.includes(query) ||
                    category.includes(query)
                ) {

                    product.style.display = "";

                    product.style.opacity = "1";

                    product.style.transform =
                        "translateY(0)";

                    foundProduct = true;

                } else {

                    product.style.display = "none";

                }

            });


            const shopSection =
                document.querySelector("#shop");


            if (shopSection) {

                shopSection.scrollIntoView({
                    behavior: "smooth"
                });

            }


            if (!foundProduct) {

                window.setTimeout(() => {

                    window.alert(
                        `We couldn't find anything matching "${searchTerm}".`
                    );

                    // Reset products

                    productCards.forEach(product => {

                        product.style.display = "";
                        product.style.opacity = "1";
                        product.style.transform =
                            "translateY(0)";

                    });

                }, 500);

            }

        }
    );

}


/* =========================================================
   08. IMAGE LOADING
   ========================================================= */

const images =
    document.querySelectorAll("img");

images.forEach(image => {

    image.addEventListener(
        "load",
        () => {

            image.classList.add(
                "image-loaded"
            );

        }
    );

});


/* =========================================================
   09. REVEAL ANIMATIONS
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".collection-card, .product-card, .benefit, .review-card, .social-image"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }


                entry.target.classList.add(
                    "revealed"
                );


                revealObserver.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    element.classList.add(
        "reveal-element"
    );

    revealObserver.observe(element);

});


/* =========================================================
   10. ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }


        if (
            document.body.classList.contains(
                "menu-open"
            )
        ) {

            document.body.classList.remove(
                "menu-open"
            );


            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        }

    }
);


/* =========================================================
   11. CURRENT YEAR
   ========================================================= */

const footerYear =
    document.querySelector(
        ".footer-bottom p"
    );

if (footerYear) {

    footerYear.textContent =
        footerYear.textContent.replace(
            "2026",
            new Date().getFullYear()
        );

}


/* =========================================================
   12. PAGE READY
   ========================================================= */

document.documentElement.classList.add(
    "js-enabled"
);

console.log(
    "YOUR BRAND website loaded successfully."
);