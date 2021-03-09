import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import "./SaleCountDown.css";

const SaleCountDown = ({ onFinish }) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(15);
  const [isStart, setIsStart] = useState(false);

  let intervalRef = useRef();
  let timeoutRef = useRef();
  const fixNum = function (num) {
    if (Number(num) < 10) {
      return "0" + num;
    }
    return num;
  };
  const finish = useCallback(() => {
    setIsStart(false);
    onFinish(false);
  }, [onFinish]);

  useEffect(() => {
    setIsStart(true);
    timeoutRef.current = setTimeout(() => {
      clearInterval(intervalRef.current);
      finish();
    }, 15000);
    intervalRef.current = setInterval(() => {
      console.log("alive");
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => {
      console.log("clear");
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [finish]);


  useEffect(() => {
    if (isStart && seconds < 0) {
      setSeconds(59);
      setMinutes((prev) => prev - 1);
    }
  }, [isStart, seconds]);

  return (
    <div className="saleCountDown">
      {isStart ? `${fixNum(minutes)}:${fixNum(seconds)} minutes to the end of sale` : "End of sale"}
    </div>
  );
};
SaleCountDown.propTypes = {
  setSale: PropTypes.func,
};
export default SaleCountDown;
