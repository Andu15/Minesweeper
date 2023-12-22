const beginnerBtn = document.getElementById("beginner-btn");
const intermediateBtn = document.getElementById("intermediate-btn");
const expertBtn = document.getElementById("expert-btn");

// tab
function openCity(evt, tabName) {
  // Declare all variables
  let i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

// seleccionar su version de cuadriculas
beginnerBtn.addEventListener("click", () => {
  sessionStorage.setItem('gridsNumber', 4);
  window.location.replace('game.html');
})
intermediateBtn.addEventListener("click", () => {
  sessionStorage.setItem('gridsNumber', 6);
  window.location.replace('game.html');
})
expertBtn.addEventListener("click", () => {
  sessionStorage.setItem('gridsNumber', 8);
  window.location.replace('game.html');
})