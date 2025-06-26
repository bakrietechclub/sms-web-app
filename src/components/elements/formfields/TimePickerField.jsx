import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { motion, useMotionValue, animate } from "framer-motion";

const TimePickerField = ({ name = "waktu", label = "Waktu" }) => {
  const { register, setValue, watch } = useFormContext();
  const value = watch(name);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState("hour");
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState("00");
  const [amPm, setAmPm] = useState("AM");

  const radius = 100;
  const center = 120;
  const hours = [...Array(12)].map((_, i) => i + 1);
  const minutes = [...Array(12)].map((_, i) => String(i * 5).padStart(2, "0"));
  const numbers = step === "hour" ? hours : minutes;

  // Mengubah koordinat polar supaya 12 berada di atas
  const polarToCartesian = (r, angle) => {
    // Geser sudut dengan -90 derajat supaya 0 derajat berada di atas (12 o'clock)
    const a = ((angle - 90) * Math.PI) / 180;
    return {
      x: center + r * Math.cos(a),
      y: center + r * Math.sin(a),
    };
  };

  // Hitung sudut pointer untuk jam dan menit
  const pointerAngle =
    step === "hour"
      ? ((hour - 1) % 12) * 30 // Perhitungkan posisi jam, pastikan 12 ada di atas
      : !isNaN(parseInt(minute)) ? parseInt(minute) * 6 : null;

  const targetCoord =
    pointerAngle !== null ? polarToCartesian(radius - 30, pointerAngle) : null;

  // Motion values untuk animasi halus
  const x2 = useMotionValue(center);
  const y2 = useMotionValue(center);

  // Animasi ke posisi target
  useEffect(() => {
    if (targetCoord) {
      animate(x2, targetCoord.x, { type: "spring", stiffness: 300, damping: 20 });
      animate(y2, targetCoord.y, { type: "spring", stiffness: 300, damping: 20 });
    }
  }, [pointerAngle]);

  const handleHover = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - center;
    const y = e.clientY - rect.top - center;
    const angle = (Math.atan2(y, x) * 180) / Math.PI + 90; // Mulai dari posisi 12 o'clock (0 derajat)
    const normalized = (angle + 360) % 360;

    if (step === "hour") {
      const h = Math.round(normalized / 30) || 12;
      setHour(h);
    } else {
      const approx = Math.round(normalized / 30) * 5;
      setMinute(approx === 60 ? "00" : String(approx).padStart(2, "0"));
    }
  };

  const handleClick = () => {
    if (step === "hour") {
      setStep("minute");
    } else {
      const formatted = `${String(hour).padStart(2, "0")}:${minute} ${amPm}`;
      setValue(name, formatted);
      setIsOpen(false);
      setStep("hour");
    }
  };

  return (
    <div className="relative w-120">
      <label className="block mb-1 font-medium">{label}</label>
      <input
        {...register(name)}
        readOnly
        value={value || ""}
        placeholder="HH:MM AM/PM"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border border-gray-300 px-3 py-2 rounded cursor-pointer"
      />

      {isOpen && (
        <div className="mt-2 p-4 relative z-30 flex flex-col items-center gap-3">
          {/* AM/PM buttons */}
          <div className="flex gap-2 mb-2">
            {["AM", "PM"].map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setAmPm(period)}
                className={`px-3 py-1 rounded text-sm ${
                  amPm === period
                    ? "text-black"  // Untuk yang terpilih
                    : "text-gray-400"  // Untuk yang tidak terpilih
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Tampilkan jam dan menit */}
          <div className="flex items-center justify-center gap-2 text-5xl font-normal mb-4">
            <span className="text-black">{String(hour).padStart(2, "0")}</span>
            <span className="text-gray-400">:</span>
            <span className="text-gray-400">{minute}</span>
          </div>

          {/* Jam dalam bentuk SVG */}
          <svg
            width="240"
            height="240"
            viewBox="0 0 240 240"
            onMouseMove={handleHover}
            onClick={handleClick}
            className="cursor-pointer rounded-full bg-blue-50"
          >
            {numbers.map((num, i) => {
              const angle = i * 30; // 30 derajat per jam
              const pos = polarToCartesian(radius, angle);
              return (
                <text
                  key={num}
                  x={pos.x}
                  y={pos.y + 5} // Posisikan angka sesuai dengan radius
                  textAnchor="middle"
                  fontSize="14"
                  className="select-none pointer-events-none fill-gray-700"
                >
                  {num}
                </text>
              );
            })}
            <circle cx={center} cy={center} r="5" fill="#0d4690" />
            {targetCoord && (
              <motion.line
                x1={center}
                y1={center}
                style={{ x2, y2 }}
                stroke="#0d4690"
                strokeWidth="3"
                strokeLinecap="round"
              />
            )}
          </svg>
        </div>
      )}
    </div>
  );
};

export default TimePickerField;
