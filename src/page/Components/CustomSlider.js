import React, { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomSlider = ({
  min = 0,
  max = 10000,
  step = 1,
  maxLimit = 700,
  onValueChange
}) => {
  const [value, setValue] = useState(maxLimit);

  useEffect(() => {
    if (value > maxLimit) {
      setValue(maxLimit);
      onValueChange(maxLimit);
    } 
  }, [maxLimit]);
  
  const handleChange = (newValue) => {
    if (newValue <= maxLimit) {
      setValue(newValue);
      onValueChange(newValue);
    }else{
      setValue(maxLimit);
      onValueChange(maxLimit);
    }
  };
  useEffect(()=> {
    onValueChange(value);
  },[])

  return (
    <div style={{
      width: "100%",
      paddingLeft: "3vw",
      paddingRight: "3vw",
      paddingBottom: "1vw"
    }}>
      
      <ReactSlider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        className="custom-slider"
        thumbClassName="custom-thumb"
      />
      <div className="mb-2 text-light"> {value}</div>
    </div>
  );
};

export default CustomSlider;
