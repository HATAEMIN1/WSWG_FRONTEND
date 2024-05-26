import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { useSelector } from "react-redux";
import { SectionWrap } from "../Layout/Section";
import { Link } from "react-router-dom";

const { kakao } = window;
function MeetingMap({
    geoData,
    geoCenter,
    geoMouse,
    setGeoCenter,
    setGeoMouse,
    fetchRestaurant,
    setGeoData,
    cateId,
    ...props
}) {
    const positions = geoData.map((restaurant) => ({
        title: restaurant.name,
        latlng: new kakao.maps.LatLng(
            restaurant.location.coordinates[1],
            restaurant.location.coordinates[0]
        ),
        image: restaurant.image[0],
    }));
    function mapSet(click) {
        const mapContainer = document.getElementById("map"),
            // 지도를 표시할 div
            mapOption = {
                center: new kakao.maps.LatLng(...geoCenter), // 지도의 중심좌표
                level: geoMouse, // 지도의 확대 레벨
            };
        const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
        // 마커가 표시될 위치입니다
        // 마커 이미지의 이미지 주소입니다
        var imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
        for (let i = 0; i < positions.length; i++) {
            // 마커 이미지의 이미지 크기 입니다
            let imageSize = new kakao.maps.Size(24, 35);
            // 마커 이미지를 생성합니다
            let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
            //마커 생성
            const message = `<div class="w-[110px]"><img src="${geoData[i].image[0]}" alt="Image" class="block" />${geoData[i].name}</div>`;
            displayMarker(
                positions[i].latlng,
                message, // 마커 인포윈도우 내용들
                markerImage, //마커 이미지
                positions[i].title
            );
        }
        // 지도에 마커와 인포윈도우를 표시하는 함수입니다
        function displayMarker(locPosition, message, markerImage, title) {
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: locPosition,
                image: markerImage,
                title: title,
            });

            var iwContent = message, // 인포윈도우에 표시할 내용
                iwRemoveable = true;
            // 인포윈도우를 생성합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: iwContent,
                removable: iwRemoveable,
            });
            let currentInfoWindow = null;
            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, "click", function () {
                // if (currentInfoWindow) {
                //     currentInfoWindow.close(); // 현재 열려 있는 인포윈도우 닫기
                // }
                //
                // infowindow.open(map, marker); // 새로운 인포윈도우 열기
                // currentInfoWindow = infowindow; // 현재 열려 있는 인포윈도우 업데이트
                // 마커 위에 인포윈도우를 표시합니다
                infowindow.open(map, marker);
                console.log(infowindow);
                var lat = marker.getPosition().getLat();
                var lng = marker.getPosition().getLng();
                console.log("위도: " + lat + ", 경도: " + lng);
            });
        }
        //내 위치 마커
        // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도

                var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                    message =
                        '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
                // 마커와 인포윈도우를 표시합니다
                displayMarker(locPosition, message);
            });
        } else {
            // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

            var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
                message = "geolocation을 사용할수 없어요..";

            displayMarker(locPosition, message);
        }

        const panTo = () => {
            if (navigator.geolocation) {
                // GeoLocation을 이용해서 접속 위치를 얻어옵니다
                navigator.geolocation.getCurrentPosition(function (position) {
                    var lat = position.coords.latitude, // 위도
                        lon = position.coords.longitude; // 경도
                    const moveLatLon = new window.kakao.maps.LatLng(lat, lon);
                    // 지도 중심을 부드럽게 이동시킵니다
                    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
                    map.panTo(moveLatLon);
                });
            }
        };
        if (click) {
            panTo();
        }
        // 마우스 드래그로 지도 이동이 완료되었을 때 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
        kakao.maps.event.addListener(map, "dragend", async function () {
            // 지도 중심좌표를 얻어옵니다
            var latlng = map.getCenter();
            setGeoCenter([latlng.Ma, latlng.La]);
            const body = { lat: latlng.getLat(), lon: latlng.getLng(), cateId };
            const res = await axiosInstance.post("restaurants/location", body);
            setGeoData(res.data.restaurant);
            console.log(res.data.restaurant);
        });
        kakao.maps.event.addListener(map, "zoom_changed", function () {
            // 지도의 현재 레벨을 얻어옵니다
            var level = map.getLevel();
            setGeoMouse(level);
        });
    }
    useEffect(() => {
        mapSet();
    }, [geoData, geoCenter]);
    return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
}

export default MeetingMap;
