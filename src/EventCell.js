import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import dates from './utils/dates';
import { accessor, elementType } from './utils/propTypes';
import { accessor as get } from './utils/accessors';
import Img from './img/doctor.png';
let propTypes = {
  event: PropTypes.object.isRequired,
  slotStart: PropTypes.instanceOf(Date),
  slotEnd: PropTypes.instanceOf(Date),

  selected: PropTypes.bool,
  eventPropGetter: PropTypes.func,
  titleAccessor: accessor,

  // @Appointment field info declaration
  patientNameAccessor: accessor,
  clinicianImageAccessor: accessor,
  clinicianNameAccessor: accessor,
  appointmentTypeAccessor: accessor,
  appointmentTimeAccessor: accessor,
  coPayAccessor: accessor,

  allDayAccessor: accessor,
  startAccessor: accessor,
  endAccessor: accessor,

  eventComponent: elementType,
  eventWrapperComponent: elementType.isRequired,
  onSelect: PropTypes.func
}

class EventCell extends React.Component {
  render() {
    let {
        className
      , event
      , selected
      , eventPropGetter
      , startAccessor
      , endAccessor
      , titleAccessor
      , patientNameAccessor
      , clinicianImageAccessor
      , clinicianNameAccessor
      , appointmentTypeAccessor
      , appointmentTimeAccessor
      , coPayAccessor
      , slotStart
      , slotEnd
      , onSelect
      , eventComponent: Event
      , eventWrapperComponent: EventWrapper
      , ...props } = this.props;

    let title = get(event, titleAccessor)
      , patientName = get(event, patientNameAccessor)
      , clinicianImage = get(event, clinicianImageAccessor)
      , clinicianName = get(event, clinicianNameAccessor)
      , appointmentType = get(event, appointmentTypeAccessor)
      , appointmentTime = get(event, appointmentTimeAccessor)
      , coPay = get(event, coPayAccessor)
      , end = get(event, endAccessor)
      , start = get(event, startAccessor)
      , isAllDay = get(event, props.allDayAccessor)
      , continuesPrior = dates.lt(start, slotStart, 'day')
      , continuesAfter = dates.gt(end, slotEnd, 'day')

    if (eventPropGetter)
      var { style, className: xClassName } = eventPropGetter(event, start, end, selected);

    return (
      <EventWrapper event={event}>
        <div
          style={{...props.style, ...style}}
          className={cn('rbc-event', className, xClassName, {
            'rbc-selected': selected,
            'rbc-event-allday': isAllDay || dates.diff(start, dates.ceil(end, 'day'), 'day') > 1,
            'rbc-event-continues-prior': continuesPrior,
            'rbc-event-continues-after': continuesAfter
          })}
          // onClick={(e) => onSelect(event, e)}
        >
          <div className='rbc-event-content' title={title}>
            { Event
              ? <Event event={event} title={title}/>
              : title
            }
            <div className="appointment_box month_box">
              <div className="topbar">
                <div className="info-title">Appointment info</div>
                <div className="icons">
                    <ul>
                      <li><a className="edit" href="#" onClick={(e) => this.hoverDialogActions(event, e, 'edit')}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a></li>
                      <li><a className="trash" href="#" onClick={(e) => this.hoverDialogActions(event, e, 'delete')}><i className="fa fa-trash-o" aria-hidden="true"></i></a></li>
                    </ul>
                </div>
              </div>
              <div className="info-content">
                  <div className="personal-info">
                      <div className="info-pic"><img src={clinicianImage} width="80px" height="80px" /></div>
                      <div className="info-p">
                        <div className="name">{clinicianName}</div>
                        <a href="#" onClick={(e) => this.hoverDialogActions(event, e, 'view_profile')}>View Pateint Profile</a>
                        <br />
                        <a href="#" onClick={(e) => this.hoverDialogActions(event, e, 'soap_note')}>Soap note</a>
                      </div>
                  </div>
                  <div className="about-event">
                      <div className="info-p">
                        <p><b>Appointment: </b><span>{appointmentType}</span></p>
                        <p><b>Time: </b><span>{appointmentTime}</span></p>
                        <p><b>Co-Pay: </b><span><i className="fa fa-usd" aria-hidden="true"></i> {coPay ? coPay : '0.00'}</span></p>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </EventWrapper>
    );
  }
  hoverDialogActions(event, e, action) {
    e.preventDefault();
    event.action = action;
    this.props.onSelect(event, e);
  }
}

EventCell.propTypes = propTypes;

export default EventCell
