// Retrieve the pantry array from localStorage or initialize it as an empty array if not found 
let pantry = JSON.parse(localStorage.getItem('pantry')) || [];

// Function to save the pantry array to localStorage
function saveToLocalStorage() {
    localStorage.setItem('pantry', JSON.stringify(pantry));
}

// Function to toggle the visibility of the "Add to Pantry" form
function toggleAddForm() {
    const formContainer = document.getElementById('add-form-container');
    formContainer.style.display = (formContainer.style.display === 'none' || formContainer.style.display === '') ? 'block' : 'none';
}

// Function to add item to the pantry
function addItem() {
    const name = document.getElementById('name').value;
    const bestByDate = document.getElementById('bestByDate').value;
    const quantity = document.getElementById('quantity').value;

    if (name && bestByDate && quantity) {
        // Add the new item to the pantry array
        pantry.push({
            name: name,
            bestByDate: bestByDate,
            quantity: parseInt(quantity) // Store quantity as integer
        });
        alert(`Added ${name} to your pantry!`);

        // Save to localStorage
        saveToLocalStorage();

        // Clear the form fields after adding
        document.getElementById('name').value = '';
        document.getElementById('bestByDate').value = '';
        document.getElementById('quantity').value = '';

        // Close the form after adding
        document.getElementById('add-form-container').style.display = 'none';

        // Update the pantry display
        updatePantryItems();
    } else {
        alert('Please fill in all fields');
    }
}

// Function to remove an item from the pantry
function removeItem() {
    const itemSelect = document.getElementById('remove-item-select');
    const name = itemSelect.value;
    const quantityToRemove = parseInt(document.getElementById('remove-quantity').value);

    if (name && quantityToRemove > 0) {
        const index = pantry.findIndex(item => item.name === name);
        if (index !== -1) {
            if (pantry[index].quantity > quantityToRemove) {
                pantry[index].quantity -= quantityToRemove;
            } else {
                pantry.splice(index, 1);
            }
            alert(`Removed ${quantityToRemove} of ${name} from your pantry!`);
            saveToLocalStorage(); // Save the updated pantry to localStorage
            updatePantryItems(); // Update the pantry display
            updateRemoveOptions();

        }
    } else {
        alert('Please select an item and enter a valid quantity.');
    }
}

// clear pantry button
// Function to clear all items from the pantry
function clearPantry() {
    // Clear the pantry array
    pantry = [];

    // Remove the items from localStorage
    localStorage.removeItem('pantry');

    // Update the pantry display (clear the items on the screen)
    updatePantryItems();

    // Update the remove options dropdown
    updateRemoveOptions();

    // Show an alert to confirm
    alert('Your pantry has been cleared!');
}

// Function to toggle the visibility of the "Remove from Pantry" form
function toggleRemoveForm() {
    const removeFormContainer = document.getElementById('remove-form-container');
    removeFormContainer.style.display = (removeFormContainer.style.display === 'none' || removeFormContainer.style.display === '') ? 'block' : 'none';
    updateRemoveOptions();  // Update the options every time the form is toggled
}

// Function to update the drop-down list for "Remove from Pantry"
function updateRemoveOptions() {
    const itemSelect = document.getElementById('remove-item-select');
    itemSelect.innerHTML = ''; // Clear previous options

    // Populate the select dropdown with items from the pantry
    pantry.forEach(item => {
        const option = document.createElement('option');
        option.value = item.name;
        option.textContent = `${item.name} (${item.quantity})`;
        itemSelect.appendChild(option);
    });
}

// Function to update the pantry display
function updatePantryItems() {
    const pantryContainer = document.getElementById('pantry-items-container');
    pantryContainer.innerHTML = ''; // Clear the current pantry items displayed

    if (pantry.length === 0) {
        pantryContainer.innerHTML = '<p>Your pantry is empty!</p>';}
        else {
    // Create a div for each pantry item and append it to the container
    pantry.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('pantry-item');
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Best By: ${item.bestByDate}</p>
            <p>Quantity: ${item.quantity}</p>
        `;
        pantryContainer.appendChild(itemDiv);
    });
}
}

// Function to sort pantry items alphabetically
// Function to sort pantry items
function sortPantryItems() {
    const sortOption = document.getElementById('sort-options').value;

    if (sortOption === 'alpha-asc') {
        pantry.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically A to Z
    } else if (sortOption === 'alpha-desc') {
        pantry.sort((a, b) => b.name.localeCompare(a.name)); // Sort alphabetically Z to A
    } else if (sortOption === 'date-asc') {
        pantry.sort((a, b) => new Date(a.bestByDate) - new Date(b.bestByDate)); // Sort by best by date increasing
    } else if (sortOption === 'date-desc') {
        pantry.sort((a, b) => new Date(b.bestByDate) - new Date(a.bestByDate)); // Sort by best by date decreasing
    }

    // After sorting, update the pantry display
    updatePantryItems();
}

// Call updatePantryItems to display the current pantry when the page loads
updatePantryItems();
