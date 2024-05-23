import React from 'react';
import styled from 'styled-components';
const BtnWrap = styled.div `
`
const ButtonBox = styled.button`
width: 100%;
height : 40px;
padding : 0px 16px;
display: flex;
justify-content: center;
align-items: center;
background: #EBE9E9;
border-radius : 5px;
color: #333333;
a {
    display: flex;
}
&:hover {
    background: #D9D9D9;
}
&.primary{
    background: #42EEEE;
    color: #003837;
}
&.primary:hover {
    background: #0DDDDD;
}
&.lineButton {
    max-width: 50%;
    background: #ffffff;
    border: solid 1px #EEEEEE;
    color :#767676;
}
&.lineButton:hover {
    border: solid 1px #42EEEE;
    color: #333333;
}
&.lineSmallButton {
    width: auto;
    height : 28px;
    background: #ffffff;
    border: solid 1px #E3E3E3;
    border-radius : 30px;
    color :#767676;
    font-size: 0.875em;
}
&.lineSmallButton:hover {
    border: solid 1px #42EEEE;
    color: #333333;
}

&>i {
    margin-right: 5px;
}
&.lineDelButton {
    width: auto;
    height : 28px;
    padding: 0px 5px;
    background: #ffffff;
    border: solid 1px #E3E3E3;
    border-radius : 5px;
    color :#767676;
    font-size: 0.875em;
}
&.lineDelButton:hover {
    border: solid 1px #B5B5B5;
    color: #333333;
}
&.lineDelButton i {
    margin-right: 0px;
    margin-left: 5px;
}
`;
const BtnCencel = styled.div`
width: 100%;
height : 40px;
cursor: pointer;
padding : 0px 16px;
display: flex;
justify-content: center;
align-items: center;
background: #EBE9E9;
border-radius : 5px;
color: #333333;
&:hover {
    background: #D9D9D9;
}
`;
function ButtonWrap({children, ...props}){
    return(
        <BtnWrap className="w-[600px] m-auto flex justify-center gap-2 py-2" {...props}>{children}</BtnWrap>
    )
}

function Button({children,basicButton,className, ...props}) {
    let cssClasses = basicButton ? "primary" : "button";
    cssClasses += ' ' +className
  return (
    <ButtonBox className={cssClasses} {...props}>{children}</ButtonBox>
  )
}

function ButtonCencel({children,className, ...props}) {
    return (
    <BtnCencel {...props}>{children}</BtnCencel>
    )
}

export { Button, ButtonWrap, ButtonCencel};

