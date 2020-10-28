import React, { useEffect } from "react";
import { withRouter } from "react-router";
import Clock from "../images/clock.svg";
import moment from "moment";
import { gql, useQuery } from "@apollo/client";

const GET_MY_SCH = gql`
  query getSchedules {
    schedules(order_by: { id: desc }) {
      id
      title
      date
      sections
    }
  }
`;

function View(props) {
  function createNewTraining() {
    props.history.push("/create");
  }

  const sectionData = props.recievedSchedule.sections;

  const { loading, error, data } = useQuery(GET_MY_SCH, {
    fetchPolicy: "network-only",
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }
  const schedules = data ? data.schedules[0] : {};
  const sections1 = schedules
    ? JSON.parse(JSON.stringify(schedules.sections))
    : [];

  return (
    <div className="viewCont">
      {console.log(typeof sections1)}
      <div>
        <h1>Trainings</h1>
      </div>
      <div className="date-btn">
        <div>
          <button
            className="secondaryBtn createSchedule"
            onClick={createNewTraining}
          >
            New Training
          </button>
          <div className="selectDate">
            <span className="date">
              {" "}
              {moment(schedules.date).format("Do MMM")}
            </span>
            ❮&nbsp; &nbsp;❯
          </div>
        </div>
      </div>
      <div className="viewTitle">
        <h1 style={{ fontWeight: 500 }}>{schedules.title}</h1>
      </div>
      <div className="viewDate">
        <h2>
          <div className="clock">
            <img style={{ verticalAlign: "middle" }} src={Clock} width="25px" />
          </div>
          <div className="viewDate main">{schedules.date}</div>
        </h2>
      </div>
      {sections1
        ? sections1.map((sec, id) => {
            return sec.title && sec.time ? (
              <div className="viewSubsection">
                <div className="viewSubsec">
                  <div className="subsecTitle">
                    <h3> {sec.title}</h3>
                  </div>
                  <div className="time">{sec.time}</div>
                  {sec.subtitles
                    ? sec.subtitles.map((subtitle, id) => {
                        return subtitle ? (
                          <div className="subtitles">
                            <li>{subtitle} </li>
                          </div>
                        ) : null;
                      })
                    : null}
                </div>
              </div>
            ) : null;
          })
        : null}
    </div>
  );
}
export default withRouter(View);
