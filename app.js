class DrumSet {
  constructor() {
    this.tiles = document.querySelectorAll(".tile");
    this.playBtn = document.querySelector(".play");
    this.logo = document.querySelector("#play-btn");
    this.playTitle = document.querySelector("h3");
    this.selects = document.querySelectorAll("select");
    this.plus = document.querySelector(".more");
    this.minus = document.querySelector(".less");
    this.frequency = document.querySelector(".bpm-value");
    this.index = 0;
    this.bpm = 150;
    this.crashSound = document.querySelector(".crash-sound");
    this.hihatSound = document.querySelector(".hihat-sound");
    this.kickSound = document.querySelector(".kick-sound");
    this.snareSound = document.querySelector(".snare-sound");
    this.tomSound = document.querySelector(".tom-sound");
    this.onStream = false;
  }

  loop() {
    let column = this.index % 8;
    const currentTiles = document.querySelectorAll(`.n${column}`);
    currentTiles.forEach((tile) => {
      tile.style.animation = `shake 0.3s alternate ease `;
      if (tile.classList.contains("active")) {
        const parentClass = tile.parentElement.classList;
        switch (true) {
          case parentClass.contains("crash-tiles"):
            this.crashSound.currentTime = 0;
            this.crashSound.play();

            break;
          case parentClass.contains("hihat-tiles"):
            this.hihatSound.currentTime = 0;
            this.hihatSound.play();

            break;
          case parentClass.contains("kick-tiles"):
            this.kickSound.currentTime = 0;
            this.kickSound.play();
            break;
          case parentClass.contains("snare-tiles"):
            this.snareSound.currentTime = 0;
            this.snareSound.play();
            break;
          case parentClass.contains("tom-tiles"):
            this.tomSound.currentTime = 0;
            this.tomSound.play();
            break;
        }
      }
    });

    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    if (!this.onStream) {
      this.onStream = setInterval(() => {
        this.loop();
      }, interval);
    }
  }

  changeSource(type, selection) {
    switch (type) {
      case "crash":
        this.crashSound.src = selection;
        break;
      case "hihat":
        this.hihatSound.src = selection;
        break;
      case "kick":
        this.kickSound.src = selection;
        break;
      case "snare":
        this.snareSound.src = selection;
        break;
      case "tom":
        this.tomSound.src = selection;
        break;
    }
  }
  UpdateBPM() {
    this.frequency.value = this.bpm;
    clearInterval(this.onStream);
    this.onStream = false;
    this.start();
  }
}

const drumSet = new DrumSet();

//EVENT LISTENERS//
drumSet.playBtn.addEventListener("click", function () {
  if (drumSet.playTitle.textContent == "Play") {
    drumSet.playTitle.textContent = "Stop";
    drumSet.logo.src = "img/pause.svg";
    drumSet.start();
  } else {
    drumSet.playTitle.textContent = "Play";
    drumSet.logo.src = "img/play.svg";
    clearInterval(drumSet.onStream);
    drumSet.onStream = false;
  }
});

drumSet.tiles.forEach((tile) => {
  tile.addEventListener("click", function () {
    this.classList.toggle("active");
  });
  tile.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumSet.plus.addEventListener("click", function () {
  if (drumSet.bpm < 300) {
    drumSet.bpm += 10;
    drumSet.UpdateBPM();
  }
});
drumSet.minus.addEventListener("click", function () {
  if (drumSet.bpm > 20) {
    drumSet.bpm -= 10;
    drumSet.UpdateBPM();
  }
});

drumSet.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumSet.changeSource(e.target.name, e.target.value);
  });
});
