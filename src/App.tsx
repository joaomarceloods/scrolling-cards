import { range } from "lodash";
import useStateWithInterpolation from "./useStateWithInterpolation";

const BOX_SIZE_IN_PIXELS = 100;
const INTERPOLATION_INTERVAL_IN_MILLISECONDS = 100;

const SCALE_FACTOR = 5;
const TRANSLATION_FACTOR = 0.7;

const NUMBER_OF_BOXES = 20;
const ALL_BOXES = range(NUMBER_OF_BOXES); // e.g. [0, 1, 2, ..., 17, 18, 19]
const INITIAL_INDEX = 0;

const WINDOW_SIZE = 9;
const WINDOW_START = 0 - Math.floor(WINDOW_SIZE / 2);
const WINDOW_END = WINDOW_START + WINDOW_SIZE;
const WINDOW_SLOTS = range(WINDOW_START, WINDOW_END); // e.g. [-3, -2, -1, 0, 1, 2, 3]

function App() {
  const [currentIndex, setCurrentIndex] = useStateWithInterpolation(
    INITIAL_INDEX,
    INTERPOLATION_INTERVAL_IN_MILLISECONDS
  );

  return (
    <div className="container">
      <div className="box-container">
        {WINDOW_SLOTS.map((slot, index) => {
          const slotIndex = currentIndex + slot;
          const loopingIndex = slotIndex % 20;
          const [thisBox] = ALL_BOXES.slice(loopingIndex);

          const translationY = TRANSLATION_FACTOR * index * BOX_SIZE_IN_PIXELS;

          const scale =
            (SCALE_FACTOR + WINDOW_END - Math.abs(slot)) /
            (SCALE_FACTOR + WINDOW_END);

          return (
            <div
              className="box"
              key={thisBox}
              onClick={() => setCurrentIndex(slotIndex)}
              style={{
                zIndex: WINDOW_END - Math.abs(slot),
                width: BOX_SIZE_IN_PIXELS,
                height: BOX_SIZE_IN_PIXELS,
                transform: `translateY(${translationY}px) scale(${scale})`,
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontWeight: "bold" }}>{thisBox}</div>
                <div style={{ fontSize: "0.8em", color: "gray" }}>[{slot}]</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
