import { red } from "@material-ui/core/colors";
import React, { Fragment } from "react";
import Faq from "react-faq-component";
import data from "./data";
import styles from "./FAQ.module.css";

export default function FAQ() {
  return (
    <div className={styles.faqContainer}>
      <Faq
        data={data}
        styles={{
          bgColor: "white",
          titleTextColor: `#a6b1e1`,
          titleTextSize: "2.2rem",
          rowTitleColor: "black",
          rowTitleTextSize: "1.2rem",
          rowContentColor: "black",
          rowContentTextSize: "1rem",
          rowContentPaddingTop: "10px",
          rowContentPaddingBottom: "20px",
          rowContentPaddingLeft: "30px",
          arrowColor: "gray",
        }}
        config={{
          animate: true,
        }}
      />
    </div>
  );
}
