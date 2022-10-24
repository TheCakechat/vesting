import ReactDOM from 'react-dom';

const WithdrawPopup = ({ isVisible, onClose, children }: IPopup) => {
  if (!isVisible) return <></>;

  return ReactDOM.createPortal(
    <div className='modal'>
      <div
        className='fixed top-0 left-0 w-screen h-screen bg-transparent backdrop-blur-[2px] z-10'
        onClick={() => onClose && onClose()}
      ></div>
      {children}
    </div>,
    document.body
  );
};

interface IPopup {
  isVisible: boolean;
  onClose: Function;
  children?: any;
}

export default WithdrawPopup;
