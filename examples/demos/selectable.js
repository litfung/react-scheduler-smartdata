import React from 'react';
import BigCalendar from 'react-big-calendar';
import events from '../events';

class Selectable extends React.Component{
  render(){
    return (
      <div {...this.props}>
        <h3 className="callout">
          Click an event to see more info, or
          drag the mouse over the calendar to select a date/time range.
        </h3>
        <BigCalendar
          selectable
          events={events}
          defaultView='resource'
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2015, 8, 1)}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={(slotInfo) => alert(
            `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
            `\nend: ${slotInfo.end.toLocaleString()}`
          )}
        />
      </div>
    )
  }
}

export default Selectable;
