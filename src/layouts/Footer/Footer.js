import React from "react";

function Footer(props) {
    return (
        <>
        <footer className="h-[150px] mt-[120px]">
            <div className="md:container container h-[100%] m-auto flex flex-wrap md:flex-wrap justify-between items-center text-white">
                <div className="m-auto md:m-0 flex-none">
                    <h1 className="logoFooter">어까?</h1>
                </div>
                <div className="flex-col grid justify-items-center md:justify-items-end gap-2">
                    <ul className="flex justify-between gap-4">
                        <li><a href="#">이용약관</a></li>
                        <li>l</li>
                        <li><a href="#">개인정보처리방침</a></li>
                        <li>l</li>
                        <li><a href="#">위치기반 서비스 이용약관</a></li>
                        <li>l</li>
                        <li><a href="#">고객센터</a></li>
                    </ul>
                    <ul className="flex gap-4">
                        <li>주&#41; 성용의 아이들</li>
                        <li>대표 : 하태민</li>
                        <li>github : <a href="https://github.com/HATAEMIN1/WSWG_FRONTEND" target="_blank">https://github.com/HATAEMIN1</a></li>
                    </ul>
                </div>
            </div>
        </footer>
        </>
    );
}
export default Footer;
