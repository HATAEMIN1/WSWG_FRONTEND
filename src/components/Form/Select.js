import React, { useEffect } from "react";
import $ from "jquery";

function SelectDiv({ props }) {
    useEffect(() => {
        function selectCus() {
            $(".select_cus").each(function () {
                const $select = $(this);
                const $selectTrigger = $select.find(".trigger");
                const $options = $select.find(".option");
                const $hiddenInput = $select.find(".opt_val");

                // select option 열기
                $selectTrigger.click(function () {
                    $options.toggle();
                    $select.toggleClass("active");
                    $(".select_cus").not($select).find(".option").hide();
                    $(".select_cus").not($select).removeClass("active");
                });

                // option 선택
                $options.find("li").click(function () {
                    const value = $(this).data("value");
                    const text = $(this).text();
                    $select.find(".trigger_txt").text(text);
                    $options.hide();
                    $select.removeClass("active");
                    // 옵션 선택했을 때 클래스 추가
                    if (value !== "") {
                        $select.addClass("select");
                    } else {
                        $select.removeClass("select");
                    }
                    // hidden 필드에 선택한 값을 설정
                    $hiddenInput.val(value);
                });
            });

            // select 영역 외 다른곳을 누르면 select 닫힘
            $(document).click(function (e) {
                if (!$(e.target).closest(".select_cus").length) {
                    $(".select_cus .option").hide();
                    $(".select_cus").removeClass("active");
                }
            });
        }

        selectCus();
    }, []);
    const region = [
        {
            name: "서울",
            region2: [
                {
                    name: "종로구",
                    region3: [
                        {
                            name: "종로1가",
                        },
                    ],
                },
            ],
        },
    ];

    return (
        <div className="selectbox">
            <div className="select_cus">
                <input type="hidden" className="opt_val" value="" />
                <div className="trigger">
                    <span className="trigger_txt">광역시도</span>
                </div>
                <ul className="option">
                    <li data-value="">광역시도</li>
                    {region.map((item, index) => {
                        return (
                            <li
                                key={`광역시도-${index}`}
                                data-value={item.name}
                            >
                                {item.name}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="select_cus">
                <input type="hidden" className="opt_val" value="" />
                <div className="trigger">
                    <span className="trigger_txt">시도군</span>
                </div>
                <ul className="option">
                    <li data-value="">시도군</li>
                    {region.map((item, index) => {
                        return (
                            <li key={`시도군-${index}`} data-value={item.name}>
                                {item.name}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="select_cus">
                <input type="hidden" className="opt_val" value="" />
                <div className="trigger">
                    <span className="trigger_txt">읍면동</span>
                </div>
                <ul className="option">
                    <li data-value="">읍면동</li>
                    <li data-value="option1">옵션 1번입니다.</li>
                    <li data-value="option2">옵션 2번입니다.</li>
                    <li data-value="option3">옵션 3번입니다.</li>
                    <li data-value="option4">옵션 4번입니다.</li>
                    <li data-value="option5">옵션 5번입니다.</li>
                </ul>
            </div>
        </div>
    );
}

export default SelectDiv;
