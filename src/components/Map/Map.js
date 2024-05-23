import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { useSelector } from "react-redux";

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
            restaurant.latitude,
            restaurant.longitude
        ),
    }));
    useEffect(() => {
        fetchRestaurant();
    }, []);
    useEffect(() => {
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
    }, [geoData]);

    return (
        <>
            <div id="map" style={{ width: "100%", height: "400px" }}></div>
        </>
    );
}

export default Map;
