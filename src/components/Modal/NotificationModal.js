import { useNavigate } from "react-router-dom";

const NotificationModal = ({ text, path, imgSrc, imgAlt }) => {
    const navigate = useNavigate();
    return (
        <div className="absolute flex mt-24 flex-col px-5 bg-white items-center justify-center w-[400px] h-[170px] rounded-[20px] z-20 shadow-md gap-4">
            {text}
            <img src={imgSrc} alt={imgAlt} />
            <button
                onClick={() => {
                    if (path === window.location.pathname) {
                        window.location.reload();
                    } else {
                        navigate(path);
                    }
                }}
                className="py-[5px] px-[10px] flex justify-center bg-primary-300 items-center w-[330px] h-[40px] rounded-[5px] "
            >
                확인
            </button>
        </div>
    );
};

export default NotificationModal;
