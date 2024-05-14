import React, { useState } from 'react'
import styled from 'styled-components'
import starBasic from '../../assets/images/iconStarList.png'
import starLine from '../../assets/images/iconStarLine.png'
import starActive from '../../assets/images/iconStarListActive.png'
import wish from '../../assets/images/iconWish.png'
import wishActive from '../../assets/images/iconWishActive.png'
const Star = styled.i`
    content: '';
    display: flex;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background: url("${starBasic}");
    background-repeat: no-repeat;
    background-size: 100%;
    font-size: 0;
    &.whiteLine {
        background: url("${starLine}");
    }
    &.active {
        background: url("${starActive}");
    }
`
const Wish = styled.i`
    content: '';
    display: flex;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background: url("${wish}");
    background-repeat: no-repeat;
    background-size: 100%;
    font-size: 0;
    &.active {
        background: url("${wishActive}");
    }
`
function IconStar({className,lineStar,...props}) {
    const [btnActive, setBtnActive] = useState(false);
    function clickStar() {
        setBtnActive(!btnActive);
    }
    let cssClasses = lineStar ? 'whiteLine' : '';
    cssClasses += ' ' + className
    
  return (
    <>
        <Star className={`${btnActive ? 'active' : ''}  ${cssClasses}`} {...props} onClick={()=>{clickStar()}}>&#9733;</Star>
    </>
  )
}
function IconStarView({className,lineStar,...props}) {
    let cssClasses = lineStar ? 'whiteLine' : '';
    cssClasses += ' ' + className
    
  return (
    <>
        <Star className={`${cssClasses}`} {...props}>&#9733;</Star>
    </>
  )
}
function IconWish ({className,...props}) {
    const [btnActive, setBtnActive] = useState(false);
    function clickStar() {
        setBtnActive(!btnActive);
    }
  return (
    <>
        <Wish className={`${btnActive ? 'active' : ''}`} {...props} onClick={()=>{clickStar()}}>&#9733;</Wish>
    </>
  )
}

export {IconStar, IconWish , IconStarView }