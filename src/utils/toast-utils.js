import { toast, Zoom } from 'react-toastify';

export const showToaster = (type, msg) => {
    toast[type](msg, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Zoom,
    });
  }