import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
const { kakao } = window;
function MeetingViewMap({ meetingData }) {
    console.log(meetingData);
    useEffect(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
            center: new kakao.maps.LatLng(
                meetingData.latitude, // 위도
                meetingData.longitude // 경도
            ),
            level: 3,
        };
        const map = new kakao.maps.Map(mapContainer, mapOption);
        var imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
        let imageSize = new kakao.maps.Size(24, 35);
        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        let marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(
                meetingData.latitude, // 위도
                meetingData.longitude // 경도
            ),
            title: meetingData.name,
            image: markerImage,
        });
    }, [meetingData]);

    return (
        <>
            <div id="map" style={{ width: "100%", height: "100%" }}></div>
        </>
    );
}

export default MeetingViewMap;
