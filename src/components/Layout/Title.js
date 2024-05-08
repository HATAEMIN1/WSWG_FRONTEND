import React from 'react';
import styled from 'styled-components';
const TitleWrap = styled.h3 `
    display:flex;
    justify-content: center;
    &.titleMemtt {
        font-family: 'TTHakgyoansimMonggeulmonggeulR';
        font-size: 3rem; /* 48px */
        line-height: 1;
    }
    &.titleMemStt {
        font-family: 'TTHakgyoansimMonggeulmonggeulR';
        font-size: 1.875rem; /* 30px */
        line-height: 2.25rem; /* 36px */
    }
    &.titleBasic {
        justify-content: start;
        font-family: 'Pretendard-Regular';
        font-size: 1.5rem; /* 24px */
        line-height: 2rem; /* 32px */
    }
    &.titleComment {
        justify-content: start;
        font-family: 'TTHakgyoansimMonggeulmonggeulR';
        font-size: 1rem; /* 16px */
        line-height: 1.5rem; /* 24px */
    }
`

function Title({children,memTitle,className, ...props}) {
    let cssClasses = memTitle ? "titleMemtt" : "titleMemStt";
    cssClasses += ' ' +className;
  return (
    <TitleWrap className={cssClasses} {...props}>{children}</TitleWrap>
  )
}

export default Title