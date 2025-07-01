import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const ClusterSubClusterField = ({
  register,
  setValue,
  clusterOptions = [],
  subClusterOptions = [],
}) => {
  const [clusterOpen, setClusterOpen] = useState(false);
  const [showSubClusterDropdown, setShowSubClusterDropdown] = useState(false);

  const [selectedCluster, setSelectedCluster] = useState("");
  const [selectedSubCluster, setSelectedSubCluster] = useState([]);
  const [tempSelectedSubCluster, setTempSelectedSubCluster] = useState([]);

  const handleSubClusterChange = (value) => {
    setTempSelectedSubCluster((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const confirmSubCluster = () => {
    setSelectedSubCluster(tempSelectedSubCluster);
    setValue("subCluster", tempSelectedSubCluster);
    setShowSubClusterDropdown(false);
  };

  return (
    <div className="flex gap-4">
      {/* Cluster */}
      <div className="w-1/2 flex flex-col">
        <label className="block mb-1 font-medium">Cluster</label>
        <div className="relative">
          <input
            {...register("cluster")}
            placeholder="Pilih cluster"
            readOnly
            value={selectedCluster}
            onClick={() => setClusterOpen((prev) => !prev)}
            className="w-full border border-gray-300 px-3 py-2 rounded pr-8 cursor-pointer"
          />
          <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none">
            {clusterOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
        </div>
        {clusterOpen && (
          <div className="mt-2 border border-gray-300 rounded bg-white shadow max-h-60 overflow-y-auto">
            {clusterOptions.map((prov) => (
              <div
                key={prov}
                onClick={() => {
                  setValue("cluster", prov);
                  setSelectedCluster(prov);
                  setClusterOpen(false);
                  setShowSubClusterDropdown(false);
                  setSelectedSubCluster([]);
                  setTempSelectedSubCluster([]);
                }}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {prov}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sub-Cluster */}
      <div className="w-1/2 flex flex-col">
        <label className="block mb-1 font-medium">Sub-Cluster</label>
        <div className="relative">
          <input
            readOnly
            disabled={!selectedCluster}
            {...register("subCluster")}
            placeholder="Pilih sub-cluster"
            value={selectedSubCluster.join(", ")}
            onClick={() => {
              if (selectedCluster) setShowSubClusterDropdown((prev) => !prev);
            }}
            className={`w-full border border-gray-300 px-3 py-2 rounded pr-8 ${
              !selectedCluster
                ? "bg-gray-200 text-gray-500 cursor-not-allowed pointer-events-none"
                : "cursor-pointer"
            }`}
          />
          <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none">
            {showSubClusterDropdown ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
        </div>
        {showSubClusterDropdown && (
          <div className="mt-2 border border-gray-300 rounded bg-white shadow w-full">
            <div className="flex justify-end pr-3 py-1">
              <button
                type="button"
                onClick={confirmSubCluster}
                className="text-blue-900 text-sm"
              >
                Konfirmasi
              </button>
            </div>
            {subClusterOptions.map((option) => (
              <label
                key={option}
                className="block px-3 py-1 hover:bg-gray-100 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={tempSelectedSubCluster.includes(option)}
                  onChange={() => handleSubClusterChange(option)}
                  className="mr-2"
                />
                <span>
                  {option === "Lainnya:" ? (
                    <>
                      {option}{" "}
                      <span className="text-gray-500 underline">
                        tambahkan data lainnya
                      </span>
                    </>
                  ) : (
                    option
                  )}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClusterSubClusterField;
