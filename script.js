// Simple functionality for demonstration
document.querySelector(".search-button").addEventListener("click", function () {
  const searchTerm = document.querySelector(".search-input").value;
  if (searchTerm) {
    alert(`Searching for: ${searchTerm}`);
  }
});

document
  .querySelector(".search-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const searchTerm = document.querySelector(".search-input").value;
      if (searchTerm) {
        alert(`Searching for: ${searchTerm}`);
      }
    }
  });

//-----------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const carouselTrack = document.querySelector(".carousel-track");
  const prevButton = document.querySelector(".carousel-nav.prev");
  const nextButton = document.querySelector(".carousel-nav.next");
  const indicators = document.querySelectorAll(".indicator");

  let currentIndex = 0;
  const totalSlides = document.querySelectorAll(".carousel-slide").length;

  // Update carousel position
  function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${currentIndex * 100}vw)`;

    // Update active indicator
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex);
    });
  }

  // Next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }

  // Previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  // Go to specific slide
  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  // Event listeners
  prevButton.addEventListener("click", prevSlide);
  nextButton.addEventListener("click", nextSlide);

  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      goToSlide(index);
    });
  });

  // Auto-advance carousel (optional)
  let autoSlide = setInterval(nextSlide, 5000);

  // Pause auto-slide on hover
  const carouselContainer = document.querySelector(".carousel-container");
  carouselContainer.addEventListener("mouseenter", () => {
    clearInterval(autoSlide);
  });

  carouselContainer.addEventListener("mouseleave", () => {
    autoSlide = setInterval(nextSlide, 5000);
  });

  // Touch swipe support for mobile
  let startX = 0;
  let endX = 0;

  carouselContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  carouselContainer.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }
});

//###########################################################################################

// Simple hover effects
document.querySelectorAll(".product-button").forEach((button) => {
  button.addEventListener("mouseenter", function () {
    this.style.backgroundColor = "#F7CA00";
  });

  button.addEventListener("mouseleave", function () {
    this.style.backgroundColor = "#FFD814";
  });
});

document.querySelectorAll(".shop-more-button").forEach((button) => {
  button.addEventListener("mouseenter", function () {
    this.style.backgroundColor = "#F0F2F2";
  });

  button.addEventListener("mouseleave", function () {
    this.style.backgroundColor = "transparent";
  });
});

// #ff6200
// #ff9946

// Add click functionality to items
document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("click", function () {
    const itemText = this.querySelector(".item-text").textContent;
    alert(`Selected: ${itemText}`);
  });
});

// Add hover effects to explore buttons
document.querySelectorAll(".explore-button").forEach((button) => {
  button.addEventListener("mouseenter", function () {
    this.style.backgroundColor = "#F0F2F2";
  });

  button.addEventListener("mouseleave", function () {
    this.style.backgroundColor = "transparent";
  });
});

///000000000000000000000000000000000000000000000000000000000000000000000000000000000000

document.addEventListener("DOMContentLoaded", function () {
  const bookSlider = document.querySelector(".book-slider");
  const prevButton = document.querySelector(".slide-control.prev");
  const nextButton = document.querySelector(".slide-control.next");
  const dots = document.querySelectorAll(".dot");
  const bookCards = document.querySelectorAll(".book-card");

  let currentSlide = 0;
  let visibleBooks = getVisibleBooksCount();

  function getVisibleBooksCount() {
    const width = window.innerWidth;
    if (width >= 1200) return 6;
    if (width >= 992) return 5;
    return 5;
  }

  function updateSlider() {
    const bookWidth = 100 / visibleBooks;
    const translateX = currentSlide * bookWidth;
    bookSlider.style.transform = `translateX(-${translateX}%)`;

    const maxSlide = Math.ceil(bookCards.length / visibleBooks) - 1;
    const activeDot = Math.min(currentSlide, maxSlide);

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === activeDot);
    });
  }

  function nextBook() {
    const maxSlide = Math.ceil(bookCards.length / visibleBooks) - 1;
    currentSlide = (currentSlide + 1) % (maxSlide + 1);
    updateSlider();
  }

  function prevBook() {
    const maxSlide = Math.ceil(bookCards.length / visibleBooks) - 1;
    currentSlide = (currentSlide - 1 + (maxSlide + 1)) % (maxSlide + 1);
    updateSlider();
  }

  function goToBook(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
  }

  // Event listeners
  nextButton.addEventListener("click", nextBook);
  prevButton.addEventListener("click", prevBook);

  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const slideIndex = parseInt(this.getAttribute("data-slide"));
      goToBook(slideIndex);
    });
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    visibleBooks = getVisibleBooksCount();
    currentSlide = 0;
    updateSlider();
  });

  // Auto-advance slider
  let autoAdvance = setInterval(nextBook, 4000);

  // Pause auto-advance on hover
  const carousel = document.querySelector(".book-carousel");
  carousel.addEventListener("mouseenter", () => clearInterval(autoAdvance));
  carousel.addEventListener("mouseleave", () => {
    autoAdvance = setInterval(nextBook, 4000);
  });

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipeGesture();
  });

  function handleSwipeGesture() {
    const swipeThreshold = 50;

    if (touchStartX - touchEndX > swipeThreshold) {
      nextBook();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      prevBook();
    }
  }

  // Initialize slider
  updateSlider();
});

//###################################################################################################

document.addEventListener("DOMContentLoaded", function () {
  const techSlider = document.querySelector(".tech-slider");
  const prevButton = document.querySelector(".tech-slide-control.prev");
  const nextButton = document.querySelector(".tech-slide-control.next");
  const dots = document.querySelectorAll(".tech-dot");
  const techCards = document.querySelectorAll(".tech-card");

  let currentSlide = 0;
  let visibleTech = getVisibleTechCount();

  function getVisibleTechCount() {
    const width = window.innerWidth;
    if (width >= 1200) return 6;
    if (width >= 992) return 5;
    return 5;
  }

  function updateTechSlider() {
    const techWidth = 100 / visibleTech;
    const translateX = currentSlide * techWidth;
    techSlider.style.transform = `translateX(-${translateX}%)`;

    const maxSlide = Math.ceil(techCards.length / visibleTech) - 1;
    const activeDot = Math.min(currentSlide, maxSlide);

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === activeDot);
    });
  }

  function nextTech() {
    const maxSlide = Math.ceil(techCards.length / visibleTech) - 1;
    currentSlide = (currentSlide + 1) % (maxSlide + 1);
    updateTechSlider();
  }

  function prevTech() {
    const maxSlide = Math.ceil(techCards.length / visibleTech) - 1;
    currentSlide = (currentSlide - 1 + (maxSlide + 1)) % (maxSlide + 1);
    updateTechSlider();
  }

  function goToTech(slideIndex) {
    currentSlide = slideIndex;
    updateTechSlider();
  }

  // Event listeners
  nextButton.addEventListener("click", nextTech);
  prevButton.addEventListener("click", prevTech);

  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const slideIndex = parseInt(this.getAttribute("data-slide"));
      goToTech(slideIndex);
    });
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    visibleTech = getVisibleTechCount();
    currentSlide = 0;
    updateTechSlider();
  });

  // Auto-advance slider
  let autoAdvance = setInterval(nextTech, 4000);

  // Pause auto-advance on hover
  const carousel = document.querySelector(".tech-carousel");
  carousel.addEventListener("mouseenter", () => clearInterval(autoAdvance));
  carousel.addEventListener("mouseleave", () => {
    autoAdvance = setInterval(nextTech, 4000);
  });

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipeGesture();
  });

  function handleSwipeGesture() {
    const swipeThreshold = 50;

    if (touchStartX - touchEndX > swipeThreshold) {
      nextTech();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      prevTech();
    }
  }

  // Initialize slider
  updateTechSlider();
});

//#############################################################################

document.addEventListener("DOMContentLoaded", function () {
  const holidaySlider = document.querySelector(".holiday-slider");
  const prevButton = document.querySelector(".holiday-slide-control.prev");
  const nextButton = document.querySelector(".holiday-slide-control.next");
  const dots = document.querySelectorAll(".holiday-dot");
  const holidayCards = document.querySelectorAll(".holiday-card");

  let currentSlide = 0;
  let visibleHoliday = getVisibleHolidayCount();

  function getVisibleHolidayCount() {
    const width = window.innerWidth;
    if (width >= 1200) return 6;
    if (width >= 992) return 5;
    return 5;
  }

  function updateHolidaySlider() {
    const holidayWidth = 100 / visibleHoliday;
    const translateX = currentSlide * holidayWidth;
    holidaySlider.style.transform = `translateX(-${translateX}%)`;

    const maxSlide = Math.ceil(holidayCards.length / visibleHoliday) - 1;
    const activeDot = Math.min(currentSlide, maxSlide);

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === activeDot);
    });
  }

  function nextHoliday() {
    const maxSlide = Math.ceil(holidayCards.length / visibleHoliday) - 1;
    currentSlide = (currentSlide + 1) % (maxSlide + 1);
    updateHolidaySlider();
  }

  function prevHoliday() {
    const maxSlide = Math.ceil(holidayCards.length / visibleHoliday) - 1;
    currentSlide = (currentSlide - 1 + (maxSlide + 1)) % (maxSlide + 1);
    updateHolidaySlider();
  }

  function goToHoliday(slideIndex) {
    currentSlide = slideIndex;
    updateHolidaySlider();
  }

  // Event listeners
  nextButton.addEventListener("click", nextHoliday);
  prevButton.addEventListener("click", prevHoliday);

  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const slideIndex = parseInt(this.getAttribute("data-slide"));
      goToHoliday(slideIndex);
    });
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    visibleHoliday = getVisibleHolidayCount();
    currentSlide = 0;
    updateHolidaySlider();
  });

  // Auto-advance slider
  let autoAdvance = setInterval(nextHoliday, 4000);

  // Pause auto-advance on hover
  const carousel = document.querySelector(".holiday-carousel");
  carousel.addEventListener("mouseenter", () => clearInterval(autoAdvance));
  carousel.addEventListener("mouseleave", () => {
    autoAdvance = setInterval(nextHoliday, 4000);
  });

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipeGesture();
  });

  function handleSwipeGesture() {
    const swipeThreshold = 50;

    if (touchStartX - touchEndX > swipeThreshold) {
      nextHoliday();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      prevHoliday();
    }
  }

  // Initialize slider
  updateHolidaySlider();
});

//88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888

document.addEventListener("DOMContentLoaded", function () {
  const watchesSlider = document.querySelector(".watches-slider");
  const prevButton = document.querySelector(".watches-slide-control.prev");
  const nextButton = document.querySelector(".watches-slide-control.next");
  const dots = document.querySelectorAll(".watches-dot");
  const watchCards = document.querySelectorAll(".watch-card");

  let currentSlide = 0;
  let visibleWatches = getVisibleWatchesCount();

  function getVisibleWatchesCount() {
    const width = window.innerWidth;
    if (width >= 1200) return 6;
    if (width >= 992) return 5;
    return 5;
  }

  function updateWatchesSlider() {
    const watchWidth = 100 / visibleWatches;
    const translateX = currentSlide * watchWidth;
    watchesSlider.style.transform = `translateX(-${translateX}%)`;

    const maxSlide = Math.ceil(watchCards.length / visibleWatches) - 1;
    const activeDot = Math.min(currentSlide, maxSlide);

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === activeDot);
    });
  }

  function nextWatch() {
    const maxSlide = Math.ceil(watchCards.length / visibleWatches) - 1;
    currentSlide = (currentSlide + 1) % (maxSlide + 1);
    updateWatchesSlider();
  }

  function prevWatch() {
    const maxSlide = Math.ceil(watchCards.length / visibleWatches) - 1;
    currentSlide = (currentSlide - 1 + (maxSlide + 1)) % (maxSlide + 1);
    updateWatchesSlider();
  }

  function goToWatch(slideIndex) {
    currentSlide = slideIndex;
    updateWatchesSlider();
  }

  // Event listeners
  nextButton.addEventListener("click", nextWatch);
  prevButton.addEventListener("click", prevWatch);

  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const slideIndex = parseInt(this.getAttribute("data-slide"));
      goToWatch(slideIndex);
    });
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    visibleWatches = getVisibleWatchesCount();
    currentSlide = 0;
    updateWatchesSlider();
  });

  // Auto-advance slider
  let autoAdvance = setInterval(nextWatch, 4000);

  // Pause auto-advance on hover
  const carousel = document.querySelector(".watches-carousel");
  carousel.addEventListener("mouseenter", () => clearInterval(autoAdvance));
  carousel.addEventListener("mouseleave", () => {
    autoAdvance = setInterval(nextWatch, 4000);
  });

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipeGesture();
  });

  function handleSwipeGesture() {
    const swipeThreshold = 50;

    if (touchStartX - touchEndX > swipeThreshold) {
      nextWatch();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      prevWatch();
    }
  }

  // Initialize slider
  updateWatchesSlider();
});

//00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

document.addEventListener("DOMContentLoaded", function () {
  const homekitchenSlider = document.querySelector(".homekitchen-slider");
  const prevButton = document.querySelector(".homekitchen-slide-control.prev");
  const nextButton = document.querySelector(".homekitchen-slide-control.next");
  const dots = document.querySelectorAll(".homekitchen-dot");
  const homekitchenCards = document.querySelectorAll(".homekitchen-card");

  let currentSlide = 0;
  let visibleHomeKitchen = getVisibleHomeKitchenCount();

  function getVisibleHomeKitchenCount() {
    const width = window.innerWidth;
    if (width >= 1200) return 6;
    if (width >= 992) return 5;
    return 5;
  }

  function updateHomeKitchenSlider() {
    const homekitchenWidth = 100 / visibleHomeKitchen;
    const translateX = currentSlide * homekitchenWidth;
    homekitchenSlider.style.transform = `translateX(-${translateX}%)`;

    const maxSlide =
      Math.ceil(homekitchenCards.length / visibleHomeKitchen) - 1;
    const activeDot = Math.min(currentSlide, maxSlide);

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === activeDot);
    });
  }

  function nextHomeKitchen() {
    const maxSlide =
      Math.ceil(homekitchenCards.length / visibleHomeKitchen) - 1;
    currentSlide = (currentSlide + 1) % (maxSlide + 1);
    updateHomeKitchenSlider();
  }

  function prevHomeKitchen() {
    const maxSlide =
      Math.ceil(homekitchenCards.length / visibleHomeKitchen) - 1;
    currentSlide = (currentSlide - 1 + (maxSlide + 1)) % (maxSlide + 1);
    updateHomeKitchenSlider();
  }

  function goToHomeKitchen(slideIndex) {
    currentSlide = slideIndex;
    updateHomeKitchenSlider();
  }

  // Event listeners
  nextButton.addEventListener("click", nextHomeKitchen);
  prevButton.addEventListener("click", prevHomeKitchen);

  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const slideIndex = parseInt(this.getAttribute("data-slide"));
      goToHomeKitchen(slideIndex);
    });
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    visibleHomeKitchen = getVisibleHomeKitchenCount();
    currentSlide = 0;
    updateHomeKitchenSlider();
  });

  // Auto-advance slider
  let autoAdvance = setInterval(nextHomeKitchen, 4000);

  // Pause auto-advance on hover
  const carousel = document.querySelector(".homekitchen-carousel");
  carousel.addEventListener("mouseenter", () => clearInterval(autoAdvance));
  carousel.addEventListener("mouseleave", () => {
    autoAdvance = setInterval(nextHomeKitchen, 4000);
  });

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipeGesture();
  });

  function handleSwipeGesture() {
    const swipeThreshold = 50;

    if (touchStartX - touchEndX > swipeThreshold) {
      nextHomeKitchen();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      prevHomeKitchen();
    }
  }

  // Initialize slider
  updateHomeKitchenSlider();
});

//00000000000000000000000000000000000000000000000000000000000000000000000000000

document.addEventListener("DOMContentLoaded", function () {
  const blackfridaySlider = document.querySelector(".blackfriday-slider");
  const prevButton = document.querySelector(".blackfriday-slide-control.prev");
  const nextButton = document.querySelector(".blackfriday-slide-control.next");
  const dots = document.querySelectorAll(".blackfriday-dot");
  const blackfridayCards = document.querySelectorAll(".blackfriday-card");

  let currentSlide = 0;
  let visibleDeals = getVisibleDealsCount();
  let totalSlides = Math.ceil(blackfridayCards.length / visibleDeals);

  function getVisibleDealsCount() {
    const width = window.innerWidth;
    if (width >= 1200) return 6;
    if (width >= 992) return 5;
    if (width >= 768) return 4;
    if (width >= 576) return 3;
    return 2;
  }

  function updateBlackFridaySlider() {
    const dealWidth = 100 / visibleDeals;
    const translateX = currentSlide * dealWidth;
    blackfridaySlider.style.transform = `translateX(-${translateX}%)`;

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });

    // Update arrow visibility
    prevButton.style.display = currentSlide === 0 ? "none" : "flex";
    nextButton.style.display =
      currentSlide >= totalSlides - 1 ? "none" : "flex";
  }

  function nextDeal() {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateBlackFridaySlider();
    }
  }

  function prevDeal() {
    if (currentSlide > 0) {
      currentSlide--;
      updateBlackFridaySlider();
    }
  }

  function goToDeal(slideIndex) {
    if (slideIndex >= 0 && slideIndex < totalSlides) {
      currentSlide = slideIndex;
      updateBlackFridaySlider();
    }
  }

  // Event listeners
  nextButton.addEventListener("click", nextDeal);
  prevButton.addEventListener("click", prevDeal);

  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const slideIndex = parseInt(this.getAttribute("data-slide"));
      goToDeal(slideIndex);
    });
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    visibleDeals = getVisibleDealsCount();
    totalSlides = Math.ceil(blackfridayCards.length / visibleDeals);
    currentSlide = 0;
    updateBlackFridaySlider();

    // Update dots based on new total slides
    const dotsContainer = document.querySelector(".blackfriday-carousel-dots");
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.className = `blackfriday-dot ${i === 0 ? "active" : ""}`;
      dot.setAttribute("data-slide", i);
      dotsContainer.appendChild(dot);
    }

    // Reattach event listeners to new dots
    document.querySelectorAll(".blackfriday-dot").forEach((dot) => {
      dot.addEventListener("click", function () {
        const slideIndex = parseInt(this.getAttribute("data-slide"));
        goToDeal(slideIndex);
      });
    });
  });

  // Auto-advance slider
  let autoAdvance = setInterval(nextDeal, 4000);

  // Pause auto-advance on hover
  const carousel = document.querySelector(".blackfriday-carousel");
  carousel.addEventListener("mouseenter", () => clearInterval(autoAdvance));
  carousel.addEventListener("mouseleave", () => {
    autoAdvance = setInterval(nextDeal, 4000);
  });

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipeGesture();
  });

  function handleSwipeGesture() {
    const swipeThreshold = 50;

    if (touchStartX - touchEndX > swipeThreshold) {
      nextDeal();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      prevDeal();
    }
  }

  // Initialize slider
  updateBlackFridaySlider();
});

//0000000000000000000000000000000000000000000000000000000000000000000000000000000

document.addEventListener("DOMContentLoaded", function () {
  const imageSlider = document.querySelector(".image-slider");
  const prevButton = document.querySelector(".image-slide-control.prev");
  const nextButton = document.querySelector(".image-slide-control.next");
  const dots = document.querySelectorAll(".image-dot");
  const imageCards = document.querySelectorAll(".image-card");

  let currentSlide = 0;
  let visibleImages = getVisibleImagesCount();

  function getVisibleImagesCount() {
    const width = window.innerWidth;
    if (width >= 1200) return 6;
    if (width >= 992) return 5;
    return 5;
  }

  function updateSlider() {
    const imageWidth = 100 / visibleImages;
    const translateX = currentSlide * imageWidth;
    imageSlider.style.transform = `translateX(-${translateX}%)`;

    const maxSlide = Math.ceil(imageCards.length / visibleImages) - 1;
    const activeDot = Math.min(currentSlide, maxSlide);

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === activeDot);
    });
  }

  function nextImage() {
    const maxSlide = Math.ceil(imageCards.length / visibleImages) - 1;
    currentSlide = (currentSlide + 1) % (maxSlide + 1);
    updateSlider();
  }

  function prevImage() {
    const maxSlide = Math.ceil(imageCards.length / visibleImages) - 1;
    currentSlide = (currentSlide - 1 + (maxSlide + 1)) % (maxSlide + 1);
    updateSlider();
  }

  function goToImage(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
  }

  // Event listeners
  nextButton.addEventListener("click", nextImage);
  prevButton.addEventListener("click", prevImage);

  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const slideIndex = parseInt(this.getAttribute("data-slide"));
      goToImage(slideIndex);
    });
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    visibleImages = getVisibleImagesCount();
    currentSlide = 0;
    updateSlider();
  });

  // Auto-advance slider
  let autoAdvance = setInterval(nextImage, 4000);

  // Pause auto-advance on hover
  const carousel = document.querySelector(".image-carousel-container");
  carousel.addEventListener("mouseenter", () => clearInterval(autoAdvance));
  carousel.addEventListener("mouseleave", () => {
    autoAdvance = setInterval(nextImage, 4000);
  });

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipeGesture();
  });

  function handleSwipeGesture() {
    const swipeThreshold = 50;

    if (touchStartX - touchEndX > swipeThreshold) {
      nextImage();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      prevImage();
    }
  }

  // Initialize slider
  updateSlider();
});

// 00000000000000000000000000000000000000000000000000

// Add functionality to the sign in button
document
  .querySelector(".sign-in-button")
  .addEventListener("click", function () {
    alert("Sign in functionality would go here");
  });

// Add functionality to the start here link
document
  .querySelector(".start-here-link")
  .addEventListener("click", function (e) {
    e.preventDefault();
    alert("New customer registration would start here");
  });

//000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

// Add click functionality to grid items
document.querySelectorAll(".grid-item").forEach((item) => {
  item.addEventListener("click", function () {
    const text = this.textContent;
    alert(`Clicked: ${text}`);
  });
});

//0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

// Add functionality to buttons
document
  .querySelector(".currency-button")
  .addEventListener("click", function () {
    alert("Currency selection would open here");
  });

document
  .querySelector(".country-button")
  .addEventListener("click", function () {
    alert("Country selection would open here");
  });

// Language selector change
document
  .querySelector(".language-selector select")
  .addEventListener("change", function () {
    alert(`Language changed to: ${this.options[this.selectedIndex].text}`);
  });

//00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

// Add click functionality to service items
document.querySelectorAll(".service-item").forEach((item) => {
  item.addEventListener("click", function () {
    const title = this.querySelector(".service-title").textContent;
    alert(`Navigating to: ${title}`);
  });
});

// Add keyboard navigation support
document.querySelectorAll(".service-item").forEach((item) => {
  item.setAttribute("tabindex", "0");
  item.addEventListener("keypress", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      const title = this.querySelector(".service-title").textContent;
      alert(`Navigating to: ${title}`);
    }
  });
});

//00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

// Add click functionality to footer links
        document.querySelectorAll('.footer-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const linkText = this.textContent;
                alert(`Navigating to: ${linkText}`);
            });
        });