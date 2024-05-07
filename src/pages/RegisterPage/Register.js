import "../../assets/css/style.scss";
import "../../assets/css/tStyle.scss";

function Register() {
    return (
        <div className="w-[100%] h-[100%] flex justify-center bg-slate-400">
            <div
                className="w-[400px] h-[100px] flex-col justify-start items-center inline-flex font-normal text-zinc-800"
                style={{ fontFamily: "TTHakgyoansimMonggeulmonggeulR" }}
            >
                <div className="text-center text-5xl">어까</div>
                <div className="text-center text-3xl">가입 해볼까?</div>
                <div className="emailWrap">
                    <div className="w-10 h-10 relative">
                        <div className="w-[25.20px] h-[25.20px] left-[7px] top-[7px] absolute"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
