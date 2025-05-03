import { useEffect, useRef } from "react";

export const Table = ({ headers, data, renderRow }) => (
  <table className="table-auto text-center w-full">
    <thead className="text-[#0D4690] bg-[#E7EDF4]">
      <tr className="h-10">
        {headers.map((header, index) => (
          <th
            key={index}
            className={`text-base font-semibold ${
              index === 0 ? "rounded-tl-xl" : ""
            } ${index === headers.length - 1 ? "rounded-tr-xl" : ""}`}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="text-base font-normal">{data.map((item, index) => renderRow(item, index))}</tbody>
  </table>
);

export const FreezeTable = ({
  headers,
  data,
  renderRow,
  renderRowFreeze,
  freezeCol = 4,
}) => {
  const frozenHeaders = headers.slice(0, freezeCol);
  const unfrozenHeaders = headers.slice(freezeCol);

  const leftTableRef = useRef(null);
  const rightTableRef = useRef(null);

  useEffect(() => {
    const leftRows = leftTableRef.current?.querySelectorAll("tbody tr") || [];
    const rightRows = rightTableRef.current?.querySelectorAll("tbody tr") || [];

    for (let i = 0; i < data.length; i++) {
      const leftHeight = leftRows[i]?.offsetHeight || 0;
      const rightHeight = rightRows[i]?.offsetHeight || 0;
      const maxHeight = Math.max(leftHeight, rightHeight);

      if (leftRows[i]) leftRows[i].style.height = `${maxHeight}px`;
      if (rightRows[i]) rightRows[i].style.height = `${maxHeight}px`;
    }
  }, [data]);

  return (
    <div className="w-full overflow-hidden">
      <div className="flex w-full">
        {/* Fixed Column */}
        <div className="w-[60%] overflow-hidden mr-[1px]" ref={leftTableRef}>
          <table className="table-auto text-center w-full">
            <thead className="bg-[#E7EDF4] text-[#0D4690] border-r-1 border-gray-200">
              <tr>
                {frozenHeaders.map((header, index) => (
                  <th
                    key={index}
                    className={`p-3 text-base font-semibold ${
                      index === 0 ? "rounded-tl-xl" : ""
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white text-base font-normal border-r-2 border-gray-200">
              {data.map((item, index) => renderRowFreeze(item, index))}
            </tbody>
          </table>
        </div>

        {/* Scrollable Column */}
        <div
          className="w-[40%] overflow-x-auto custom-scrollbar scroll-area scrollbar-thin"
          ref={rightTableRef}
        >
          <div className="min-w-max">
            <table className="table-auto text-center w-full">
              <thead className="bg-[#E7EDF4] text-[#0D4690]">
                <tr>
                  {unfrozenHeaders.map((header, index) => (
                    <th
                      key={index}
                      className={`p-3 text-base font-semibold ${
                        index === unfrozenHeaders.length - 1
                          ? "rounded-tr-xl"
                          : ""
                      }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white text-base font-normal">
                {data.map((item, index) => renderRow(item, index))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};