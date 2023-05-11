import * as React from 'react';

import classNames from 'classnames';

type Props = {
  min: number;
  max: number;
  onChange: (range: { min: number; max: number }) => void;
};

export default function keDualRangeSlider({ min, max, onChange }: Props) {
  const [minVal, setMinVal] = React.useState(min);
  const [maxVal, setMaxVal] = React.useState(max);
  const minValRef = React.useRef<HTMLInputElement>(null);
  const maxValRef = React.useRef<HTMLInputElement>(null);
  const rangeRef = React.useRef<HTMLDivElement>(null);

  const toPercent = React.useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  React.useEffect(() => {
    if (maxValRef.current) {
      const minPercent = toPercent(minVal);
      const maxPercent = toPercent(+maxValRef.current.value);

      if (rangeRef.current) {
        rangeRef.current.style.left = `${minPercent}%`;
        rangeRef.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, toPercent]);

  React.useEffect(() => {
    if (minValRef.current) {
      const minPercent = toPercent(+minValRef.current.value);
      const maxPercent = toPercent(maxVal);

      if (rangeRef.current) {
        rangeRef.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, toPercent]);

  React.useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="container">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={(event) => {
          const value = Math.min(+event.target.value, maxVal - 1);
          setMinVal(value);
          event.target.value = value.toString();
        }}
        className={classNames('thumb z-[3]', {
          'z-[5]': minVal > max - 100,
        })}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={(event) => {
          const value = Math.max(+event.target.value, minVal + 1);
          setMaxVal(value);
          event.target.value = value.toString();
        }}
        className="thumb z-[4]"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={rangeRef} className="slider__range" />
        <div className="slider__left-value">${minVal}</div>
        <div className="slider__right-value">${maxVal}</div>
      </div>
    </div>
  );
}
