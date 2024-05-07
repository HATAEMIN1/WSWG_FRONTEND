import React from 'react';

function Footer(props) {
    return (
        <>
        <footer className='h-[150px]'>
            <div className="md:container container h-[100%] m-auto flex flex-wrap md:flex-nowrap justify-between items-center text-white">
                <div className="m-auto md:m-0 flex-none">
                    <h1 className="logoFooter">어까?</h1>
                </div>
                <div className="flex flex-wrap justify-center md:justify-end gap-2">
                    <ul className="flex">
                        <li><a href="#">이용약관</a></li>
                        <li><a href="#">개인정보처리방침</a></li>
                        <li><a href="#">위치기반 서비스 이용약관</a></li>
                        <li><a href="#">고객센터</a></li>
                    </ul>
                    <ul className="flex">
                        <li>주) 성용의 아이들</li>
                        <li>대표 : 하태민</li>
                        <li>github : https://github.com/HATAEMIN1</li>
                    </ul>
                </div>
            </div>
        </footer>
        </>
    );
}

export default Footer;