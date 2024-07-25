/* eslint-disable react/prop-types */
import { Table } from "flowbite-react";
import { v4 as uuidv4 } from "uuid";

import { valueImageDesignation, formatCurrency } from "../ultilities";

const Main = ({ instruments }) => {
  {
    instruments.data?.length > 0;
    return (
      <>
        <div className="mt-10 h-72 overflow-x-auto">
          <div className="pb-4  dark:bg-gray-900">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
              />
            </div>
          </div>

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
                    {formatCurrency(item.lastPrice) ||
                      formatCurrency(item.markPrice) ||
                      formatCurrency(item.fairPrice)}
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
