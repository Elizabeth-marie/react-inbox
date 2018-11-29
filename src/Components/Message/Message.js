import React from 'react'

const Message = ({ message: { id, subject, read, starred, labels, selected }, checkBox, onStarClick }) => (
  <div className={`row message ${read ? 'read' : 'unread'} ${selected ? 'selected' : ''}`}>
  <div className="col-xs-1">
    <div className="row">
      <div className="col-xs-2">
        <input
          checked={selected}
          type="checkbox"
          onClick={() => checkBox(id)} />
      </div>
      <div className="col-xs-2">
        <i
          onClick={() => onStarClick(id)}
          className={`star fa fa-star${starred ? '' : '-o'}`}></i>
      </div>
    </div>
  </div>
  <div className="col-xs-11">
    {labels.map((label, idx) => (
      <span className="label label-warning" key={idx}>{label}</span>)
    )}

    <a href="#">
      {`${subject}`}
    </a>
  </div>
</div>
)

export default Message
