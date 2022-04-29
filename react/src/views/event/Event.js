import React, { useState, useEffect } from "react";
import styles from "./Event.module.css";
import { EventData } from "../event/EventData";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function Event() {
  const [currentImg, setCurrentImg] = useState(0);

  function loop(count) {
    if (count === EventData.length) {
      return (count = 0);
    }
    if (count < 0) {
      return (count = EventData.length - 1);
    }
    return count;
  }

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentImg((count) => loop(count + 1)),
      2000
    );
    return () => clearInterval(interval);
  });

  return (
    <div className={styles.eventContainer}>
      <div className={styles.eventImageContainer}>
        <div
          className={styles.eventInner}
          style={{ backgroundImage: `url(${EventData[currentImg].img})` }}
        >
          <div className={styles.eventBottom}></div>
          <div
            className={styles.left}
            onClick={() => {
              setCurrentImg((count) => loop(count - 1));
            }}
          >
            <IoIosArrowBack />
          </div>
          <div className={styles.center}>
            <div className={styles.eventTextWrapper}>
              <h1 className={styles.eventH1Tag}>
                {EventData[currentImg].title}
              </h1>
              <p className={styles.eventPTag}>
                {EventData[currentImg].subtitle}
              </p>
            </div>
          </div>
          <div
            className={styles.right}
            onClick={() => {
              setCurrentImg((count) => loop(count + 1));
            }}
          >
            <IoIosArrowForward />
          </div>
        </div>
      </div>
      <div className={styles.eventTableContainer}>
        <div className={styles.heading}>취업박람회 게시판</div>
        <table className={styles.eventTableDetails}>
          <thead>
            <tr className={styles.firstRowStyle}>
              <th style={{ width: "30%" }}>사진</th>
              <th colspan="2" style={{ width: "70%" }}>
                박람회 내용
              </th>
            </tr>
          </thead>
          {/* 여기서부터 맵 돌리면 됨. */}
          {EventData.map((data, i) => (
            <tbody key={i}>
              <tr style={{ textAlign: "left" }}>
                <td rowspan="2">
                  <img
                    className={styles.eventImageSize}
                    src={data.img}
                    alt=""
                  ></img>
                </td>
                <th>박람회</th>
                <td>{data.title}</td>
              </tr>
              <tr style={{ textAlign: "left" }}>
                <th>박람회 기간</th>
                <td>{data.subtitle}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Event;
