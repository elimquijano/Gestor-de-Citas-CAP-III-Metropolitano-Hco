import React from "react";

const StatusBox: React.FC<{ status: string }> = ({ status }) => {
  let color = "";
  if(status.toLowerCase()=="activo"||status.toLowerCase()=="disponible"){
    color = "bg-green-500";
  }else if (status.toLowerCase()=="inactivo"||status.toLowerCase()=="ocupado") {
    color = "bg-red-500";
  }else{
    color = "bg-gray-500";
  }

  return (
    <div
      className={`inline-block rounded-lg ${color} text-center text-white px-2`}
    >
      {status}
    </div>
  );
};

const TableCard: React.FC<{
  data: any[];
  columnNames: string[];
  tableStyle: string;
}> = ({ data, columnNames, tableStyle }) => {
  return (
    <table className="w-full border-collapse border rounded-lg">
      <thead>
        <tr>
          {columnNames.map((name, index) => (
            <th
              key={index}
              className={`uppercase text-start p-2 ${tableStyle}`}
            >
              {name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {Object.values(item).map((value, i) => (
              <td key={i} className="p-2 border whitespace-nowrap">
                {i == columnNames.length - 1 ? (
                  <StatusBox status={String(value)} />
                ) : (
                  String(value)
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
const CardTable: React.FC<{
  title: string;
  colSpan?: string;
  data: any[];
  columnNames: string[];
  tableStyle: string;
}> = ({ title, colSpan=2, data, columnNames, tableStyle }) => {
  return (
    <div
      className={`border-2 shadow-lg overflow-hidden col-span-1 md:col-span-${colSpan} p-4 rounded-lg`}
    >
      <h4 className="uppercase font-semibold py-2">{title}</h4>
      <div className="p-4 overflow-x-auto verflow-y-auto h-96">
        {
          <TableCard
            data={data}
            columnNames={columnNames}
            tableStyle={tableStyle}
          ></TableCard>
        }
      </div>
    </div>
  );
};

export default CardTable;
