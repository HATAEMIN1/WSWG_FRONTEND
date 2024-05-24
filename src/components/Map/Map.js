import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { useSelector } from "react-redux";
import { SectionWrap } from "../Layout/Section";
import { Link } from "react-router-dom";

const { kakao } = window;
function Map(props) {
    const mateType = [
        { no: 1, cateId: "lover", name: "연인" },
        { no: 2, cateId: "friend", name: "친구" },
        { no: 3, cateId: "family", name: "가족" },
        { no: 4, cateId: "group", name: "단체모임" },
        { no: 5, cateId: "pet", name: "반려동물" },
        { no: 6, cateId: "self", name: "혼자" },
    ];
    const cateId = useSelector((state) => {
        const mateTypeName = state.filter.mateType;
        const selectedMateType = mateType.find(
            (type) => type.name === mateTypeName
        );
        return selectedMateType ? selectedMateType.cateId : "";
    });
    const foodtype = useSelector((state) => state.filter.foodType);
    const [geoData, setGeoData] = useState([]);
    const fetchRestaurant = async () => {
        try {
            const params = { foodtype };
            const res = await axiosInstance.get(`/restaurants/${cateId}`, {
                params,
            });
            console.log(res.data.restaurant);
            setGeoData(res.data.restaurant);
        } catch (e) {
            console.log(e.message);
        }
    };
    const positions = geoData.map((restaurant) => ({
        title: restaurant.name,
        latlng: new kakao.maps.LatLng(
            restaurant.location.coordinates[1],
            restaurant.location.coordinates[0]
        ),
    }));
    useEffect(() => {
        fetchRestaurant();
    }, []);

    function MapSet(click) {
        const mapContainer = document.getElementById("map"), // 지도를 표시할 div
            mapOption = {
                center: new kakao.maps.LatLng(
                    37.48073710748562,
                    126.87963572538791
                ), // 지도의 중심좌표
                level: 3, // 지도의 확대 레벨
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

            // 마커를 생성합니다
            let marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커를 표시할 위치
                title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage, // 마커 이미지
            });
        }
        //////////내위치 마커////////////////////////////////////////////////////
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

        // 지도에 마커와 인포윈도우를 표시하는 함수입니다
        function displayMarker(locPosition, message) {
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: locPosition,
            });

            var iwContent = message, // 인포윈도우에 표시할 내용
                iwRemoveable = true;

            // 인포윈도우를 생성합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: iwContent,
                removable: iwRemoveable,
            });

            // 인포윈도우를 마커위에 표시합니다
            infowindow.open(map, marker);

            // 지도 중심좌표를 접속위치로 변경합니다
            map.setCenter(locPosition);
        }
        const panTo = () => {
            // 이동할 위도 경도 위치를 생성합니다
            const moveLatLon = new window.kakao.maps.LatLng(
                33.45058,
                126.574942
            );

            // 지도 중심을 부드럽게 이동시킵니다
            // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
            map.panTo(moveLatLon);
        };
        if (click) {
            panTo();
        }
    }
    useEffect(() => {
        MapSet();
    }, [geoData]);

    return (
        <>
            <div id="map" style={{ width: "100%", height: "400px" }}></div>
            <div className="w-full absolute bottom-0 py-3 mainMapLayer z-10">
                <SectionWrap
                    className={"flex justify-between mainMapButton"}
                    basicSection={true}
                >
                    <div className="w-1/2 text-white text-[20px]">
                        <Link
                            className="flex justify-center align-middle"
                            onClick={() => {
                                props.modalOpen(0);
                            }}
                        >
                            <i className="iconMark"></i>지역설정하기
                        </Link>
                    </div>
                    <div className="w-1/2 text-white text-[20px]">
                        <Link
                            className="flex justify-center align-middle"
                            onClick={() => {
                                MapSet("click");
                            }}
                        >
                            <i className="iconMap"></i>
                            현위치보기
                        </Link>
                    </div>
                </SectionWrap>
            </div>
        </>
    );
}

export default Map;
