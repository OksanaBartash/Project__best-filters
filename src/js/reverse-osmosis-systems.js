$(document).ready(function () {


   //header start
   const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasDarkNavbar'));

   const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
   const dropdownLinks = document.querySelectorAll('.navbar-nav .dropdown-item');

   navLinks.forEach(link => {
      link.addEventListener('click', function (event) {
         if (!this.classList.contains('dropdown-toggle')) {
            offcanvas.hide();
         }
      });
   });

   dropdownLinks.forEach(link => {
      link.addEventListener('click', function () {
         offcanvas.hide();
      });
   });

   //header end


   //buttons "Показати ще..."/ "Згорнути"
   const showMoreBtns = document.querySelectorAll(".showMoreBtn");
   const isEnglish = document.documentElement.lang === "en";

   showMoreBtns.forEach(function (button) {
      button.addEventListener("click", function () {
         const isExpanded = button.getAttribute("aria-expanded") === "true";
         if (isEnglish) {
            if (isExpanded) {
               button.setAttribute("aria-expanded", "false");
               button.innerHTML = `<i class="icon-circle_arrow"></i> Collapse`;
            } else {
               button.setAttribute("aria-expanded", "true");
               button.innerHTML = `<i class="icon-circle_arrow"></i> Show more...`;
            }
         } else {
            if (isExpanded) {
               button.setAttribute("aria-expanded", "false");
               button.innerHTML = `<i class="icon-circle_arrow"></i> Згорнути`;
            } else {
               button.setAttribute("aria-expanded", "true");
               button.innerHTML = `<i class="icon-circle_arrow"></i> Показати ще...`;
            }
         }
      });
   });


   // displaying the modal content dynamically
   $('.specifications').on('click', function (event) {
      event.preventDefault();
      let component = $(this).data('component');
      let language = document.documentElement.lang;

      let path;
      if (language === 'en') {
         path = 'components-en/';
      } else {
         path = 'components/';
      }

      $('.modal-content').load(path + component + '.html', function () {
         // Initialize the Swiper slider
         var swiper = new Swiper(".main-swiper", {
            navigation: {
               nextEl: ".swiper-button-next",
               prevEl: ".swiper-button-prev"
            }
         });
      });
   });


   //modal window start
   document
      .getElementById("close-form-window")
      .addEventListener("click", () => {
         document.querySelectorAll(".input-wrapper img").forEach((img) => {
            img.classList.add("d-none");
         });
         document.querySelectorAll("#form-window input").forEach((elem) => {
            elem.value = "";
            elem.classList.remove("error-box");
         });
         document
            .querySelectorAll("#form-window .error-text")
            .forEach((elem) => (elem.innerText = ""));
      });
   document
      .getElementById("close-second-window")
      .addEventListener("click", () => {
         document
            .querySelectorAll(".registration-form input")
            .forEach((elem) => (elem.value = ""));
         location.reload(); // update
      });
   // phone number mask
   jQuery(".phone-number").inputmask({
      mask: "+38 (999) 999-99-99",
      greedy: false,
   });
   const lang = document.documentElement.lang;
   let isFormValid = false;
   let elemForCheckCaptcha;


   // validation
   document.querySelectorAll(".check-form").forEach((elem) =>
      elem.addEventListener("click", (event) => {
         // function that prevents the transition to the next action
         event.preventDefault();
         const form = elem.closest(".registration-form");
         elemForCheckCaptcha = form;
         // function to check the correctness of the entered project name
         function checkName() {
            const inputName = form.querySelector(".input-name");
            const regexName =
               /^[a-zA-Zа-яА-ЯїЇєЄіІґҐ]{2}[a-zA-Zа-яА-ЯїЇєЄіІґҐ\s'-]*$/;
            if (inputName.value.trim() == "") {
               switch (lang) {
                  case "uk":
                     inputName
                        .closest(".input-wrapper")
                        .querySelector(".error-text").textContent =
                        "Це поле є обов’язковим для заповнення";
                     break;
                  case "en":
                     inputName
                        .closest(".input-wrapper")
                        .querySelector(".error-text").textContent =
                        "This field is required";
                     break;
                  default:
                     break;
               }
               inputName
                  .closest(".input-wrapper")
                  .querySelector("input")
                  .classList.add("error-box");
            } else if (!regexName.test(inputName.value)) {
               switch (lang) {
                  case "uk":
                     inputName
                        .closest(".input-wrapper")
                        .querySelector(".error-text").innerHTML =
                        "Поле має містити не менше двох символів, лише літери";
                     break;
                  case "en":
                     inputName
                        .closest(".input-wrapper")
                        .querySelector(".error-text").textContent =
                        "The field must contain at least two characters, only letters";
                     break;
                  default:
                     break;
               }
               inputName
                  .closest(".input-wrapper")
                  .querySelector("input")
                  .classList.add("error-box");
               inputName.closest(".input-wrapper").classList.add("error");
               inputName.closest(".input-wrapper").querySelector("img").classList.remove("d-none");
            } else {
               inputName
                  .closest(".input-wrapper")
                  .querySelector(".error-text").innerHTML = "";
               inputName
                  .closest(".input-wrapper")
                  .classList.remove("error");
               inputName
                  .closest(".input-wrapper")
                  .querySelector("input")
                  .classList.remove("error-box");
               inputName.closest(".input-wrapper").querySelector("img").classList.add("d-none");
            }
            return regexName.test(inputName.value);
         }
         // function to check the correctness of the entered phone number
         function checkPhone() {
            const inputPhone = form.querySelector(".phone-number");
            const regexPhone = /^\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}$/;
            if (inputPhone.value.trim() == "") {
               switch (lang) {
                  case "uk":
                     inputPhone
                        .closest(".input-wrapper")
                        .querySelector(".error-text").textContent =
                        "Це поле є обов’язковим для заповнення";
                     break;
                  case "en":
                     inputPhone
                        .closest(".input-wrapper")
                        .querySelector(".error-text").textContent =
                        "This field is required";
                     break;
                  default:
                     break;
               }
               inputPhone
                  .closest(".input-wrapper")
                  .querySelector("input")
                  .classList.add("error-box");
            } else if (!regexPhone.test(inputPhone.value)) {
               switch (lang) {
                  case "uk":
                     inputPhone
                        .closest(".input-wrapper")
                        .querySelector(".error-text").textContent =
                        "Поле заповнено не коректно";
                     break;
                  case "en":
                     inputPhone
                        .closest(".input-wrapper")
                        .querySelector(".error-text").textContent =
                        "The field is filled out incorrectly";
                     break;
                  default:
                     break;
               }
               inputPhone.closest(".input-wrapper").classList.add("error");
               inputPhone.closest(".input-wrapper").querySelector("img").classList.remove("d-none");
               inputPhone
                  .closest(".input-wrapper")
                  .querySelector("input")
                  .classList.add("error-box");
            } else {
               inputPhone.closest(".input-wrapper").querySelector("img").classList.add("d-none");
               inputPhone
                  .closest(".input-wrapper")
                  .querySelector(".error-text").textContent = "";
               inputPhone
                  .closest(".input-wrapper")
                  .querySelector("input")
                  .classList.remove("error-box");
               inputPhone
                  .closest(".input-wrapper")
                  .classList.remove("error");
            }
            return regexPhone.test(inputPhone.value);
         }
         checkName();
         checkPhone();
         if (checkName() && checkPhone()) {
            isFormValid = true;
         }
      })
   );

   // reCAPTCHA

   function getElement(selector) {
      return document.querySelector(selector);
   }

   onSubmit();
   function onSubmit() {
      document.querySelectorAll(".check-form").forEach((elem) =>
         elem.addEventListener("click", (event) => {
            event.preventDefault();
            // submit to the server if the form is valid
            if (isFormValid) {
               grecaptcha.ready(function () {
                  grecaptcha
                     .execute(
                        "6LcwRRUaAAAAADavxcmw5ShOEUt1xMBmRAcPf6QP",
                        { action: "submit" }
                     )
                     .then(function (token) {
                        if (elemForCheckCaptcha.checkValidity()) {
                           const actionUrl =
                              "https://intita.com/api/v1/entrant";
                           const entrantFormData = new FormData(
                              elemForCheckCaptcha
                           );
                           entrantFormData.append(
                              "g-recaptcha-response",
                              token
                           );
                           const http = new XMLHttpRequest();
                           http.open("POST", actionUrl, true);
                           http.send(entrantFormData);
                           http.onreadystatechange = function () {
                              if (
                                 +http.readyState === 4 &&
                                 +http.status === 201
                              ) {
                                 entrantSubmitResponse();
                              } else if (+http.status === 400) {
                                 switch (lang) {
                                    case "uk":
                                       entrantSubmitResponse(
                                          "Сервер тимчасово перевантажений. Будь ласка, cпробуйте пізніше"
                                       );
                                       break;
                                    case "en":
                                       entrantSubmitResponse(
                                          "The server is temporary busy. Please try again later"
                                       );
                                       break;
                                    default: я
                                       break;
                                 }
                              }
                           };
                           http.onload = function () {
                              if (+http.status !== 201) {
                                 switch (lang) {
                                    case "uk":
                                       entrantSubmitResponse(
                                          "Сервер тимчасово перевантажений. Будь ласка, cпробуйте пізніше"
                                       );
                                       break;
                                    case "en":
                                       entrantSubmitResponse(
                                          "The server is temporary busy. Please try again later"
                                       );
                                       break;
                                    default:
                                       break;
                                 }
                                 return;
                              }
                              entrantSubmitResponse();
                           };
                        }
                     });
               });
            }
         })
      );
   }

   function entrantSubmitResponse(errorStr) {
      const secondWindow = document.getElementById("responseModal");
      if (getComputedStyle(secondWindow, null).display === "none") {
         // scrollControllerModal.disabledScroll();
         const elementAnketeText =
            document.querySelector("#responseMessage");
         if (errorStr) {
            elementAnketeText.innerText = errorStr;
            document.getElementById("registerModal").style.display =
               "block";
            document.getElementById("form-window").style.display = "none";
            document.getElementById("responseModal").style.display =
               "block";
         } else {
            switch (lang) {
               case "uk":
                  elementAnketeText.innerHTML =
                     "Ми зателефонуємо Вам найближчим часом!";
                  break;
               case "en":
                  elementAnketeText.innerText =
                     "We will contact you shortly";
                  break;
               default:
                  break;
            }
            document.getElementById("form-window").style.display = "none";
            document.getElementById("responseModal").style.display = "flex";
         }
         secondWindow.style.display = "block";
         document.getElementById("registerModal").style.display = "block";
         document.getElementById("form-window").style.display = "none";
         document.getElementById("responseModal").style.display = "block";
      }
   }
   //modal window end

   // footer start
   const scrollUp = $(".scroll-up");
   const offset = 100;
   const getTop = () => window.pageYOffset || document.documentElement.scrollTop;
   if (scrollUp) {
      window.addEventListener("scroll", () => {
         if (getTop() > offset) {
            scrollUp.addClass("scroll-up-active");
         } else {
            scrollUp.removeClass("scroll-up-active");
         }
      });
      scrollUp.on("click", (event) => {
         window.scrollTo({
            top: 0,
            behavior: "smooth",
         });
      });
   }
   // footer section end


   //scroll start

   // Function to scroll to the target element with an offset
   function scrollToElementWithOffset(target, offset) {
      if (target.length) {
         var targetOffset = target.offset().top - offset;
         $('html, body').animate({
            scrollTop: targetOffset
         }, 500);
      }
   }

   // Define different offsets for mobile and desktop
   const mobileOffset = 52;
   const desktopOffset = 85;

   // Check if there's a fragment identifier in the URL
   if (window.location.hash) {
      // Get the target element by its ID
      const targetElement = $(window.location.hash);

      // Determine the offset based on screen width
      const offsetValue = $(window).width() <= 768 ? mobileOffset : desktopOffset;

      // Scroll to the target element with the appropriate offset
      scrollToElementWithOffset(targetElement, offsetValue);
   }

   // Handle click events for navigation links
   $('a[href^="#"]').on('click', function (event) {
      event.preventDefault();
      const target = $($(this).attr('href'));

      // Determine the offset based on screen width
      const offset = $(window).width() <= 768 ? mobileOffset : desktopOffset;

      // Scroll to the target element with the appropriate offset
      scrollToElementWithOffset(target, offset);
   });

   //scroll end

});
