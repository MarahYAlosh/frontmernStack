import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";

export function attempts_Number(result) {
  return result.filter((r) => r !== undefined).length;
}
export function earnPoints_Number(result, answers, points) {
  return result
    .map((element, index) => answers[index] === element)
    .filter((i) => i)
    .map((i) => points)
    .reduce((prev, curr) => prev + curr, 0);
}
export function flagResult(totalPoints, earnPoints) {
  return (totalPoints * 50) / 100 < earnPoints;
}


export async function getServerData(url, callback) {
  const data = await (await axios.get(url))?.data;
  return callback ? callback(data) : data;
}

export async function postServerData(url, result, callback) {
  const data = await (await axios.post(url, result))?.data;
  return callback ? callback(data) : data;
}
export async function convertminuteToSecond(minute, second) {

  return (second = second + minute * 60);
}
export async function convertSecondTominute(second) {

  return `${"0" + Math.floor(second / 60)}: ${
    second % 60 ? (second >= 10 ? second % 60 : "0" + (second % 60)) : "00"
  }`;
}


export function movingWithinLevel(
  earnPercent,
  earnPoints,
  seconds,
  index,
  dispatch,
  increaseIndex,
  increaseEarnPoints,
  increaseSeconds
) {
 
  if (earnPercent > 50) {
    dispatch(increaseIndex());
    dispatch(increaseEarnPoints(earnPoints));
    dispatch(increaseSeconds(seconds));
  }
}
export function sumArray(array) {
  return array.reduce(function (pv, cv) {
    return pv + cv;
  }, 0);
}
