import React from 'react'

const Toolbar = ({toolBarChecked, onToolbarCheckBoxClick, onReadClick, onUnreadClick}) => (
  <div className="row toolbar">
  <div className="col-md-12">
    <p className="pull-right">
      <span className="badge badge">2</span>
      unread messages
    </p>

    <button
      onClick={onToolbarCheckBoxClick}
      className="btn btn-default">
      <i className={`fa fa-${toolBarChecked ? 'check-square-o' : 'square-o'}`}></i>
    </button>

    <button
      onClick={onReadClick}
      className="btn btn-default">
      Mark As Read
    </button>

    <button
      onClick={onUnreadClick}
      className="btn btn-default">
      Mark As Unread
    </button>

    <select className="form-control label-select">
      <option>Apply label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <select className="form-control label-select">
      <option>Remove label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <button className="btn btn-default">
      <i className="fa fa-trash-o"></i>
    </button>
  </div>
</div>

)

export default Toolbar
