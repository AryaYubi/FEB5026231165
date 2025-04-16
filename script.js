// ----------------- Video Section ------------------

const cardWidth = 250;  // Width of each card
const gap = 16;  // Gap between cards

// Create a generic function to handle scroll behavior for any track
function setupVideoScrolling(videoTrackId, prevButtonId, nextButtonId) {
  const videoTrack = document.getElementById(videoTrackId);
  const prevButton = document.getElementById(prevButtonId);
  const nextButton = document.getElementById(nextButtonId);

  let currentIndex = 0;
  const scrollPositions = [
    0,  // First position (start)
    cardWidth - 150,  // Second position (move slightly to the right)
    (cardWidth + gap) * 2,  // Third position
    // Add more positions as needed
  ];

  const totalCards = videoTrack.children.length;  // Total number of cards in the track

  // Update the button visibility based on scroll position
  function updateButtons() {
    const maxScroll = videoTrack.scrollWidth - videoTrack.clientWidth;
    const currentScroll = videoTrack.scrollLeft;

    // Show left button if scroll is not at the start
    prevButton.classList.toggle("hidden", currentScroll === 0);  // Hide left button at the start
    // Show right button if scroll is not at the end
    nextButton.classList.toggle("hidden", currentScroll >= maxScroll);  // Hide right button at the end
  }

  // Move to the next position in the video scroll
  function moveToNext() {
    if (currentIndex < scrollPositions.length - 1) {
      currentIndex++;
    } else {
      // Infinite scroll, go back to the start (first position)
      currentIndex = 0;
    }

    videoTrack.scrollLeft = scrollPositions[currentIndex];
    updateButtons(); // Update buttons visibility
  }

  // Move to the previous position in the video scroll
  function moveToPrev() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      // Infinite scroll, go to the last position
      currentIndex = scrollPositions.length - 1;
    }

    videoTrack.scrollLeft = scrollPositions[currentIndex];
    updateButtons(); // Update buttons visibility
  }

  // Add event listeners for the buttons
  prevButton.addEventListener("click", moveToPrev);
  nextButton.addEventListener("click", moveToNext);

  // Ensure buttons and scroll positions are updated when the page loads
  window.addEventListener("load", () => {
    updateButtons();
  });
}

// Setup for first video track
setupVideoScrolling("videoTrack", "scrollLeftVideo", "scrollRightVideo");

// Setup for second video track
setupVideoScrolling("videoTrack2", "scrollLeftVideo2", "scrollRightVideo2");
