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
    background: #ffffff;
    border: solid 1px #42EEEE;
    color: #333333;
}
`;
function ButtonWrap({children, ...props}){
    return(
        <BtnWrap className="w-[600px] m-auto flex justify-center gap-2" {...props}>{children}</BtnWrap>
    )
}

function Button({children,basicButton,className, ...props}) {
    let cssClasses = basicButton ? "primary" : "button";
    cssClasses += ' ' +className
  return (
    <ButtonBox className={cssClasses} {...props}>{children}</ButtonBox>
  )
}


export {ButtonWrap, Button}