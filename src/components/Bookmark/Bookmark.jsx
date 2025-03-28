import Map from "../Map/Map"

function Bookmark() {

  return (
    <div className="appLayout">
      <div className="sidebar">
        {/* <Outlet /> */}
        <div>bookmark location</div>
      </div>
      <Map markerLocation={[]} />
    </div>
  )
}

export default Bookmark