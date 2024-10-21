import { FaDatabase } from "react-icons/fa"
const NoData = () => {
 return (
  <div
   className="noData"
   style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    fontFamily: `"Staatliches", cursive`,
    letterSpacing: "1px",
    width: "100%",
    height: "80vh",
   }}
  >
   <div>
    <FaDatabase fontSize="25px" style={{ marginBottom: "12px" }} />
   </div>
   <div>NO DATA FOUND</div>
  </div>
 )
}

export default NoData
