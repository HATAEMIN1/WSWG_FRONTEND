import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { useParams } from "react-router-dom";
const { kakao } = window;
function RestaurantMap(props) {
    const { cateId, rtId } = useParams();
    const [restaurant, setRestaurant] = useState(null);

    const fetchRestaurant = async () => {
        try {
            const res = await axiosInstance.get(
                `/restaurants/${cateId}/${rtId}`
            );
            console.log(res.data.restaurant);
            setRestaurant(res.data.restaurant);
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        fetchRestaurant();
    }, []);

    useEffect(() => {
        if (restaurant) {
            // 레스토랑이 존재하는 경우에만 실행
            const mapContainer = document.getElementById("map");
            const mapOption = {
                center: new kakao.maps.LatLng(
                    restaurant.location.coordinates[1], // 위도
                    restaurant.location.coordinates[0] // 경도
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
                    restaurant.location.coordinates[1],
                    restaurant.location.coordinates[0]
                ),
                title: restaurant.name,
                image: markerImage,
            });
        }
    }, [restaurant]);

    return (
        <>
            <div id="map" style={{ width: "100%", height: "100%" }}></div>
        </>
    );
}

export default RestaurantMap;
