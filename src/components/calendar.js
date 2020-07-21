import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/sass/styles.scss";

const localizer = momentLocalizer(moment);

class ShowCalendar extends Component {
 
  render() {
    return (
      <div className="shadow-sm p-3 mb-5 bg-white rounded">
          <Calendar
            localizer={localizer}
            events={this.props.events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 400 }}
          />
      </div>
    );
  }
}

export default ShowCalendar;
