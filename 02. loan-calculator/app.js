(function() {
    // Global Vars
    const loader = document.getElementById('loading');
    const results = document.getElementById('results');


    // Listen to submit
    document.getElementById('loan-form').addEventListener('submit', function(e) {

        // Hide Results
        results.style.display = 'none';

        // Show loader
        loader.style.display = 'block';

        setTimeout(calculateResults, 2000);

        e.preventDefault();
    });

    // Calculate Results
    function calculateResults() {
        // UI vars
        const amount = document.getElementById('amount');
        const interest = document.getElementById('interest');
        const years = document.getElementById('years');
        const monthlyPayment = document.getElementById('monthly-payment');
        const totalPayment = document.getElementById('total-payment');
        const totalInterest = document.getElementById('total-interest');

        const principal = parseFloat(amount.value);
        const calculatedInterest = parseFloat(interest.value) / 100 / 12;
        const calculatedPayments = parseFloat(years.value) * 12;

        // Calculate monthly payment
        const x = Math.pow(1 + calculatedInterest, calculatedPayments);
        const monthly = (principal * x * calculatedInterest) / (x - 1);

        if(isFinite(monthly)) {
            monthlyPayment.value = monthly.toFixed(2);
            totalPayment.value = (monthly * calculatedPayments).toFixed(2);
            totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);


            // Show Results
            results.style.display = 'block';
        } else {
            showError('Please check your numbers');
        }

        // Hide Loader
        loader.style.display = 'none';
    }

    // Show Error
    function showError(error) {
        // Create a div
        const errDiv = document.createElement('div');

        // Get elements
        const card = document.querySelector('.card');
        const heading = document.querySelector('.heading');

        // Add class
        errDiv.className = 'alert alert-danger';

        // Create text note and append to div
        errDiv.appendChild(document.createTextNode(error));

        // Insetr error above heading
        card.insertBefore(errDiv, heading);

        // Clear error after 3 seconds
        setTimeout(clearError, 3000);
    }

    // Clear Error
    function clearError() {
        document.querySelector('.alert').remove();
    }
})();