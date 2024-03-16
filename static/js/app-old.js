window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 0) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

// Calculate EMI
let amountSlider = document.querySelector(".amount-slider");
let rateSlider = document.querySelector(".rate-slider");
noUiSlider.create(amountSlider, {
  range: {
    min: [1000000],
    max: [10000000],
  },

  // step: 1000000,
  start: [4000000],
  pips: {
    mode: "positions",
    // values: [0, 25, 50, 75, 100],
    values: [0, 100],
    //   density: 5,
    stepped: true,
  },
});
noUiSlider.create(rateSlider, {
  range: {
    min: [5],
    max: [20],
  },
  // step: 0.2,
  start: [8.5],
  pips: {
    mode: "values",
    values: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    //   density: 4,
  },
});

const calculateEMI = () => {
  let amountCard = document.querySelector(".amount-card");
  let rateCard = document.querySelector(".rate-card");
  let yearCard = document.querySelector(".year-card");
  let card = document.querySelector(".calculated-value-box");
  const buttons = document.querySelectorAll(".years-buttons-box-btn");

  let amount = amountCard.innerHTML;
  let rate = 0;
  let selectedYear = 0;
  let EMI = 0;

  function calculateEMI(principal, rate, tenure) {
    const r = rate / (12 * 100); // Monthly interest rate
    const n = tenure * 12; // Total number of installments

    EMI = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return EMI.toFixed(2); // Limit decimal places to 2
  }

  // Get all buttons

  function calculateTotalInterest(principal, rate, tenure) {
    const emi = parseFloat(calculateEMI(principal, rate, tenure));
    const n = tenure * 12; // Total number of installments

    const totalInterest = emi * n - principal;
    card.querySelector(".interest").innerHTML = totalInterest.toFixed(2);

    // return totalInterest.toFixed(2); // Limit decimal places to 2
  }

  function calculateTotalAmount(principal, rate, tenure) {
    const emi = parseFloat(calculateEMI(principal, rate, tenure));
    const n = tenure * 12; // Total number of installments

    const totalInterest = emi * n - principal;
    const totalAmount = principal + totalInterest;
    console.log(totalAmount);
    card.querySelector(".total-amt").innerHTML = `₹ ${totalAmount}`;
  }

  // Add click event listeners to each button
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove "selectedYear" class from all buttons
      buttons.forEach((btn) => {
        btn.classList.remove("selectedYear");
      });

      // Add "selectedYear" class to the clicked button
      button.classList.add("selectedYear");
      selectedYear = button.id;
      EMI = calculateEMI(amount, rate, selectedYear);
      yearCard.querySelector("h6 span").innerHTML = selectedYear;
      card.querySelector(".year").innerHTML = `${selectedYear} Years`;
      card.querySelector(".emi").innerHTML = `₹ ${EMI}`;
      calculateTotalInterest(amount, rate, selectedYear);
      calculateTotalAmount(amount, rate, selectedYear);
    });
  });

  amountSlider.noUiSlider.on("update", () => {
    amount = amountSlider.noUiSlider.get();
    EMI = calculateEMI(amount, rate, selectedYear);
    amountCard.querySelector("h6 span").innerHTML = Math.floor(
      amount
    ).toLocaleString("en-IN", { currency: "INR" });
    card.querySelector(".emi").innerHTML = `₹ ${EMI}`;
    card.querySelector(".principal").innerHTML = amount;
    calculateTotalInterest(amount, rate, selectedYear);
    calculateTotalAmount(amount, rate, selectedYear);
  });
  rateSlider.noUiSlider.on("update", () => {
    rate = rateSlider.noUiSlider.get();
    EMI = calculateEMI(amount, rate, selectedYear);
    card.querySelector(".emi").innerHTML = `₹ ${EMI}`;
    rateCard.querySelector("h6 span").innerHTML = rate;
    calculateTotalInterest(amount, rate, selectedYear);
    calculateTotalAmount(amount, rate, selectedYear);
  });
};
