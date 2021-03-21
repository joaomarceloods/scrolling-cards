import { useEffect, useState } from "react";

export default function useStateWithInterpolation(
  initialValue: number,
  ms: number
): [number, (newValue: number) => void] {
  const [actualValue, setActualValue] = useState(Math.floor(initialValue));
  const [targetValue, setTargetValue] = useState(Math.floor(initialValue));

  useEffect(() => {
    const intervalRef = setInterval(updateValue, ms);
    const targetValueInt = Math.floor(targetValue);

    function updateValue() {
      if (targetValueInt > actualValue) setActualValue(actualValue + 1);
      if (targetValueInt < actualValue) setActualValue(actualValue - 1);
      if (targetValueInt === actualValue) clearInterval(intervalRef);
    }

    return () => clearInterval(intervalRef);
  }, [actualValue, ms, targetValue]);

  return [actualValue, setTargetValue];
}
