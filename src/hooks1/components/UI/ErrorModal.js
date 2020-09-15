import React from 'react';

import style from './ErrorModal.module.css';

const ErrorModal = React.memo(props => {
  return (
    <React.Fragment>
      <div className={style.backdrop} onClick={props.onClose} />
      <div className={style.errorModal}>
        <h2>An Error Occurred!</h2>
        <p>{props.children}</p>
        <div className={style.errorModalActions}>
          <button type="button" onClick={props.onClose}>
            Okay
          </button>
        </div>
      </div>
    </React.Fragment>
  );
});

export default ErrorModal;
