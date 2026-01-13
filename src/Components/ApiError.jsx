import { toast } from "react-toastify";

function ApiError(mssg) {
    toast.error(mssg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
}

export default ApiError;