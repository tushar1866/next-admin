import { CountryCode } from "libphonenumber-js/mobile";
const countries: Array<{ name: string; code: CountryCode; dialCode: string }> =
  [
    { name: "United States", code: "US", dialCode: "1" },
    { name: "India", code: "IN", dialCode: "91" },
    { name: "United Kingdom", code: "GB", dialCode: "44" },
    { name: "Australia", code: "AU", dialCode: "61" },
    { name: "Canada", code: "CA", dialCode: "1" },
    // Add more as needed
  ];
export default countries;
