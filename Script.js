const comicBox = document.getElementById("comic-box");
const comicImage = document.getElementById("comic-image");
const startBtn = document.getElementById("startBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const decisionBtns = document.getElementById("decisionBtns");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const returnBtn = document.createElement("button");
returnBtn.textContent = "Return to Beginning";
returnBtn.style.display = "none";
document.getElementById("comic-controls").appendChild(returnBtn);

let comicImages = [];
let currentImageIndex = 0;
let state = "start";

function loadComic() {
  comicImages = [
    "bob (01).png",
    "bob (02).png",
    "bob (03).png",
    "bob (04).png", // CHOICE point
    "bob 05 (01) NO-Part.png",
    "bob 05 (01) YES-Part.png",
    "bob 06 (02) NO-Part.png",
    "bob 06 (02) YES-Part.png",
    "bob 07 (03) NO-Part.png",
    "bob 07 (03) YES-Part.png",
    "bob 08.png"
  ];
}

function showImage(index) {
  if (index >= 0 && index < comicImages.length) {
    comicImage.src = comicImages[index];
    comicImage.style.display = "block";
  }
}

// Start
startBtn.addEventListener("click", () => {
  loadComic();
  currentImageIndex = 0;
  showImage(currentImageIndex);
  startBtn.style.display = "none";
  nextBtn.style.display = "inline-block";
  prevBtn.style.display = "none";
  returnBtn.style.display = "none";
  decisionBtns.style.display = "none";
  state = "main";
});

// Next
nextBtn.addEventListener("click", () => {
  if (state === "main") {
    currentImageIndex++;
    showImage(currentImageIndex);

    if (currentImageIndex === 3) {
      nextBtn.style.display = "none";
      decisionBtns.style.display = "block";
      return;
    }
    prevBtn.style.display = currentImageIndex > 0 ? "inline-block" : "none";
  } else if (state === "yes") {
    if (currentImageIndex === 5) currentImageIndex = 7;
    else if (currentImageIndex === 7) currentImageIndex = 9;
    else if (currentImageIndex === 9) currentImageIndex = 10;
    else return;

    showImage(currentImageIndex);

    if (currentImageIndex === 10) {
      nextBtn.style.display = "none";
      returnBtn.style.display = "inline-block";
    }
  } else if (state === "no") {
    if (currentImageIndex === 4) currentImageIndex = 6;
    else if (currentImageIndex === 6) currentImageIndex = 8;
    else return;

    showImage(currentImageIndex);

    if (currentImageIndex === 8) {
      nextBtn.style.display = "none";
      returnBtn.style.display = "inline-block";
    }
  }
});

// Previous
prevBtn.addEventListener("click", () => {
  if (state === "main" && currentImageIndex > 0 && currentImageIndex <= 3) {
    currentImageIndex--;
    showImage(currentImageIndex);
    nextBtn.style.display = "inline-block";
    if (currentImageIndex === 0) {
      prevBtn.style.display = "none";
    }
  }
});

// Yes
yesBtn.addEventListener("click", () => {
  state = "yes";
  currentImageIndex = 5;
  showImage(currentImageIndex);
  decisionBtns.style.display = "none";
  nextBtn.style.display = "inline-block";
  prevBtn.style.display = "none";
});

// No
noBtn.addEventListener("click", () => {
  state = "no";
  currentImageIndex = 4;
  showImage(currentImageIndex);
  decisionBtns.style.display = "none";
  nextBtn.style.display = "inline-block";
  prevBtn.style.display = "none";
});

// Return
returnBtn.addEventListener("click", () => {
  currentImageIndex = 0;
  showImage(currentImageIndex);
  state = "main";
  startBtn.style.display = "none";
  nextBtn.style.display = "inline-block";
  prevBtn.style.display = "none";
  decisionBtns.style.display = "none";
  returnBtn.style.display = "none";
});
