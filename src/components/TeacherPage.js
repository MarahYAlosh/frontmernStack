import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/TeacherInputs.css";
import logo from "../img/onlineEdu.png";
import { Popup } from "./Popup";

export const TeacherPage = () => {
  const [level, setlevel] = useState("");

  const [open, setOpen] = useState(false);

  return (
    <div className="containerAll">
      <div className="logoimg">
        <img src={logo} alt="" />
      </div>
      <div className="containerBg">
        <a className="button" onClick={() => setOpen(true)}>
          اضافة معلم
        </a>
        <div className="containerTeacher">
          <div id="contTeach">
            <blockquote className="speech-bubble">
              <div className="box">
                <div className="marquee-one">
                  يجب تحديد لأي مستوى تضاف الأسئلة
                </div>
              </div>
            </blockquote>
          </div>
          <div className="box">
            <select onChange={(e) => setlevel(e.target.value)}>
              <option value="juniorQuestion">junior question</option>
              <option value="middleQuestion">middle question</option>
              <option value="advancedQuestion">advanced question</option>
            </select>
          </div>
          <button className="button-62" role="button">
            <Link to={`/teacherInputs`} state={{ level: level }}>
              Go
            </Link>
          </button>
        </div>
      </div>
      {open && <Popup setOpen={setOpen} open={open} />}
    </div>
  );
};
