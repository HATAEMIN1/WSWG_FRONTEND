import React, { useEffect, useState } from 'react';
import $ from 'jquery';

function SelectDiv({props}) {
    useEffect(() => {
        function selectCus() {
            $('.select_cus').each(function() {
                const $select = $(this);
                const $selectTrigger = $select.find('.trigger');
                const $options = $select.find('.option');
                const $hiddenInput = $select.find('.opt_val');

                // select option 열기
                $selectTrigger.click(function() {
                    $options.toggle();
                    $select.toggleClass('active');
                    $('.select_cus').not($select).find('.option').hide();
                    $('.select_cus').not($select).removeClass('active');
                });

                // option 선택
                $options.find('li').click(function() {
                    const value = $(this).data('value');
                    const text = $(this).text();
                    $select.find('.trigger_txt').text(text);
                    $options.hide();
                    $select.removeClass('active');
                    // 옵션 선택했을 때 클래스 추가
                    if (value !== '') {
                        $select.addClass('select');
                    } else {
                        $select.removeClass('select');
                    }
                    // hidden 필드에 선택한 값을 설정
                    $hiddenInput.val(value);
                });
            });

            // select 영역 외 다른곳을 누르면 select 닫힘
            $(document).click(function(e) {
                if (!$(e.target).closest('.select_cus').length) {
                    $('.select_cus .option').hide();
                    $('.select_cus').removeClass('active');
                }
            });
        }

        selectCus();
    }, []);
    // function regionChange(index){
    //     setRegion2(index);
    // }
    // const region = [
    //     {
    //         key: '1',
    //         name:"서울",
    //     },
    //     {
    //         key: '2',
    //         name:"경기도",
    //     },
    // ]
    // const [region2, setRegion2] = useState([
    //     {
    //         key: '1',
    //         name:"서울",
    //         detail : [
    //             {
    //                 name:"종로구",
    //             },
    //             {
    //                 name:"중구",
    //             },
    //         ]
    //     },
    //     {
    //         key: '2',
    //         name:"경기도",
    //         detail : [
    //             {
    //                 name:"종로구",
    //             },
    //             {
    //                 name:"중구",
    //             },
    //         ]
    //     }
    // ]);
        // 서울시와 해당 구 데이터
        const [regions, setRegions] = useState(
        {
          서울: [
            "강남", "강동", "강북", "강서", "관악", "광진", "구로", "금천", "노원", "도봉",
            "동대문", "동작", "마포", "서대문", "서초", "성동", "성북", "송파", "양천", "영등포",
            "용산", "은평", "종로", "중구", "중랑"
          ],
          부천: [
            "역곡", "강동", "강북", "강서", "관악", "광진", "구로", "금천", "노원", "도봉",
            "동대문", "동작", "마포", "서대문", "서초", "성동", "성북", "송파", "양천", "영등포",
            "용산", "은평", "종로", "중구", "중랑"
          ],
        }
        );
        const [selectedCity, setSelectedCity] = useState(null);
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
        // <div className="selectbox">
        //     <div className="select_cus">
        //         <input type="hidden" className="opt_val" value="" />
        //         <div className="trigger">
        //             <span className="trigger_txt">광역시도</span>
        //         </div>
        //         <ul className="option">
        //             <li data-value="">광역시도</li>
        //             {region.map((item, index) => {
        //                 return (
        //                     <li key={index} data-value={item.name} onClick={()=>{regionChange()}}>{item.name}</li>
        //                 )
        //             })}
        //         </ul>
        //     </div>
        //     <div className="select_cus">
        //         <input type="hidden" className="opt_val" value="" />
        //         <div className="trigger">
        //             <span className="trigger_txt">시도군</span>
        //         </div>
        //         <ul className="option">
        //             <li data-value="">시도군</li>
        //             {region2.map((item, index) => {
        //                 return (
        //                     <li key={index} data-value={item.name}>{item.name}</li>
        //                 )
        //             })}
        //         </ul>
        //     </div>
        // </div>
        <>
        <div className="selectbox">
            <div className="select_cus">
                <input type="hidden" className="opt_val" value="" />
                <div className="trigger">
                    <span className="trigger_txt">광역시도</span>
                </div>
                <ul className="option" value={selectedCity} onChange={handleCityChange}>
                    <li data-value="">광역시도</li>
                    {Object.keys(regions).map((city) => (
                        <li key={city} value={city}>
                        {city}
                        </li>
                    ))}
                </ul>
            </div>
            {selectedCity && (
          <ul value={selectedDistrict} onChange={handleDistrictChange}>
            {regions[selectedCity].map((district) => (
              <li key={district} value={district}>
                {district}
              </li>
            ))}
          </ul>
        )}
        </div>
        
        {/* <div>
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
        )} */}
      {/* </div> */}
      </>
    );
}

export default SelectDiv;