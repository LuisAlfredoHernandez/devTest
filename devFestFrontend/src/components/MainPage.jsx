/* eslint-disable react/prop-types */
import { Table } from "flowbite-react";
import { v4 as uuidv4 } from "uuid";

const Main = ({ instruments }) => {
  console.log(instruments, "from the component");
  {
    instruments.data?.length > 0;
    return (
      <>
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
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
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.symbol}
                  </Table.Cell>
                  <Table.Cell>
                    {item.lastprice || item.markPrice || item.fairPrice || 0}
                  </Table.Cell>
                  <Table.Cell>{item.lastChangePcnt || 0}</Table.Cell>
                  <Table.Cell>{item.timestamp}</Table.Cell>
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
