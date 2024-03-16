// STICKY HEADER
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 0) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

// 



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
  // Selectors
  let amountCard = document.querySelector(".amount-card");
  let rateCard = document.querySelector(".rate-card");
  let yearCard = document.querySelector(".year-card");
  let card = document.querySelector(".calculated-value-box");
  const buttons = document.querySelectorAll(".years-buttons-box-btn");

  // Default Values
  let amount = Math.floor(amountSlider.noUiSlider.get());
  let rate = Math.floor(rateSlider.noUiSlider.get());
  let year = document.querySelector(".selectedYear").id;
  let EMI = 0;

  let amountPicker = document.querySelector(".amount-slider .noUi-touch-area");
  let amountSpan = document.createElement("span");
  amountPicker.appendChild(amountSpan);
  amountSpan.classList.add("amountSpan")


  let ratePicker = document.querySelector(".rate-slider .noUi-touch-area");
  let rateSpan = document.createElement("span");
  let rateForSpan = rateCard.querySelector("h6 span");
  ratePicker.appendChild(rateSpan);
  rateSpan.classList.add("rateSpan")


  // Calculate EMI
  const calculateEMI = (amount, rate, year) => {
    const r = rate / (12 * 100); // Monthly interest rate
    const n = year * 12; // Total number of installments

    EMI = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const calculatedEMI = parseInt(EMI).toLocaleString("en-IN", {
      currency: "INR",
    });
    card.querySelector(".emi").innerHTML = `₹ ${calculatedEMI}`;
    return EMI;
  };

  // Calculate Total Interest
  const calculateTotalInterest = (amount, rate, year) => {
    const emi = parseFloat(calculateEMI(amount, rate, year));
    const n = year * 12; // Total number of installments

    const totalInterest = emi * n - amount;
    const calculatedInterest = parseInt(totalInterest).toLocaleString("en-IN", {
      currency: "INR",
    });
    card.querySelector(".interest").innerHTML = `₹ ${calculatedInterest}`;
    return totalInterest;
  };

  // Calculate Total Amount
  const calculateTotalAmount = (amount, rate, year) => {
    const totalInterest = calculateTotalInterest(amount, rate, year);
    const numAmount = Number(amount);
    const totalAmount = numAmount + totalInterest;
    const calculatedAmount = parseInt(totalAmount).toLocaleString("en-IN", {
      currency: "INR",
    });
    card.querySelector(".total-amt").innerHTML = `₹ ${calculatedAmount}`;
  };

  // Button Handler
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => {
        btn.classList.remove("selectedYear");
      });
      button.classList.add("selectedYear");

      year = button.id;
      calculateEMI(amount, rate, year);
      calculateTotalInterest(amount, rate, year);
      calculateTotalAmount(amount, rate, year);

      yearCard.querySelector("h6 span").innerHTML = year;
      card.querySelector(".year").innerHTML = `${year} Years`;
    });
  });

  // Amount Handler
  amountSlider.noUiSlider.on("update", () => {
    amount = amountSlider.noUiSlider.get();

    calculateEMI(amount, rate, year);
    calculateTotalInterest(amount, rate, year);
    calculateTotalAmount(amount, rate, year);

    amountCard.querySelector("h6 span").innerHTML = Math.floor(
      amount
    ).toLocaleString("en-IN", { currency: "INR" });
    card.querySelector(".principal").innerHTML = parseInt(
      amount
    ).toLocaleString("en-IN", {
      currency: "INR",
    });

    let numAmount = Number(amount);
    amountSpan.innerHTML = `${((numAmount) / 100000).toFixed(2)} Lakh`

  });

  // Rate Handler
  rateSlider.noUiSlider.on("update", () => {
    rate = rateSlider.noUiSlider.get();

    rateCard.querySelector("h6 span").innerHTML = rate;
    card.querySelector(".rate").innerHTML = `${rate} %`;

    calculateEMI(amount, rate, year);
    calculateTotalInterest(amount, rate, year);
    calculateTotalAmount(amount, rate, year);
    rateSpan.innerHTML = rate;
  });

  calculateEMI(amount, rate, year);
  calculateTotalInterest(amount, rate, year);
  calculateTotalAmount(amount, rate, year);
  card.querySelector(".year").innerHTML = `${year} Years`;


};


// BUYERS  GUIDE PAGE
const propertyValue = document.querySelector("#propertyValue");
console.log(propertyValue)
propertyValue.addEventListener("change", () => {
  console.log("changing")
})

alert('TEST');