import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { useSelector } from "react-redux";
import { SectionWrap } from "../Layout/Section";
import { Link, useNavigate } from "react-router-dom";
import StarRating from "../Form/StarRating";
import ReactDOM from "react-dom";

const { kakao } = window;

function Map(props) {
    const navigate = useNavigate();
    const mateType = [
        { no: 1, cateId: "lover", name: "연인" },
        { no: 2, cateId: "friend", name: "친구" },
        { no: 3, cateId: "family", name: "가족" },
        { no: 4, cateId: "group", name: "단체모임" },
        { no: 5, cateId: "pet", name: "반려동물" },
        { no: 6, cateId: "self", name: "혼자" },
    ];

    const mateTypeName = useSelector((state) => state.filter.mateType);
    const foodtype = useSelector((state) => state.filter.foodType);

    useEffect(() => {
        console.log("Current mateTypeName:", mateTypeName); // mateTypeName 값을 콘솔에 출력하여 확인
    }, [mateTypeName]);

    const cateId = mateType.find((type) => type.name === mateTypeName)?.cateId || "";
    console.log("Current cateId:", cateId); // cateId 값을 콘솔에 출력하여 확인

    const [geoData, setGeoData] = useState([]);
    const [geoCenter, setGeoCenter] = useState([37.48073710748562, 126.87963572538791]);

    const fetchRestaurant = async () => {
        if (!cateId) return;
        try {
            const params = { foodtype };
            const res = await axiosInstance.get(`/restaurants/${cateId}`, { params });
            console.log(res.data.restaurant);
            setGeoData(res.data.restaurant);
        } catch (e) {
            console.log(e.message);
        }
    };

    const positions = geoData.map((restaurant) => ({
        id: restaurant._id,
        title: restaurant.name,
        latlng: new kakao.maps.LatLng(
            restaurant.location.coordinates[1],
            restaurant.location.coordinates[0]
        ),
        image: restaurant.image[0],
        rating: restaurant.rating,  // 별점
        cateId: cateId // cateId 추가
    }));

    useEffect(() => {
        fetchRestaurant();
    }, [cateId, foodtype]);

    function mapSet(click) {
        const mapContainer = document.getElementById("map"),
            mapOption = {
                center: new kakao.maps.LatLng(...geoCenter),
                level: 3,
            };

        const map = new kakao.maps.Map(mapContainer, mapOption);

        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        for (let i = 0; i < positions.length; i++) {
            let imageSize = new kakao.maps.Size(24, 35);
            let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
            const content = document.createElement('div');
            ReactDOM.render(
                <div className="info-window">
                    <img 
                        src={positions[i].image} 
                        alt="Image" 
                        className="info-window__image" 
                        onClick={() => navigate(`/mate/${positions[i].cateId}/restaurants/${positions[i].id}`)} 
                    />
                    <div className="info-window__content">
                        <div 
                            className="info-window__title" 
                            onClick={() => navigate(`/mate/${positions[i].cateId}/restaurants/${positions[i].id}`)}
                        >
                            {positions[i].title}
                        </div>
                        <div className="info-window__rating">
                            <div>평점: {positions[i].rating}</div>
                            <StarRating rating={positions[i].rating} />
                        </div>
                    </div>
                </div>,
                content
            );

            displayMarker(
                positions[i].latlng,
                content,
                markerImage,
                positions[i].title
            );
        }

        function displayMarker(locPosition, content, markerImage, title) {
            var marker = new kakao.maps.Marker({
                map: map,
                position: locPosition,
                image: markerImage,
                title: title,
            });

            var iwRemoveable = true;

            var infowindow = new kakao.maps.InfoWindow({
                content: content,
                removable: iwRemoveable,
            });

            kakao.maps.event.addListener(marker, "click", function () {
                infowindow.open(map, marker);
                const iwContent = document.querySelector('.info-window').parentElement.parentElement;
                iwContent.style.borderRadius = '10px';
                iwContent.style.border = '1px solid #ccc';
                iwContent.style.boxShadow = 'none';
                iwContent.style.backgroundColor = '#fff';
            });
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude,
                    lon = position.coords.longitude;

                var locPosition = new kakao.maps.LatLng(lat, lon),
                    message = '<div style="padding:5px;">여기에 계신가요?!</div>';

                displayMarker(locPosition, message);
            });
        } else {
            var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
                message = "geolocation을 사용할수 없어요..";

            displayMarker(locPosition, message);
        }

        const panTo = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var lat = position.coords.latitude,
                        lon = position.coords.longitude;
                    const moveLatLon = new window.kakao.maps.LatLng(lat, lon);
                    map.panTo(moveLatLon);
                });
            }
        };

        if (click) {
            panTo();
        }

        kakao.maps.event.addListener(map, "dragend", async function () {
            var latlng = map.getCenter();
            setGeoCenter([latlng.Ma, latlng.La]);
            const body = { lat: latlng.getLat(), lon: latlng.getLng() };
            const res = await axiosInstance.post("restaurants/location", body);
            setGeoData(res.data.restaurant);
            var message =
                "변경된 지도 중심좌표는 " + latlng.getLat() + " 이고, 경도는 " + latlng.getLng() + " 입니다";
            console.log(message);
        });
    }

    useEffect(() => {
        mapSet();
    }, [geoData, geoCenter]);

    return (
        <>
            <div id="map" style={{ width: "100%", height: "400px" }}></div>
            <div className="w-full absolute bottom-0 py-3 mainMapLayer z-10">
                <SectionWrap
                    className={"flex justify-center mainMapButton"} 
                    basicSection={true}
                >
                    <div className="w-1/2 text-white text-[20px] flex justify-center">
                        <Link
                            className="flex justify-center align-middle"
                            onClick={() => {
                                props.modalOpen(0);
                            }}
                        >
                            <i className="iconMark"></i>지역설정하기
                        </Link>
                    </div>
                    <div className="w-1/2 text-white text-[20px] flex justify-center">
                        <Link
                            className="flex justify-center align-middle"
                            onClick={() => {
                                mapSet("click");
                            }}
                        >
                            <i className="iconMap"></i>
                            현위치보기
                        </Link>
                    </div>
                </SectionWrap>
            </div>
            <style>{`
                .info-window {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding: 8px;
                    width: 300px;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    background-color: #fff;
                    box-shadow: none;
                }

                .info-window__image {
                    width: 100px;
                    height: 100px;
                    border-radius: 5px;
                    object-fit: cover;
                    margin-right: 10px;
                    cursor: pointer;
                }

                .info-window__title {
                    cursor: pointer;
                }

                .info-window__content {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .info-window__title {
                    font-size: 16px;
                    font-weight: bold;
                    margin-bottom: 4px;
                }

                .info-window__rating {
                    font-size: 14px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }

                .star-rating {
                    display: flex;
                    flex-direction: row;
                }
            `}</style>
        </>
    );
}

export default Map;
