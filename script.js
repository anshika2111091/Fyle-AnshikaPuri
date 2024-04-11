document.getElementById('taxForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get input values
    var grossInput = document.getElementById('gross');
    var extraIncomeInput = document.getElementById('extra_income');
    var ageGroupInput = document.getElementById('agegroup');
    var totalDeductionsInput = document.getElementById('total_deduct');

    var gross = parseFloat(grossInput.value);
    var extraIncome = parseFloat(extraIncomeInput.value);
    var ageGroup = parseFloat(ageGroupInput.value);
    var totalDeductions = parseFloat(totalDeductionsInput.value);

    // Validate input values (no negative values allowed)
    if (gross < 0 || extraIncome < 0 || ageGroup < 0 || totalDeductions < 0) {
        alert("Please enter valid positive numbers.");
        return;
    }

    // Calculate tax after deductions
    var taxableIncome = gross + extraIncome - totalDeductions;
    var tax = calculateTax(taxableIncome, ageGroup);

    // Display the result in the popover
    var popover = document.getElementById('taxResultPopover');
    var taxResult = document.getElementById('taxResult');
    var closeButton = document.getElementById('closePopover');
    closeButton.addEventListener('click', function() {
        popover.style.display = "none";
    });

    taxResult.innerHTML = "Your Overall Income will be " + tax.toFixed(2) + " Lakhs after the deductions";
    popover.style.display = "block";

    // Reset form fields
    grossInput.value = "";
    extraIncomeInput.value = "";
    ageGroupInput.value = "";
    totalDeductionsInput.value = "";
});

function calculateTax(income, age) {
    if (income <= 800000) {
        return 0; // No tax if income is under or equal to 8 Lakhs
    } else {
        var taxableAmount = income - 800000; // Calculate taxable amount
        var taxRate;

        // Determine tax rate based on age group
        if (age < 40) {
            taxRate = 0.3; // 30% tax rate for age < 40
        } else if (age >= 40 && age < 60) {
            taxRate = 0.4; // 40% tax rate for age ≥ 40 but < 60
        } else {
            taxRate = 0.1; // 10% tax rate for age ≥ 60
        }

        // Calculate tax
        var tax = taxableAmount * taxRate;

        return tax;
    }
}
