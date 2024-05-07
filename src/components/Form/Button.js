import React from 'react';
import styled from 'styled-components';
const ButtonWrap = styled.button`
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
function Button({children,basicButton,className, ...props}) {
    let cssClasses = basicButton ? "primary" : "button";
    cssClasses += ' ' +className
  return (
    <ButtonWrap className={cssClasses} {...props}>{children}</ButtonWrap>
  )
}

export default Button