import React, { useState } from 'react'

function GlobalNav() {
    const gnbMenu = [
        {
            name: '홈',
            link: '/'
        },
        {
            name: '누구랑 갈까',
            link: '/mate'
        },
        {
            name: '어디까지 가볼까',
            link: '/meet-posts'
        },
        {
            name: '내정보',
            link: '/register'
        },
    ]
  return (
    <div>
        <ul>
            <li>홈</li>
            <li>홈</li>
            <li>홈</li>
            <li>홈</li>
        </ul>
    </div>
  )
}

export default GlobalNav