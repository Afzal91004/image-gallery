const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");
const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

const imageFilenames = [
  "pic1.jpg",
  "pic2.jpg",
  "pic3.jpg",
  "pic4.jpg",
  "pic5.jpg",
];

const imageAltTexts = {
  "pic1.jpg": "Closeup of a human eye",
  "pic2.jpg": "Rock formation resembling a wave",
  "pic3.jpg": "Purple and white flowers",
  "pic4.jpg": "Ancient Egyptian wall painting",
  "pic5.jpg": "Butterfly on a leaf",
};

function updateActiveThumbnail(activeSrc) {
  document.querySelectorAll(".thumb-bar img").forEach((img) => {
    img.classList.remove("active");

    if (img.getAttribute("src") === activeSrc) {
      img.classList.add("active");
    }
  });
}

function changeDisplayedImage(src, alt) {
  displayedImage.style.opacity = "0";

  setTimeout(() => {
    displayedImage.setAttribute("src", src);
    displayedImage.setAttribute("alt", alt);
    displayedImage.style.opacity = "1";

    updateActiveThumbnail(src);
  }, 200);
}

for (const filename of imageFilenames) {
  const newImage = document.createElement("img");
  const imagePath = `images/${filename}`;
  newImage.setAttribute("src", imagePath);
  newImage.setAttribute("alt", imageAltTexts[filename]);
  thumbBar.appendChild(newImage);

  if (filename === imageFilenames[0]) {
    newImage.classList.add("active");
  }

  newImage.addEventListener("click", () => {
    changeDisplayedImage(imagePath, imageAltTexts[filename]);
  });
}

btn.addEventListener("click", () => {
  const currentClass = btn.getAttribute("class");

  if (currentClass === "dark") {
    btn.setAttribute("class", "light");
    btn.textContent = "Lighten";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  } else {
    btn.setAttribute("class", "dark");
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
  }
});

document.addEventListener("keydown", (e) => {
  const currentSrc = displayedImage.getAttribute("src");
  const currentIndex = imageFilenames.findIndex(
    (filename) => `images/${filename}` === currentSrc
  );
  let newIndex;

  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
    newIndex = (currentIndex + 1) % imageFilenames.length;
  } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    newIndex =
      (currentIndex - 1 + imageFilenames.length) % imageFilenames.length;
  } else {
    return;
  }

  const newFilename = imageFilenames[newIndex];
  changeDisplayedImage(`images/${newFilename}`, imageAltTexts[newFilename]);
});

let touchStartX = 0;
let touchEndX = 0;

document.querySelector(".full-img").addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.querySelector(".full-img").addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const currentSrc = displayedImage.getAttribute("src");
  const currentIndex = imageFilenames.findIndex(
    (filename) => `images/${filename}` === currentSrc
  );
  let newIndex;

  if (touchEndX < touchStartX - 50) {
    newIndex = (currentIndex + 1) % imageFilenames.length;
  } else if (touchEndX > touchStartX + 50) {
    newIndex =
      (currentIndex - 1 + imageFilenames.length) % imageFilenames.length;
  } else {
    return;
  }

  const newFilename = imageFilenames[newIndex];
  changeDisplayedImage(`images/${newFilename}`, imageAltTexts[newFilename]);
}

document.addEventListener("DOMContentLoaded", () => {
  displayedImage.style.opacity = "0";
  setTimeout(() => {
    displayedImage.style.opacity = "1";
  }, 300);
});
