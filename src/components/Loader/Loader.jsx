// import PropTypes from 'prop-types';

import css from './Loader.module.css';
import { ThreeCircles } from 'react-loader-spinner';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Loader = () => {
  return createPortal(
    <div className={css.Overlay}>
      <ThreeCircles
        height="160"
        width="160"
        color="#ffffff"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>,
    modalRoot
  );
};

export default Loader;
