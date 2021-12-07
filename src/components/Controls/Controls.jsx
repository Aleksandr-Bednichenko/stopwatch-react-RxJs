import React from "react";
import PropTypes from "prop-types";
import setTimeElements from "../../utils/TimeElements";

export const Controls = ({ time, start, stop, reset, wait }) => (
  <>
    <header className="header">
      <h1 className="title">Stopwatch</h1>
    </header>
    <section className="main">
      <h2 className="time">{setTimeElements(time)}</h2>
      <div className="button-list">
        <button type="button" className="button-item" onClick={start}>
          Start
        </button>
        <button type="button" className="button-item" onClick={stop}>
          Stop
        </button>
        <button type="button" className="button-item" onClick={reset}>
          Reset
        </button>
        <button type="button" className="button-item" ref={wait}>
          Wait
        </button>
      </div>
    </section>
  </>
);

Controls.propTypes = {
  time: PropTypes.number.isRequired,
  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  wait: PropTypes.object.isRequired,
};
