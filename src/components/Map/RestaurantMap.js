import { useEffect, useState } from "react";
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
            setRestaurant(res.data.restaurant);
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        fetchRestaurant();
    }, []);

    useEffect(() => {
        if (
            restaurant &&
            restaurant.location &&
            restaurant.location.coordinates &&
            restaurant.location.coordinates.length > 0
        ) {
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
                // "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
                `${process.env.PUBLIC_URL}/images/mapPickActive.png`;
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

    if (
        !restaurant ||
        !restaurant.location ||
        !restaurant.location.coordinates ||
        restaurant.location.coordinates.length === 0
    ) {
        return (
            <p className="flex w-full h-full text-center justify-center items-center">
                좌표를 찾을 수 없어
                <br />
                지도가 없습니다
            </p>
        );
    }

    return (
        <>
            <div id="map" style={{ width: "100%", height: "100%" }}></div>
        </>
    );
}

export default RestaurantMap;
