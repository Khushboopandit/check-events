// Imports
import React, { Component } from "react";
import "../css/main.css";
import ShowCalendar from "./calendar";
import axios from "axios";
import { format, addDays } from "date-fns";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      isEditComment: false,
    };
  }

  componentDidMount() {
    this.getEvents();
  }
  getEvents = () => {
    axios
      .get(
        "http://detangled.in/develop/82dc2b4d-dbc8-4fe8-912e-8f43a665a04a/events"
      )
      .then((response) => {
        let data = response.data;
        data.map((item, index) => {
          data[index].end = format(
            addDays(new Date(item.start), 10),
            "MM/dd/yyyy"
          );
        });
        this.setState({ events: data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Delete object from a list and backend api
  deleteEvent = (id) => {
    let data = this.state.events.filter((event) => event.id !== id);
    this.setState({ events: data });
    axios
      .delete(
        "http://detangled.in/develop/82dc2b4d-dbc8-4fe8-912e-8f43a665a04a/events:" +
          id,
        {
          data: this.state.events,
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Update comment field from state and API call
  saveUpdatedEvent = () => {
    let index = this.state.events.findIndex(
        (event) => event.id === this.state.eventId
      ),
      data = this.state.events;
    data[index].comment = this.state.input_value;
    this.setState({ events: data, isEditComment: false });
    axios
      .delete(
        "http://detangled.in/develop/82dc2b4d-dbc8-4fe8-912e-8f43a665a04a/events:" +
          this.state.eventId,
        {
          data: data,
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="row">
              {/* Looping on cards */}
              {this.state.events.map((event, i) => {
                return (
                  <div key={i} className="col-lg-6 col-12 mb-3">
                    <div className="card shadow rounded border-0">
                      <div className="card-upper-line  w-full"></div>
                      <div className="card-body py-2">
                        <h5 className="card-title text-info">
                          {event.destination}
                        </h5>

                        {this.state.isEditComment &&
                        this.state.eventId === event.id ? (
                          <form className="d-flex">
                            <div className="form-group mx-sm-3 mb-2">
                              <label htmlFor="comment" className="sr-only">
                                Comment
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="comment"
                                value={this.state.input_value}
                                onChange={(e) =>
                                  this.setState({ input_value: e.target.value })
                                }
                                placeholder="Write ..."
                              />
                            </div>
                            <button
                              onClick={this.saveUpdatedEvent}
                              type="button"
                              className="btn btn-info mb-2"
                            >
                              save
                            </button>
                          </form>
                        ) : (
                          <div className="d-flex justify-content-between">
                            <p>
                              <span className="font-weight-bold">Comment:</span>{" "}
                              {event.comment}
                            </p>
                            <button
                              type="button"
                              className="btn btn-outline-none pb-0 pt-1 px-2"
                              onClick={() =>
                                this.setState({
                                  isEditComment: true,
                                  eventId: event.id,
                                })
                              }
                            >
                              <i className="fa fa-edit"></i>
                            </button>
                          </div>
                        )}
                        <div className="d-flex justify-content-between">
                          <span>
                            <p className="m-0">Start Date</p>
                            <p className="text-muted font-size-14">
                              {format(new Date(event.start), "MM/dd/yyyy")}
                            </p>
                          </span>
                          <span>
                            <p className="m-0">End Date</p>
                            <p className="text-muted font-size-14">
                              {event.end}
                              {/* {event.start} */}
                            </p>
                          </span>
                        </div>
                        <button
                          type="button"
                          className="btn btn-outline-danger pb-0 pt-1 px-2"
                          onClick={() => this.deleteEvent(event.id)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-md-6 col-12">
            {/* Calendar component */}
            <ShowCalendar events={this.state.events} />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
