import React, { useState } from 'react';
import regionsData from '../../utils/regions';

function SelectDiv({props}) {
        // 서울시와 해당 구 데이터
        const [regions, setRegions] = useState(regionsData);
        const [selectedCity, setSelectedCity] = useState(["서울"]);
        const [selectedDistrict, setSelectedDistrict] = useState(null);
      
        // 도시 선택 시 해당 구 데이터 변경
        const handleCityChange = (e) => {
          setSelectedCity(e.target.value);
          setSelectedDistrict(null); // 도시가 변경되면 선택된 구 초기화
        };
      
        // 구 선택 시 상태 업데이트
        const handleDistrictChange = (e) => {
          setSelectedDistrict(e.target.value);
        };
      
    return (
        <>
        <div className="selectBox">
      <select value={selectedCity} onChange={handleCityChange}>
        {Object.keys(regions).map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      {selectedCity && (
        <select value={selectedDistrict} onChange={handleDistrictChange}>
          {regions[selectedCity].map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      )}
    </div>
      </>
    );
}

export default SelectDiv;