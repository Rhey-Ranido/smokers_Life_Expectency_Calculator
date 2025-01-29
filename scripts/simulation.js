// Data imports
import { countries } from "./countries.js";

// Constants for minutes lost per cigarette by gender
const MINUTES_LOST_PER_CIGARETTE = {
  male: 19,
  female: 22,
};

// Function to calculate reduced life expectancy
function calculateLifeExpectancy(
  dailyCigarettes,
  yearsSmoking,
  lifeExpectancy,
  gender
) {
  // Validate gender
  if (!gender || typeof gender !== "string") {
    throw new Error(
      "Invalid or missing gender. Please specify 'male' or 'female'."
    );
  }

  const genderKey = gender.toLowerCase();
  if (!MINUTES_LOST_PER_CIGARETTE[genderKey]) {
    throw new Error("Invalid gender. Please specify 'male' or 'female'.");
  }

  // Get the minutes lost per cigarette based on gender
  const minutesLostPerCigarette = MINUTES_LOST_PER_CIGARETTE[genderKey];
  const totalCigarettes = dailyCigarettes * yearsSmoking * 365;
  const minutesInDay = 24 * 60;

  // Total minutes lost due to smoking
  const totalMinutesLost = totalCigarettes * minutesLostPerCigarette;

  // Convert minutes lost to days lost (by dividing by minutes in a day)
  const daysLost = totalMinutesLost / minutesInDay;

  // Calculate adjusted life expectancy
  const adjustedLifeExpectancy = lifeExpectancy - daysLost / 365; // convert lost days back to years for life expectancy calculation

  return {
    yearsSmoking,
    dailyCigarettes,
    gender: genderKey,
    daysLost: daysLost.toFixed(0), // Return lost days as an integer
    lifeExpectancy: adjustedLifeExpectancy.toFixed(2),
  };
}

// Example usage
export function simulateLifeExpectancy(
  name,
  dailyCigarettes,
  yearsSmoking,
  countryName,
  gender
) {
  const livinCountry = countries.find(
    (country) => country.name.toLowerCase() === countryName.toLowerCase()
  );

  if (!livinCountry) {
    console.log(`Country '${countryName}' not found in the list.`);
    return;
  }

  try {
    const result = calculateLifeExpectancy(
      dailyCigarettes,
      yearsSmoking,
      livinCountry.baseLifeExpectancy,
      gender
    );

    return {
      daysLost: result.daysLost,
      lifeExpectancy: result.lifeExpectancy,
    };
  } catch (error) {
    console.log(error.message);
  }
}
