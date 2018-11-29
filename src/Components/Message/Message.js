import React from 'react'

const Message = ({ message: { id, subject, read, starred, label, selected }, checkBox }) => (
  <div className={`row message unread ${selected ? 'selected' : ''}`}>
  <div className="col-xs-1">
    <div className="row">
      <div className="col-xs-2">
        <input
          checked={selected}
          type="checkbox"
          onClick={() => checkBox(id)} />
      </div>
      <div className="col-xs-2">
        <i className="star fa fa-star-o"></i>
      </div>
    </div>
  </div>
  <div className="col-xs-11">
    <a href="#">
      {`${subject}`}
    </a>
  </div>
</div>
)

export default Message
