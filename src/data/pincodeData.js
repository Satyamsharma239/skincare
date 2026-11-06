// Indian Postal Index Number (PIN) validation and logistics estimation engine
export const PINCODE_DATABASE = {
  // Bengaluru
  "560": {
    city: "Bengaluru",
    state: "Karnataka",
    courier: "Delhivery Air Express",
    estimatedDays: "1 - 2 Business Days",
    codAvailable: true,
    zone: "Metro South"
  },
  // Mumbai
  "400": {
    city: "Mumbai",
    state: "Maharashtra",
    courier: "BlueDart Surface Express",
    estimatedDays: "2 - 3 Business Days",
    codAvailable: true,
    zone: "Metro West"
  },
  // Delhi NCR
  "110": {
    city: "New Delhi",
    state: "Delhi",
    courier: "BlueDart Air Express",
    estimatedDays: "2 Business Days",
    codAvailable: true,
    zone: "Metro North"
  },
  // Gurgaon / Gurugram
  "122": {
    city: "Gurugram",
    state: "Haryana",
    courier: "BlueDart Air Express",
    estimatedDays: "2 Business Days",
    codAvailable: true,
    zone: "Metro North"
  },
  // Noida
  "201": {
    city: "Noida",
    state: "Uttar Pradesh",
    courier: "Delhivery Express",
    estimatedDays: "2 - 3 Business Days",
    codAvailable: true,
    zone: "Metro North"
  },
  // Hyderabad
  "500": {
    city: "Hyderabad",
    state: "Telangana",
    courier: "Delhivery Express",
    estimatedDays: "2 - 3 Business Days",
    codAvailable: true,
    zone: "Metro South"
  },
  // Pune
  "411": {
    city: "Pune",
    state: "Maharashtra",
    courier: "BlueDart Express",
    estimatedDays: "2 - 3 Business Days",
    codAvailable: true,
    zone: "Metro West"
  },
  // Chennai
  "600": {
    city: "Chennai",
    state: "Tamil Nadu",
    courier: "Delhivery Express",
    estimatedDays: "2 - 3 Business Days",
    codAvailable: true,
    zone: "Metro South"
  },
  // Kolkata
  "700": {
    city: "Kolkata",
    state: "West Bengal",
    courier: "BlueDart Air Express",
    estimatedDays: "3 - 4 Business Days",
    codAvailable: true,
    zone: "Metro East"
  },
  // Ahmedabad
  "380": {
    city: "Ahmedabad",
    state: "Gujarat",
    courier: "Delhivery Express",
    estimatedDays: "2 - 3 Business Days",
    codAvailable: true,
    zone: "West"
  },
  // Jaipur
  "302": {
    city: "Jaipur",
    state: "Rajasthan",
    courier: "Delhivery Express",
    estimatedDays: "3 Business Days",
    codAvailable: true,
    zone: "North"
  }
};

export const lookupPincode = (pincode) => {
  const clean = pincode.replace(/[^0-9]/g, "");
  if (clean.length < 3) return null;

  const prefix = clean.substring(0, 3);
  const found = PINCODE_DATABASE[prefix];

  if (found) {
    return {
      isValid: true,
      pincode: clean,
      ...found
    };
  }

  // Fallback for valid 6-digit Indian PIN codes outside primary hubs
  if (clean.length === 6) {
    return {
      isValid: true,
      pincode: clean,
      city: "Domestic Serviceable Hub",
      state: "India",
      courier: "IndiaPost SpeedPost / Delhivery Surface",
      estimatedDays: "4 - 6 Business Days",
      codAvailable: true,
      zone: "Standard Domestic"
    };
  }

  return null;
};
