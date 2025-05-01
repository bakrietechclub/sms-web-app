export const Table = ({ headers, data, renderRow }) => (
  <table className="table-auto text-center w-full">
    <thead className="text-[#0D4690] bg-[#E7EDF4]">
      <tr className="h-10">
        {headers.map((header, index) => (
          <th
            key={index}
            className={`text-lg font-medium ${
              index === 0 ? "rounded-tl-xl" : ""
            } ${index === headers.length - 1 ? "rounded-tr-xl" : ""}`}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>{data.map((item, index) => renderRow(item, index))}</tbody>
  </table>
);

export const FreezeTable = ({ headers, data, renderRow }) => (
  <table className="table-auto text-center w-screen">
    <thead className="text-[#0D4690] bg-[#E7EDF4]">
      <tr className="h-10">
        {headers.map((header, index) => (
          <th
            key={index}
            className={`text-lg font-medium ${
              index === 0 ? "rounded-tl-xl" : ""
            } ${index === headers.length - 1 ? "rounded-tr-xl" : ""}`}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>{data.map((item, index) => renderRow(item, index))}</tbody>
  </table>
);
