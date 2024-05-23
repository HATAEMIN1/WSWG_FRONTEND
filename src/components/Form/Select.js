import React, { useState } from "react";
import regionsData from "../../utils/regions";
import { Button } from "./Button";

function SelectDiv({ onFilters }) {
    // 서울시와 해당 구 데이터
    const [regions, setRegions] = useState(regionsData);
    const [selectedCity, setSelectedCity] = useState("서울특별시");
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    // 도시 선택 시 해당 구 데이터 변경
    const handleCityChange = (e) => {
        const city = e.target.value;
        setSelectedCity(city);
        setSelectedDistrict(null); // 도시가 변경되면 선택된 구 초기화
        // onFilters({ metropolitan: city, city: "" });
    };
    // 구 선택 시 상태 업데이트
    const handleDistrictChange = (e) => {
        const district = e.target.value;
        setSelectedDistrict(district);
        // onFilters({ metropolitan: selectedCity, city: district });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onFilters({ metropolitan: selectedCity, city: selectedDistrict });
    };
    return (
        <>
            <form className="flex gap-3" onSubmit={handleSubmit}>
                <div className="selectBox">
                    <select value={selectedCity} onChange={handleCityChange}>
                        {Object.keys(regions).map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                    {selectedCity && (
                        <select
                            value={selectedDistrict}
                            onChange={handleDistrictChange}
                        >
                            {regions[selectedCity].map((district) => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <Button basicButton={true} className={"max-w-[100px]"}>
                    지역선택
                </Button>
            </form>
        </>
    );
}

export default SelectDiv;
