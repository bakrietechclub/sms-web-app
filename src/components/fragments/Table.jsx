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

export const FreezeTable = ({
  headers,
  data,
  renderRow,
  renderRowFreeze,
  freezeCol,
}) => {
  freezeCol = freezeCol || 1;
  const frozenHeaders = headers.slice(0, freezeCol);
  const unfrozenHeaders = headers.slice(freezeCol);
  return (
    <div className="relative">
      <div className="flex">
        <table className="table-auto text-center w-[60%] shadow-2xl z-10">
          <thead className="text-[#0D4690] bg-[#E7EDF4]">
            <tr className="h-10">
              {frozenHeaders.map((header, index) => (
                <th
                  key={index}
                  className={`text-lg font-medium ${
                    index === 0 ? "rounded-tl-xl" : ""
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((item, index) => renderRowFreeze(item, index))}
          </tbody>
        </table>
        <table className="absolute table-auto text-center w-full left-[60%] z-0">
          <thead className="text-[#0D4690] bg-[#E7EDF4]">
            <tr className="h-10">
              {unfrozenHeaders.map((header, index) => (
                <th
                  key={index}
                  className={`text-lg font-medium ${
                    index === unfrozenHeaders.length - 1 ? "rounded-tr-xl" : ""
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((item, index) => renderRow(item, index))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
