import React from 'react'

const Toolbar = ({
  onComposingClick,
  toolBarChecked,
  onToolbarCheckBoxClick,
  onReadClick,
  onUnreadClick,
  onDeleteClick,
  unreadCount,
  onAddLabelChange,
  onRemoveLabelChange}) => (

  <div className="row toolbar">
  <div className="col-md-12">
    <p className="pull-right">
      <span className="badge badge">{unreadCount}</span>
      unread messages
    </p>

    <a
      className="btn btn-danger"
      onClick={onComposingClick}>
      <i className="fa fa-plus"></i>
    </a>

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

    <select
      onChange={onAddLabelChange}
      className="form-control label-select">
      <option>Apply label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <select
      onChange={onRemoveLabelChange}
      className="form-control label-select">
      <option>Remove label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <button
      onClick={onDeleteClick}
      className="btn btn-default">
      <i className="fa fa-trash-o"></i>
    </button>
  </div>
</div>

)

export default Toolbar
