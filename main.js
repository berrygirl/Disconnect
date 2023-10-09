
  // YOGA Container Carusel 
  const panels = document.querySelectorAll('.panel')

  panels.forEach(panel => {
      panel.addEventListener('click', () => {
          removeActiveClasses()
          panel.classList.add('active')
      })
  })
  
  function removeActiveClasses() {
      panels.forEach(panel => {
          panel.classList.remove('active')
      })
  }
  
// Breath exercice
const container = document.getElementById('container');
const text = document.getElementById('text');

const totalTime = 7500; //7.5 seconds
const breatheTime = (totalTime / 5) * 2; // 3 sec
const holdTime = totalTime / 5;  // 1.5 sec

breathAnimation();

function breathAnimation() {
  text.innerText = 'Breathe In!';
  container.className = 'container grow';

  setTimeout(() => {
    text.innerText = 'Hold';

    setTimeout(() => {
      text.innerText = 'Breathe Out!';
      container.className = 'container shrink';
    }, holdTime);
  }, breatheTime);
}

setInterval(breathAnimation, totalTime);

// Unsubcribe modal window
 // Get the modal
 var modal = document.getElementById("unsubscribeModal");

 // Function to open the modal
 function openUnsubscribeModal() {
     modal.style.display = "block";
 }

 // Function to close the modal
 function closeUnsubscribeModal() {
     modal.style.display = "none";
 }

 // Function to handle the unsubscribe action
 function unsubscribe() {
     alert("You have been unsubscribed.");
     closeUnsubscribeModal();
 }
