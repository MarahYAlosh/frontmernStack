import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setUserId } from "../redux/resultReducer";
import "../styles/Main.css";
import { motion } from "framer-motion";

export const Main = () => {
  const [suc, setSuc] = useState();
  const [detailStudent, setdetailStudent] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();

  const pVarient = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
      },
    },
  };
  const spanVarient = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  useEffect(() => {
    axios.get("http://localhost:5000/getName").then(({ data }) => {
      setdetailStudent(data);
    });
  }, []);
  let detail =
    detailStudent &&
    detailStudent.filter(({ email }) => state.email.includes(email));

  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((res) => {
        if (res.data === "Success") {
          setSuc("Successed OK");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => alert(err));
  });

  const dispatch = useDispatch();
  function startQuiz() {
    dispatch(setUserId(detail && detail.map((x) => x.name)));
  }
  const text = "تطبيق تعليمي";
  return (
    <div className="containerMain">
      <div className="cont">
        <motion.h1
          className="title "
          variants={pVarient}
          initial="hidden"
          animate="visible"
        >
          {text.split("").map((char, ind) => (
            <motion.span variants={spanVarient} key={ind}>
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <h2> مرحبا {detail && detail.map((x) => x.name)} ، هل انت جاهز؟</h2>

        <div className="bubbleCont">
          <div className="section">
            <div className="electric bubble">
              سيتم عرض فقرة من فقرات مقرر الرياضيات ومن ثم يطرح<br></br> عليك
              أسئلة عن هذه الفقرة
            </div>
          </div>
          <div className="section">
            <div className="electric bubble">
              يتم منح 10 نقاط للإجابة الصحيحة
            </div>
          </div>
          <div className="section">
            <div className="electric bubble">
              يوجد 3 مراحل كل مرحلة 4 جولات و كل جولة 5 أسئلة
            </div>
          </div>

          <div className="section">
            <div className="electric bubble">
              يجب أن تجتاز كل مرحلة حتى تنتقل الى الأعلى
            </div>
          </div>
        </div>

        <div className="start">
          <Link className="btn" to="quiz" onClick={startQuiz}>
            ابدأ
          </Link>
        </div>
      </div>
    </div>
  );
};
