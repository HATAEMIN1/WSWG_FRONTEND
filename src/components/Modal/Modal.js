import React from 'react'
import { Button, SelectButton } from '../Form/Button'

function Modal(props) {
  return (
    <div className="absolute w-full h-full bg-black bg-opacity-70 z-20">
        <div className="relative max-w-[530px] min-w-[400px] m-auto modalWrap">
            <button onClick={props.onClick} className="absolute top-[-40px] right-[0px]">
                <img src={`${process.env.PUBLIC_URL}/images/btnModalClose.svg`} />
            </button>
            {props.viewlistData[props.modalNum]}
        </div>
    </div>
  )
}
function MapModal(...props) {
  return (
    <div className="m-auto bg-white min-h-[100px] rounded-[1.25em] p-[30px]" {...props}>
          <div className="mb-3">
            <div className="flex justify-between gap-5 mb-3">
                <div className="w-full bg-[#545454] text-white rounded-full py-1 text-center">시구군</div>
                <div className="w-full bg-[#545454] text-white rounded-full py-1 text-center">읍면동</div>
            </div>
            <div className="flex justify-between gap-5">
                <div className="">
                    <label className="localButton"><input type="radio" name="radio1" id="#check_type1" /><span>강남구</span></label>
                    <label className="localButton"><input type="radio" name="radio1" id="#check_type1" /><span>서초구</span></label>
                </div>
                <div className='w-[1px] bg-slate-400'></div>
                <div>
                    <label className="localButton"><input type="radio" name="radio2" id="#check_type2" /><span>강남구</span></label>
                    <label className="localButton"><input type="radio" name="radio2" id="#check_type2" /> <span>서초구</span></label>
                </div>
            </div>
          </div>
          <Button basicButton={true}>확인</Button>    
      </div>
  )
}
function FilterModal(...props) {
    return (
      <div className="m-auto bg-white min-h-[100px] rounded-[1.25em] p-[30px]" {...props}>
          <div className="mb-3">
            <div className="flex justify-between gap-5 mb-3">
                <div className="w-full bg-[#545454] text-white rounded-full py-1 text-center">시구군</div>
                <div className="w-full bg-[#545454] text-white rounded-full py-1 text-center">읍면동</div>
            </div>
            <div className="flex justify-between gap-5">
                <ul className="flex-auto localButton">
                    <li ><label><input type="radio" name="radio1" id="#check_type1" /><span>강남구</span></label></li>
                    <li><label><input type="radio" name="radio1" id="#check_type1" /><span>서초구</span></label></li>
                    <li><label><input type="radio" name="radio1" id="#check_type1" /><span>영등포구</span></label></li>
                </ul>
                <div className='w-[1px] bg-slate-400'></div>
                <ul className="flex-auto localButton">
                    <li><label><input type="radio" name="radio2" id="#check_type1" /><span>강남구</span></label></li>
                    <li><label><input type="radio" name="radio2" id="#check_type1" /><span>서초구</span></label></li>
                </ul>
            </div>
          </div>
          <Button basicButton={true}>확인</Button>    
      </div>
    )
  }
export {Modal, MapModal ,FilterModal}