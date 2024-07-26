import axios from "axios";

const getInstrumentsBySymbol = async (symbol) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/instruments/${symbol}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

const getOrderBookBySymbol = async (symbol) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/orderbook/${symbol}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

const saveInstrumentsToDB = async (instruments) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/instruments`,
      instruments
    );
    return response;
  } catch (error) {
    return error;
  }
};

const saveOrderBooksToDB = async (instruments) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/orderbook`,
      instruments
    );
    return response;
  } catch (error) {
    return error;
  }
};

export {
  getInstrumentsBySymbol,
  getOrderBookBySymbol,
  saveInstrumentsToDB,
  saveOrderBooksToDB,
};
