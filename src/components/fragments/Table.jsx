import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

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
    <tbody className="text-base font-normal">
      {data.map((item, index) => renderRow(item, index))}
    </tbody>
  </table>
);

export const FreezeTable = ({
  headers,
  data,
  renderRow,
  renderRowFreeze,
  freezeCol = 4,
  customHeaderLeft,
  customHeaderRight,
  withHeaderColumnBorders = false,
}) => {
  const frozenHeaders = headers.slice(0, freezeCol);
  const unfrozenHeaders = headers.slice(freezeCol);

  const leftTableRef = useRef(null);
  const rightTableRef = useRef(null);

  const location = useLocation();
  const isRecapPtaPage = location.pathname === "/media-recap";

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
          <table
            className={`border-separate border-spacing-0 table-auto text-center w-full border-r-1 border-gray-200`}
          >
            <thead className="bg-[#E7EDF4] text-[#0D4690] border-r-1 border-gray-200 h-24">
              {customHeaderLeft ? (
                customHeaderLeft
              ) : (
                <tr>
                  {frozenHeaders.map((header, index) => (
                    <th
                      key={index}
                      className={`p-3 text-base font-semibold 
    ${index === 0 ? "rounded-tl-xl" : ""} 
    ${withHeaderColumnBorders || isRecapPtaPage ? "border border-gray-400" : ""}
  `}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              )}
            </thead>
            <tbody className="bg-white text-base font-normal border-gray-200">
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
            <table className="border-separate border-spacing-0 table-auto text-center w-full">
              <thead className="bg-[#E7EDF4] text-[#0D4690] h-24">
                {customHeaderRight ? (
                  customHeaderRight
                ) : (
                  <tr>
                    {unfrozenHeaders.map((header, index) => (
                      <th
                        key={index}
                        className={`p-3 text-base font-semibold ${
                          index === unfrozenHeaders.length - 1
                            ? "rounded-tr-xl"
                            : ""
                        }${
                          withHeaderColumnBorders
                            ? "border-r border-gray-400"
                            : ""
                        }`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                )}
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
