import styled from "styled-components"
import "./exfooter.css"
import { FaPaperPlane } from "react-icons/fa"
const Footer = styled.section`
 font-family: "Staatliches", cursive;
 position: "relative";
`

export default function Exfooter() {
 return (
  <>
   <Footer>
    <div
     className="footer-backdrop"
     style={{
      backgroundImage: `url('https://image.tmdb.org/t/p/original/zywtNiaZ9r7azrcNdl2j0jOgrkw.jpg')`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      height: "200px",
      filter: "grayscale(50%)",
      margin: "10px",
      outline: "none",
      backgroundRepeat: "no-repeat",
      borderRadius: "3px",
     }}
    >
     <div className="cine">
      {" "}
      <h1 style={{ letterSpacing: "5px", fontSize: "40px" }}>
       recommend a movie
      </h1>
      <input
       className="mail"
       type="text"
       placeholder="SUGGEST A WORTH WATCHING MOVIE !"
      ></input>
      <div className="plane">
       {" "}
       <FaPaperPlane style={{ fontSize: "20px" }} />{" "}
      </div>
     </div>
    </div>
    <div className="foot-name" style={{ marginTop: "35px" }}>
     <span className="foot-time">TIME</span>
     <span className="foot-pass">PASS</span>
     <div style={{ marginTop: "10px" }}> &#169; 2022</div>
    </div>
    <div
     style={{
      fontFamily: "sans-serif",
      padding: "20px",
     }}
    >
     <span style={{ color: "red" }}>Disclamer:</span>
     <span>
      No responsibility on the hoster, no databases or api's hosted by us, just
      a static site developed as a fun project will be taken down soon
     </span>
    </div>
   </Footer>
  </>
 )
}
