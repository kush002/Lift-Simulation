const floorContainer = document.getElementById("section-1");
const liftContainer = document.getElementById("section-2");
const floorData = document.getElementById("floorData");
const liftData = document.getElementById("liftData");
const createButton = document.getElementById("createUI");
const waiting = document.getElementById("waiting");
// const lift = document.getElementById("mainLift");
let gate1;
let gate2;
let totalFloor;
let lift;
// lift2;

/////////////////// USER INPUT FIELD AND UI CREATION///////////////////

createButton.addEventListener("click", (event) => {
  event.preventDefault();
  let currentFloor = 0;
  let nextFloor;
  let final;
  let prevTouchDown;
  let finalTouchDown;

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
    // : (lift2 = document.getElementById(`mainLift-${i + 1}`));
    console.log(lift);
    gate1 = document.getElementById("gate-1");
    gate2 = document.getElementById("gate-2");
  }

  /////////////////////LIFT MOVEMENT AND GATE OPEN CLOSE////////////////////////

  let onwork = false;
  let actionQueue = [];
  const openGate = (nextFloor, final) => {
    return new Promise((resolve, reject) => {
      lift.style.bottom = `${nextFloor * 21}vh`;
      lift.style.transition = `all ${final * 2}s`;
      setTimeout(() => {
        gate1.style.left = "92px";
        gate2.style.right = "92px";

        // closeGate();
        setTimeout(() => {
          gate1.style.left = "44px";
          gate2.style.right = "44px";
          resolve();
        }, 2500);
      }, 2000 * final);
    });
  };

  const closeGate = (final) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        waiting.style.display = "none";
        // downButton.textContent = "Down";
        // gate1.style.left = "44px";
        // gate2.style.right = "44px";
        resolve();
      }, 2500);
    });
  };

  const processActionQueue = async () => {
    console.log("before:", actionQueue);

    onwork = true;
    while (actionQueue.length > 0) {
      const { nextFloor, final } = actionQueue.shift();
      console.log(actionQueue);
      try {
        await openGate(nextFloor, final);
        await closeGate();
      } catch (error) {
        console.log(error);
      }
    }

    onwork = false;
  };

  /////////////////////////// FLOOOR CREATION AND LIFT BUTTON//////////////////////////
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
  <div class="floorNum">F-${i + 1}</div>
        <div class="actions">
        ${button}

        </div>
        
      </div>
  `;

    if (floorContainer) floorContainer.insertAdjacentHTML("afterbegin", html);
    if (i < totalFloor - 1) {
      nextFloor = i;
      final = Math.abs(currentFloor - nextFloor);
      let upButton = document.getElementById(`upButton-${i}`);

      upButton.addEventListener("click", () => {
        // upButton.style.backgroundColor = "red";
        nextFloor = i;
        final = Math.abs(currentFloor - nextFloor);

        if (onwork) {
          actionQueue.push({ nextFloor, final });
          currentFloor = nextFloor;
          waiting.style.display = "block";
          console.log("The lift is busy. Please wait.");
          return;
        }

        actionQueue.push({ nextFloor, final });

        if (!onwork) {
          processActionQueue();
        }
        currentFloor = nextFloor;
      });
    }

    if (i > 0) {
      let downButton = document.getElementById(`downButton-${i}`);

      downButton.addEventListener("click", () => {
        // downButton.style.backgroundColor = "red";
        nextFloor = i;
        final = Math.abs(currentFloor - nextFloor);

        if (onwork) {
          actionQueue.push({ nextFloor, final });
          currentFloor = nextFloor;
          waiting.style.display = "block";
          downButton.textContent = "Inline...";
          return;
        }

        actionQueue.push({ nextFloor, final });

        if (!onwork) {
          processActionQueue();

          // downButton.style.backgroundColor = "blue";
        }
        currentFloor = nextFloor;
      });
    }
  }
  lift.style.display = "flex";
  // lift2.style.display = "flex";
});
