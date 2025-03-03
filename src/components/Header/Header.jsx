import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useState } from "react";
function Header() {
  const [destination, setDestination] = useState("");
  const [openOption, setOpenOption] = useState(false);
  const [options,setOptions] = useState({
    adult: 1,
    children: 0,
    room:1,
  });
  const handlerOptions = (name,operation) =>{
    setOptions(prev => {
      return {
        ...prev,
        [name] : operation === "inc" ? options[name] +1 : options[name] -1 
      }
    })
  }
  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="Where to go?"
            className="headerSearchInput"
            name="destination"
            id="destination"
          />
          <span className="separator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div className="dateDropDown">2023/06/25</div>
          <span className="separator"></span>
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOption(!openOption)}>
            {options.adult} adult &bull; {options.children} children &bull; {options.room} room
            {openOption && <GuestOptionList options={options} handlerOptions={handlerOptions}/>}
            <span className="separator"></span>
          </div>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn">
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOptionList({options , handlerOptions}) {
  return <div className="guestOptions">
    <OptionItem options={options} type={"adult"} minLimit={1} handlerOptions={handlerOptions}/>
    <OptionItem options={options} type={"children"} minLimit={0} handlerOptions={handlerOptions}/>
    <OptionItem options={options} type={"room"} minLimit={1} handlerOptions={handlerOptions}/>
  </div>;
}

function OptionItem({options , type , minLimit,handlerOptions}) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button onClick={()=> handlerOptions(type,"dec")} className="optionCounterBtn" disabled={options[type]<=minLimit}>
          <HiMinus />
        </button>
        <span  className="optionCounterNumber">{options[type]}</span>
        <button onClick={()=> handlerOptions(type,"inc")} className="optionCounterBtn">
          <HiPlus />
        </button>
      </div>
    </div>
  );
}
