import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import styles from "./Check.module.css";
import * as Yup from "yup";
import { TextField } from "./TextField";

const Check = () => {
  let navigate = useNavigate();

  const validate = Yup.object({
    checked1: Yup.boolean().oneOf([true], "동의해주세요"),
    checked2: Yup.boolean().oneOf([true], "동의해주세요"),
  });

  //   const onSubmit = () => {
  //     validate ? navigate("/register") : console.log("동의 눌러야함");
  //   };

  return (
    <Formik
      initialValues={{
        checked1: false,
        checked2: false,
        checked3: false,
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        // console.log(values);
        if (values.checked1 === true && values.checked2 === true) {
          navigate("/register");
        }
      }}
    >
      {(formik) => (
        <Form>
          <div role="group" className={styles.checkboxGroup}>
            <h4>초대 이용약관 (필수)</h4>
            <div className={styles.scroll}>
              추후 수정=== 동의를 누르고 다른곳을 눌러야 알림이 뜸 n se about
              how long sentences = run-on sentences. You can have a six-word
              run-on sentence (“I went shopping I ate donuts.”), while most of
              the sentences below are much, much longer than that and are not
              run-ons (except for a few examples like Jose Saramago). But
              whether the sentence is grammatically correct isn’t nearly as
              important as whether the sentence is fun or beautiful. I hope that
              a study of very long sentences will arm you with strategies that
              are almost as diverse as the sentences themselves, such as:
              starting each clause with the same word, tilting with dependent
              clauses toward a revelation at the end, padding with
              parentheticals, showing great latitude toward standard
              punctuation, rabbit-trailing away from the initial subject,
              encapsulating an entire life, and lastly, as this sentence is,
              celebrating the list. What’s the definition of a long sentence?
              For my purposes, I’m defining it as more than a 100 words. I’ve
              cheated with a few beautiful sentences a few words short, because
              there is no sense in having an absolute and arbitrary rule, but
              more than 100 words was my guiding principle. I think any sentence
              more than 100 words is almost guaranteed to be complex,
              complicated, and enormous.
            </div>
            <TextField type="checkbox" name="checked1" className={styles.hq} />
            <h4>개인정보 수집 및 이용동의 (필수)</h4>
            <div className={styles.scroll}>
              nd let’s end all this nonsense about how long sentences = run-on
              sentences. You can have a six-word run-on sentence (“I went
              shopping I ate donuts.”), while most of the sentences below are
              much, much longer than that and are not run-ons (except for a few
              examples like Jose Saramago). But whether the sentence is
              grammatically correct isn’t nearly as important as whether the
              sentence is fun or beautiful. I hope that a study of very long
              sentences will arm you with strategies that are almost as diverse
              as the sentences themselves, such as: starting each clause with
              the same word, tilting with dependent clauses toward a revelation
              at the end, padding with parentheticals, showing great latitude
              toward standard punctuation, rabbit-trailing away from the initial
              subject, encapsulating an entire life, and lastly, as this
              sentence is, celebrating the list. What’s the definition of a long
              sentence? For my purposes, I’m defining it as more than a 100
              words. I’ve cheated with a few beautiful sentences a few words
              short, because there is no sense in having an absolute and
              arbitrary rule, but more than 100 words was my guiding principle.
              I think any sentence more than 100 words is almost guaranteed to
              be complex, complicated, and enormous.
            </div>
            <TextField type="checkbox" name="checked2" className={styles.hq} />
            <h4>위치정보 수신동의 (선택)</h4>
            <div className={styles.scroll}>
              nd let’s end all this nonsense about how long sentences = run-on
              sentences. You can have a six-word run-on sentence (“I went
              shopping I ate donuts.”), while most of the sentences below are
              much, much longer than that and are not run-ons (except for a few
              examples like Jose Saramago). But whether the sentence is
              grammatically correct isn’t nearly as important as whether the
              sentence is fun or beautiful. I hope that a study of very long
              sentences will arm you with strategies that are almost as diverse
              as the sentences themselves, such as: starting each clause with
              the same word, tilting with dependent clauses toward a revelation
              at the end, padding with parentheticals, showing great latitude
              toward standard punctuation, rabbit-trailing away from the initial
              subject, encapsulating an entire life, and lastly, as this
              sentence is, celebrating the list. What’s the definition of a long
              sentence? For my purposes, I’m defining it as more than a 100
              words. I’ve cheated with a few beautiful sentences a few words
              short, because there is no sense in having an absolute and
              arbitrary rule, but more than 100 words was my guiding principle.
              I think any sentence more than 100 words is almost guaranteed to
              be complex, complicated, and enormous.
            </div>
            <TextField type="checkbox" name="checked3" className={styles.hq} />
          </div>
          <div className={styles.checkBtnWrapper}>
            <button className={styles.loginBtn} type="submit">
              다음
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default Check;
