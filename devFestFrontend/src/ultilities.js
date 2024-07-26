import eth from "./assets/eth.svg";
import xbt from "./assets/xbt.svg";
import sol from "./assets/sol.svg";
import bank from "./assets/bank.svg";

const valueImageDesignation = (code) => {
  if (code.includes("BTH") || code.includes("XBT")) return xbt;
  else if (code.includes("ETH")) return eth;
  else if (code.includes("SOLD")) return sol;
  else return bank;
};

const formatCurrency = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
};

export { valueImageDesignation, formatCurrency };
