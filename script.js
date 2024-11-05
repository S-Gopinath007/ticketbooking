// script.js
document.addEventListener("DOMContentLoaded", function() {
    const seats = document.querySelectorAll('.seat.available'); // All available seats
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || []; // Get selected seats from localStorage, or initialize with an empty array
    const seatList = document.getElementById('seat-list');
    const proceedButton = document.getElementById('proceed-to-payment');

    // Function to update the seat list in the UI
    function updateSeatList() {
        seatList.textContent = selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None';
        proceedButton.disabled = selectedSeats.length === 0;
    }

    // Function to handle seat selection
    function toggleSeatSelection(seat) {
        const seatNumber = seat.getAttribute('data-seat');

        if (seat.classList.contains('selected')) {
            // If the seat is already selected, remove it from the selection
            seat.classList.remove('selected');
            const index = selectedSeats.indexOf(seatNumber);
            if (index > -1) {
                selectedSeats.splice(index, 1);
            }
        } else {
            // If the seat is not selected, add it to the selection
            seat.classList.add('selected');
            selectedSeats.push(seatNumber);
        }

        // Save the selected seats to localStorage
        localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));

        // Update the seat list display
        updateSeatList();
    }

    // Attach click event to each available seat
    seats.forEach(seat => {
        seat.addEventListener('click', () => toggleSeatSelection(seat));
    });

    // Mark selected seats on page load
    selectedSeats.forEach(seatNumber => {
        const seat = document.querySelector(`.seat[data-seat="${seatNumber}"]`);
        if (seat) {
            seat.classList.add('selected');
        }
    });

    // Initialize seat list and button state
    updateSeatList();
});
