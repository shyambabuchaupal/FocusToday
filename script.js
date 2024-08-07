const checkboxlist = document.querySelectorAll(".custom-checkbox");
const AllInputFields = document.querySelectorAll(".goal-input");
const errorlevel = document.querySelector(".error-lavel");
const progerssbar = document.querySelector(".progress-bar");
const progessvalue = document.querySelector(".progess-value ");
const progressLavel = document.querySelector(".progress-lavel");

const allquotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just a step away, keep going!",
  " Whoa! You just completed all the goals, time for chill :D",
];

const allgoals = JSON.parse(localStorage.getItem("allgoals")) || {
  first: {
    name: "",
    completed: false,
  },
  second: {
    name: "",
    completed: false,
  },
  third: {
    name: "",
    completed: false,
  },
};

let completedgoals = Object.values(allgoals).filter(
  (goal) => goal.completed
).length;
progessvalue.style.width = `${(completedgoals / 3) * 100}%`;
progessvalue.firstElementChild.innerText = `${completedgoals}/3 completed`;
progressLavel.innerText = allquotes[completedgoals];
console.log(completedgoals);

checkboxlist.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const Allfieldfilled = [...AllInputFields].every((input) => {
      return input.value;
    });
    if (Allfieldfilled) {
      checkbox.parentElement.classList.toggle("completed");
      // progessvalue.style.width = "33.3%";
      const inputid = checkbox.nextElementSibling.id;
      allgoals[inputid].completed = !allgoals[inputid].completed;
      completedgoals = Object.values(allgoals).filter(
        (goal) => goal.completed
      ).length;
      progessvalue.style.width = `${(completedgoals / 3) * 100}%`;
      progessvalue.firstElementChild.innerText = `${completedgoals}/3 completed`;
      progressLavel.innerText = allquotes[completedgoals];
      localStorage.setItem("allgoals", JSON.stringify(allgoals));
    } else {
      progerssbar.classList.add("show-error");
    }
  });
});
AllInputFields.forEach((input) => {
  input.value = allgoals[input.id].name;

  if (allgoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }

  input.addEventListener("focus", (e) => {
    progerssbar.classList.remove("show-error");
  });

  input.addEventListener("input", (e) => {
    if (allgoals[input.id].completed) {
      e.target.value = allgoals[input.id].name;
      return;
    }
    allgoals[input.id].name = input.value;
    localStorage.setItem("allgoals", JSON.stringify(allgoals));
  });
});
