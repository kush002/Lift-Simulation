const floorContainer = document.getElementById("section-1");
const liftContainer = document.getElementById("section-2");
const floorData = document.getElementById("floorData");
const liftData = document.getElementById("liftData");
const createButton = document.getElementById("createUI");
// const lift = document.getElementById("mainLift");
let gate1;
let gate2;
let totalFloor;
let lift;
createButton.addEventListener("click", (event) => {
  event.preventDefault();
  let currentFloor = 0;
  let nextFloor;
  let final;

  totalFloor = floorData.value;
  totalLift = liftData.value;
  for (let i = 0; i <= totalLift - 1; i++) {
    let html = `
    <div class="lift" id="mainLift-${i + 1}">
    <div id="gate-1"></div>
    <div id="gate-2"></div>
  </div>
    `;
    if (liftContainer) liftContainer.insertAdjacentHTML("afterbegin", html);
    lift = document.getElementById(`mainLift-${i + 1}`);
    console.log(lift);
    gate1 = document.getElementById("gate-1");
    gate2 = document.getElementById("gate-2");
  }

  for (let i = 0; i <= totalFloor - 1; i++) {
    let button;
    if (i === 0) {
      button = `<button id=upButton-${i}>Up</button>`;
    } else if (i > 0 && i < totalFloor - 1) {
      button = `<button id=upButton-${i}>Up</button>
      <button id=downButton-${i}>Down</button>`;
    } else {
      button = `<button id=downButton-${i}>Down</button>`;
    }

    let html = `
  <div class="floor">
  <div>floor${i + 1}</div>
        <div class="actions">
        ${button}

        </div>
        
      </div>
  `;

    if (floorContainer) floorContainer.insertAdjacentHTML("afterbegin", html);
    if (i < totalFloor - 1) {
      let upButton = document.getElementById(`upButton-${i}`);
      upButton.addEventListener("click", () => {
        nextFloor = i;
        final = Math.abs(currentFloor - nextFloor);

        lift.style.bottom = `${i * 21}vh`;
        lift.style.transition = `all ${2 * final}s`;
        setTimeout(() => {
          gate1.style.left = "92px";
          gate2.style.right = "92px";
          setTimeout(() => {
            gate1.style.left = "44px";
            gate2.style.right = "44px";
          }, 2500);
        }, 2000 * final);
        currentFloor = nextFloor;
      });
    }

    if (i > 0) {
      let downButton = document.getElementById(`downButton-${i}`);

      downButton.addEventListener("click", () => {
        nextFloor = i;
        final = Math.abs(currentFloor - nextFloor);

        lift.style.bottom = `${i * 21}vh`;
        lift.style.transition = `all ${final * 2}s`;
        setTimeout(() => {
          gate1.style.left = "92px";
          gate2.style.right = "92px";
          setTimeout(() => {
            gate1.style.left = "44px";
            gate2.style.right = "44px";
          }, 2500);
        }, 2000 * final);
        currentFloor = nextFloor;
      });
    }
  }
  lift.style.display = "flex";
});
