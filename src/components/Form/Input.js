import React from "react";
import styled from "styled-components";
import iconLT from "../../assets/images/iconLT.svg";
import iconRT from "../../assets/images/iconRT.svg";
import iconRB from "../../assets/images/iconRB.svg";
import iconLB from "../../assets/images/iconLB.svg";
const InputBox = styled.div`
    position: relative;
    width: 100%;
    min-height: 40px;
    background: #f5f5f5;
    padding: 10px;
`;

function InputWrap({ children, ...props }) {
    return (
        <>
            <InputBox className="w-full" {...props}>
                <div className="absolute w-full left-0 top-0 flex justify-between">
                    <span>
                        <img src={iconLT} />
                    </span>
                    <span>
                        <img src={iconRT} />
                    </span>
                </div>
                {children}
                <div className="absolute w-full left-0 bottom-0 flex justify-between">
                    <span>
                        <img src={iconLB} />
                    </span>
                    <span>
                        <img src={iconRB} />
                    </span>
                </div>
            </InputBox>
        </>
    );
}

export default InputWrap;
