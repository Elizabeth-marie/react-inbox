import React from 'react'
// import ComposeForm from '../Compose-Form/Compose-Form'

const Toolbar = ({
  onComposingClick,
  toolBarChecked,

  onSelectAllClick,
  selected,
  unselected,

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
      className="btn btn-default"
      onClick={() => onSelectAllClick(selected)}>
          <i className={`fa ${
                      selected === 0 ? "fa-square-o"
                  : unselected === 0 ? "fa-check-square-o"
                  :                    "fa-minus-square-o" }`}>
            </i>
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
