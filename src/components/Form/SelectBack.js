import React, { useEffect , useState } from 'react';
import $ from 'jquery';
function SelectOption({ options, onSelect }) {
    return (
      <ul className="option">
        {options.map((option, index) => (
          <li key={index} data-value={option.name} onClick={() => onSelect(option.name)}>
            {option.name}
          </li>
        ))}
      </ul>
    );
  }
function SelectDiv({props}) {
    const [selectedValues, setSelectedValues] = useState({ 광역시도: '', 시도군: '', 읍면동: '' });
    const handleSelect = (name, value) => {
        setSelectedValues(prevState => ({ ...prevState, [name]: value }));
    };
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
    const region1 = [
        {
            name:"서울",
            region2 : [
                {
                    region2Name:"종로구",
                    region3 : [
                        {
                            region2Name:"종로1가"
                        },
                    ]
                },
            ]

        },
        {
            name:"경기도",
            region2 : [
                {
                    region2Name:"종로구",
                    region3 : [
                        {
                            region2Name:"종로1가"
                        },
                    ]
                },
            ]

        },
    ]

    return (

    <div className="selectbox">
      {Object.keys(selectedValues).map((name, index) => (
        <div className="select_cus" key={index}>
          <input type="hidden" className="opt_val" value={selectedValues[name]} />
          <div className="trigger">
            <span className="trigger_txt">{name}</span>
          </div>
          <SelectOption options={region1.map(item => ({ name: item.name }))} onSelect={value => handleSelect(name, value)} />
        </div>
      ))}
    </div>
    );
}

export default SelectDiv;