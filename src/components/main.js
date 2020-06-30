// Imports
import React, { Component } from "react";
import "../css/main.css";
import ShowCalendar from "./calendar";
import events from "../data/events.json";

class Main extends Component {
  render() {
    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="row">
              {/* Looping on cards */}
              {events.events.map((event, i) => (
                <div key={i} className="col-lg-6 col-12 mb-3">
                  <div className="card shadow rounded border-0">
                    <div className="card-upper-line  w-full"></div>
                    <div className="card-body py-2">
                      <h5 className="card-title text-info">{event.name}</h5>
                      <div className="d-flex justify-content-between">
                        <span>
                          <p className="m-0">Start Date</p>
                          <p className="text-muted font-size-14">{event.start}</p>
                        </span>
                        <span>
                          <p className="m-0">End Date</p>
                          <p className="text-muted font-size-14">{event.end}</p>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6 col-12">
            {/* Calendar component */}
            <ShowCalendar events={events} />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
