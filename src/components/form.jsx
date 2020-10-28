import React, { useState } from "react";
import { withRouter } from "react-router";
import { gql, useMutation } from "@apollo/client";

const ADD_SCH = gql`
  mutation($title: String!, $date: date, $sections: jsonb) {
    insert_schedules(
      objects: { title: $title, date: $date, sections: $sections }
    ) {
      affected_rows
      returning {
        id
        title
        date
        sections
      }
    }
  }
`;

function Form(props) {
  const [addSch] = useMutation(ADD_SCH);

  const sectionSchema = [{ time: "", title: "", subtitles: [""] }];

  const [title, setTitle] = useState("");

  const [date, setDate] = useState("");

  const [sections, createSection] = useState(sectionSchema);

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleDate(event) {
    setDate(event.target.value);
  }

  function addNewSection() {
    sections.push({ time: "", title: "", subtitles: [""] });
    createSection([...sections]);
  }

  function addTitleToSection(e, id) {
    let clickedSection = sections[id];
    clickedSection.title = e.target.value;
    sections[id] = clickedSection;
    createSection([...sections]);
  }
  function handleTimeChange(e, id) {
    let clickedTime = sections[id];
    clickedTime.time = e.target.value;
    sections[id] = clickedTime;
    createSection([...sections]);
  }
  function handleSubtitle(e, id, subtitleID) {
    sections[id].subtitles[subtitleID] = e.target.value;
    createSection([...sections]);
  }
  function returnToSchedule() {
    props.history.push("/");
  }

  function addNewSubsection(e, id) {
    sections[id].subtitles.push("");
    createSection([...sections]);
  }
  async function createSchedule() {
    const schedule = { title, date, sections };
    if (!title || !date) {
      alert("Enter Title and Date of your training");
    } else {
      // localStorage.setItem(schedule, JSON.stringify(schedule));
      await addSch({
        variables: { title: title, date: date, sections: sections },
      });
      props.saveSchedule(schedule);
    }
  }

  return (
    <div>
      <div>
        <h1 style={{ fontWeight: 500 }}>Create a new training schedule</h1>
        <button className="secondaryBtn return" onClick={returnToSchedule}>
          Cancel
        </button>
      </div>
      <div className="scroll-block">
        <div className="mainSection">
          <div className="dateDiv">
            <label className="label">Date</label>
            <input
              className="input"
              type="date"
              value={date}
              onChange={handleDate}
            />
          </div>
          <div className="titleDiv">
            <label className="label"> Title</label>

            <input
              className="input"
              type="text"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
        </div>

        {sections.map((section, id) => {
          return (
            <div className="subsectionDiv">
              {id == 0 ? (
                <div className="subheadingDiv">
                  <h3
                    className="sectionHeading"
                    style={{ display: "inline-block" }}
                  >
                    Sections
                  </h3>
                </div>
              ) : null}
              <div className="timeDiv">
                <label className="label">Time </label>

                <input
                  className="input"
                  type="time"
                  value={section.time}
                  onChange={(e) => handleTimeChange(e, id)}
                />
              </div>
              <div className="subtitleDiv">
                <label className="label">Title</label>
                <input
                  className="input"
                  type="text"
                  value={section.title}
                  onChange={(e) => addTitleToSection(e, id)}
                />
              </div>
              <div className="subsubtitleDiv">
                {section.subtitles.map((r, subtitleID) => {
                  return (
                    <div className="6th">
                      <label className="label">Subtitle</label>

                      <input
                        className="input"
                        type="text"
                        value={r}
                        onChange={(e) => handleSubtitle(e, id, subtitleID)}
                      />
                    </div>
                  );
                })}
              </div>
              {
                <button
                  className="secondaryBtn"
                  onClick={(e) => {
                    addNewSubsection(e, id);
                  }}
                >
                  New Subtitle
                </button>
              }
            </div>
          );
        })}
        <div>
          <button
            className="secondaryBtn new-sec"
            style={{ float: "right", display: "inline-block" }}
            onClick={addNewSection}
          >
            New Section
          </button>
        </div>
      </div>
      <div className="create-block">
        <button className="primaryBtn" type="submit" onClick={createSchedule}>
          Create
        </button>
      </div>
    </div>
  );
}

export default withRouter(Form);
