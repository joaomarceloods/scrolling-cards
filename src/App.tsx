import { range } from "lodash";
import useStateWithInterpolation from "./useStateWithInterpolation";

const BOX_SIZE_IN_PIXELS = 100;
const INTERPOLATION_INTERVAL_IN_MILLISECONDS = 100;

const NUMBER_OF_BOXES = 20;
const ALL_BOXES = range(NUMBER_OF_BOXES); // e.g. [0, 1, 2, ..., 17, 18, 19]
const INITIAL_INDEX = 0;

const WINDOW_SIZE = 7;
const WINDOW_START = 0 - Math.floor(WINDOW_SIZE / 2);
const WINDOW_END = WINDOW_START + WINDOW_SIZE;
const WINDOW_SLOTS = range(WINDOW_START, WINDOW_END); // e.g. [-3, -2, -1, 0, 1, 2, 3]

function App() {
  const [currentIndex, setCurrentIndex] = useStateWithInterpolation(
    INITIAL_INDEX,
    INTERPOLATION_INTERVAL_IN_MILLISECONDS
  );

  return (
    <div>
      {WINDOW_SLOTS.map((slot, index) => {
        const slotIndex = currentIndex + slot;
        const loopingIndex = slotIndex % 20;
        const [thisBox] = ALL_BOXES.slice(loopingIndex);
        const translationY = `${index * BOX_SIZE_IN_PIXELS}px`;
        return (
          <div
            className="box"
            key={thisBox}
            onClick={() => setCurrentIndex(slotIndex)}
            style={{
              width: BOX_SIZE_IN_PIXELS,
              height: BOX_SIZE_IN_PIXELS,
              transform: `translateY(${translationY})`,
            }}
          >
            {slot} · {thisBox}
          </div>
        );
      })}
    </div>
  );
}

export default App;
