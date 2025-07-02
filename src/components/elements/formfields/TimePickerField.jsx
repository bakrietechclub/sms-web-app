import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { motion, useMotionValue, animate } from "framer-motion";
import clock from "../../../assets/icons/clock.png";

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

  const polarToCartesian = (r, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
    return {
      x: center + r * Math.cos(angleInRadians),
      y: center + r * Math.sin(angleInRadians),
    };
  };

  const pointerAngle =
    step === "hour"
      ? (hour % 12 === 0 ? 360 : hour * 30)
      : parseInt(minute) * 6;

  const targetCoord = polarToCartesian(radius, pointerAngle);
  const lineEndCoord = polarToCartesian(radius - 20, pointerAngle);

  const x2 = useMotionValue(center);
  const y2 = useMotionValue(center);
  const circleX = useMotionValue(center);
  const circleY = useMotionValue(center);

  useEffect(() => {
    if (targetCoord && lineEndCoord) {
      animate(x2, lineEndCoord.x, { type: "spring", stiffness: 300, damping: 25 });
      animate(y2, lineEndCoord.y, { type: "spring", stiffness: 300, damping: 25 });
      animate(circleX, targetCoord.x, { type: "spring", stiffness: 300, damping: 25 });
      animate(circleY, targetCoord.y, { type: "spring", stiffness: 300, damping: 25 });
    }
  }, [pointerAngle, targetCoord, lineEndCoord]);

  const handleHover = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - center;
    const y = e.clientY - rect.top - center;
    let angle = (Math.atan2(y, x) * 180) / Math.PI + 90;
    angle = (angle + 360) % 360;

    if (step === "hour") {
      let h = Math.round(angle / 30);
      if (h === 0) h = 12;
      setHour(h);
    } else {
      const m = Math.round(angle / 6);
      const approx = (Math.round(m / 5) * 5) % 60;
      setMinute(String(approx).padStart(2, "0"));
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
    <div className="relative w-132">
      <label className="block mb-1 font-medium">{label}</label>
      <div className="relative">
        <input
          {...register(name)}
          readOnly
          value={value || ""}
          placeholder="HH:MM AM/PM"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full border border-gray-300 px-3 py-2 rounded cursor-pointer pr-10"
        />
        <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none">
          <img src={clock} alt="clock icon" className="w-5 h-5 opacity-60" />
        </div>
      </div>

      {isOpen && (
        <div className="mt-2 p-4 relative z-30 flex flex-col items-center gap-3">
          <div className="flex gap-2 mb-2">
            {["AM", "PM"].map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setAmPm(period)}
                className={`px-3 py-1 rounded text-sm ${
                  amPm === period ? "text-black" : "text-gray-400"
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-5xl font-normal mb-4">
            <span
              className={step === "hour" ? "text-black cursor-pointer" : "text-gray-400 cursor-pointer"}
              onClick={() => setStep("hour")}
            >
              {String(hour).padStart(2, "0")}
            </span>
            <span className="text-gray-400">:</span>
            <span
              className={step === "minute" ? "text-black cursor-pointer" : "text-gray-400 cursor-pointer"}
              onClick={() => setStep("minute")}
            >
              {minute}
            </span>
          </div>

          <svg
            width="240"
            height="240"
            viewBox="0 0 240 240"
            onMouseMove={handleHover}
            onClick={handleClick}
            className="cursor-pointer rounded-full bg-blue-50"
          >
            <circle cx={center} cy={center} r="5" fill="#0d4690" />
            <motion.line
              x1={center}
              y1={center}
              style={{ x2, y2 }}
              stroke="#0d4690"
              strokeWidth="2"
            />
            {numbers.map((num) => {
              const isSelected = step === "hour" ? parseInt(num) === hour : parseInt(num) === parseInt(minute);
              if (isSelected) return null;

              let angleValue;
              if (step === "hour") {
                angleValue = (parseInt(num) % 12 === 0 ? 0 : parseInt(num)) * 30;
              } else {
                angleValue = parseInt(num) * 6;
              }
              const pos = polarToCartesian(radius, angleValue);

              return (
                <text
                  key={num}
                  x={pos.x}
                  y={pos.y + 5}
                  textAnchor="middle"
                  fontSize="14"
                  className="select-none pointer-events-none fill-gray-700"
                >
                  {num}
                </text>
              );
            })}
            <motion.circle
              style={{ cx: circleX, cy: circleY }}
              r="18"
              fill="#0d4690"
              className="pointer-events-none"
            />
            <motion.text
              style={{ x: circleX, y: circleY }}
              dy="5"
              textAnchor="middle"
              fill="white"
              fontSize="14"
              className="select-none pointer-events-none font-bold"
            >
              {step === "hour" ? hour : minute}
            </motion.text>
          </svg>
        </div>
      )}
    </div>
  );
};

export default TimePickerField;