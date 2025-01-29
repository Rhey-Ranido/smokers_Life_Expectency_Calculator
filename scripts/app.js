import { simulateLifeExpectancy } from "./simulation.js";
import { countries } from "./countries.js";

class LifeExpectancyCalculator {
  constructor() {
    this.initializeForm();
    this.setupEventListeners();
  }

  initializeForm() {
    const countrySelect = document.getElementById("countryName");
    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.name;
      option.textContent = country.name;
      countrySelect.appendChild(option);
    });
  }

  setupEventListeners() {
    document
      .getElementById("lifeExpectancyForm")
      .addEventListener("submit", this.handleSubmit.bind(this));
    this.setupInputAnimations();
  }

  setupInputAnimations() {
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
      });
    });
  }

  getFormData() {
    return {
      name: document.getElementById("name").value,
      dailyCigarettes: parseInt(document.getElementById("dailyCigarettes").value),
      yearsSmoking: parseInt(document.getElementById("yearsSmoking").value),
      countryName: document.getElementById("countryName").value,
      gender: document.getElementById("gender").value
    };
  }

  calculateResults(formData) {
    const result = simulateLifeExpectancy(
      formData.name,
      formData.dailyCigarettes,
      formData.yearsSmoking,
      formData.countryName,
      formData.gender
    );

    if (!result) {
      throw new Error("Failed to calculate life expectancy");
    }

    return result;
  }

  displayResults(formData, result) {
    // Get the selected country's base life expectancy
    const selectedCountry = countries.find(
      country => country.name.toLowerCase() === formData.countryName.toLowerCase()
    );

    // Update result elements
    document.getElementById("resultName").textContent = formData.name;
    document.getElementById("resultGender").textContent = formData.gender;
    document.getElementById("resultCigarettes").textContent = formData.dailyCigarettes;
    document.getElementById("resultYearsSmoking").textContent = formData.yearsSmoking;
    document.getElementById("resultCountry").textContent = formData.countryName;
    document.getElementById("countryDisplay").textContent = formData.countryName;
    document.getElementById("baseLifeExpectancy").textContent = selectedCountry.baseLifeExpectancy;
    document.getElementById("resultExpectancy").textContent = result.lifeExpectancy;
    document.getElementById("daysLost").textContent = result.daysLost;

    // Show the result
    const resultElement = document.getElementById("result");
    resultElement.style.display = "block";
    // Trigger reflow for animation
    void resultElement.offsetWidth;
    resultElement.classList.add("visible");
  }

  handleError(error) {
    console.error("Calculation error:", error);
    alert("An error occurred while calculating life expectancy. Please try again.");
  }

  handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = this.getFormData();
      const result = this.calculateResults(formData);
      this.displayResults(formData, result);
    } catch (error) {
      this.handleError(error);
    }
  }
}

// Initialize the calculator
new LifeExpectancyCalculator();
