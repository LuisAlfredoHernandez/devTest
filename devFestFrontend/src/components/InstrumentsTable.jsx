/* eslint-disable react/prop-types */
import { Table } from "flowbite-react";
import { v4 as uuidv4 } from "uuid";
import eth from "../assets/eth.svg";
import xbt from "../assets/xbt.svg";
import sol from "../assets/sol.svg";
import bank from "../assets/bank.svg";

const Main = ({ instruments }) => {
  const valueImageDesignation = (code) => {
    switch (code) {
      case code.includes("BTH") || code.includes("XBT"):
        return xbt;
      case code.includes("ETH"):
        return eth;
      case code.includes("SOLD"):
        return sol;
      default:
        return bank;
    }
  };

  console.log(instruments, "from the component");
  {
    instruments.data?.length > 0;
    return (
      <>
        <div className="h-72 overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell></Table.HeadCell>
              <Table.HeadCell>Nombre</Table.HeadCell>
              <Table.HeadCell>Precio</Table.HeadCell>
              <Table.HeadCell>% dif ults 24hrs</Table.HeadCell>
              <Table.HeadCell>Fecha</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {instruments.data?.map((item) => (
                <Table.Row
                  key={uuidv4()}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    <img src={valueImageDesignation(item.symbol)} />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.symbol}
                  </Table.Cell>
                  <Table.Cell>
                    {item.lastprice || item.markPrice || item.fairPrice}
                  </Table.Cell>
                  <Table.Cell>{item.lastChangePcnt || 0}</Table.Cell>
                  <Table.Cell>{Date(item.timestamp)}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </>
    );
  }
};

export default Main;
