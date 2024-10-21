import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { FiExternalLink } from "react-icons/fi"
import styled from "styled-components"
import "./Person.css"

import Footer from "./Footer"
import Exfooter from "./Exfooter"
import Navbar from "./Navbar"
import NoData from "./NoData"
import { min } from "lodash"
const _ = require("lodash")
export default function Person() {
 const { id } = useParams()
 function myFunction() {
  var dots = document.getElementById("dots")
  var moreText = document.getElementById("more")
  var btnText = document.getElementById("btn")
  if (dots.style.display === "none") {
   dots.style.display = "inline"
   btnText.innerHTML = "more"
   moreText.style.display = "none"
  } else {
   dots.style.display = "none"
   btnText.innerHTML = "less"
   moreText.style.display = "inline"
  }
 }
 const [personData, setPersonData] = useState("")
 const path = "https://image.tmdb.org/t/p/w300"
 const pic_path = "https://image.tmdb.org/t/p/original"
 const end = `https://api.themoviedb.org/3/person/${id}?api_key=680db35a08bf7184a8a2c16cd0d7308e&language=en-US&append_to_response=combined_credits`
 useEffect(() => {
  async function PersonDataa() {
   fetch(end)
    .then((d) => d.json())
    .then((d) => {
     setPersonData(d)
    })
  }
  PersonDataa()
 }, [])
 var order1
 var order /*for displaying in order of release year*/
 var best_of
 var in_order
 var in_best_of
 var error = true

 if (
  personData &&
  personData.known_for_department == "Acting" &&
  !personData.place_of_birth.includes("India")
 ) {
  order = personData.combined_credits.cast.filter(
   (m) =>
    (m.popularity > 20 && m.vote_count > 1000 && m.release_date) ||
    (m.vote_count > 1700 && m.release_date)
  )
  best_of = _.sortBy(order, (m) => m.release_date.split("-")[0])
 } else if (personData && personData.known_for_department == "Directing") {
  order = personData.combined_credits.crew
   .filter((m) => m.job == "Director")
   .filter((m) => {
    return (m.popularity > 20 && m.vote_count > 1000) || m.vote_count > 100
   })
  best_of = _.sortBy(order, (m) => m.release_date.split("-")[0])
 } else if (
  personData &&
  personData.known_for_department == "Acting" &&
  personData.place_of_birth.includes("India")
 ) {
  order = personData.combined_credits.cast.filter((m) => {
   return m.vote_count > 3 && m.vote_average > 3 && m.release_date
  })
  best_of = _.sortBy(order, (m) => m.release_date.split("-")[0])
 }
 if (personData.homepage) {
  var Bio = styled.div`
   padding-top: 5px;
  `
 } else {
  var Bio = styled.div`
   padding-top: 30px;
  `
 }

 var test = new Date().getFullYear()
 return (
  <>
   <Navbar />
   {personData && personData.birthday && (
    <section
     style={{
      height: "auto",
      width: "100%",
     }}
     className="person"
    >
     <section className="personal_data">
      <div style={{ height: "180px", width: "140px" }} className="person_pic">
       <img
        src={pic_path + personData.profile_path}
        style={{ borderRadius: "3px", objectFit: "cover" }}
        height="100%"
        width="100%"
       ></img>
      </div>
      <Bio className="person_bio">
       <div style={{ color: "white", fontSize: "20px" }}>{personData.name}</div>
       <div>{test - personData.birthday.split("-")[0] + "  " + "yrs"}</div>
       <div>
        {personData.known_for_department == "Directing" ? (
         <span>Director</span>
        ) : (
         <span>Actor</span>
        )}
       </div>
       <div>{personData.place_of_birth}</div>
       <div>
        {personData.homepage && (
         <a href={personData.homepage} className="website_link">
          <FiExternalLink
           color="white"
           fontSize="18px"
           style={{ marginTop: "3px" }}
          />
         </a>
        )}
       </div>
      </Bio>
     </section>
     <div
      style={{
       FontSize: "20px",
       marginLeft: "15px",
       marginTop: "12px",
       color: "red",
      }}
     >
      Biography:
     </div>
     <div className="biography">
      <span className="">{personData.biography.split(",").slice(0, 1)}</span>
      <span id="dots">...</span>
      <span id="more">
       {personData.biography.split(",").slice(1, 5).join("") + "..."}
      </span>
      <span
       id="btn"
       style={{ color: "white", fontSize: "11px" }}
       onClick={() => myFunction()}
      >
       more
      </span>
     </div>
     <div
      style={{ marginLeft: "15px", marginTop: "10px", letterSpacing: "2px" }}
     >
      BEST OF {personData.name}{" "}
      {personData.known_for_department == "Directing" ? (
       <span>AS Director</span>
      ) : (
       <span>AS Actor</span>
      )}
     </div>
     <section className="persons_movies">
      {(best_of.length > 1 &&
       best_of.map((m, i) => {
        return (
         <div className="best_of_movie" key={i}>
          <div style={{ height: "150px", weight: "100px" }}>
           <img
            src={path + m.poster_path}
            height="100%"
            width="100px"
            style={{ borderRadius: "3px" }}
           ></img>
          </div>
          {m.character && (
           <div>
            <div
             style={{
              marginTop: "5px",
              letterSpacing: "1px",
              width: "120px",
             }}
            >
             as {m.character}
            </div>
            <div style={{ marginTop: "5px", color: "grey" }}>
             {m.release_date.split("-")[0]} • {m.media_type}
            </div>
           </div>
          )}
          {!m.character && (
           <div
            style={{ marginTop: "7px", color: "white", textAlign: "center" }}
           >
            {m.release_date.split("-")[0]}
           </div>
          )}
         </div>
        )
       })) || (
       <div
        style={{
         background: "red",
         fontfamily: `'Staatliches', cursive `,
         width: "fit-content",
         margin: "0 auto",
         fontSize: "12px",
         letterSpacing: "1px",
        }}
       >
        NOTHING BEST YET
       </div>
      )}
     </section>
    </section>
   )}
   {personData && !personData.birthday && !error && <NoData />}
   {personData && <Footer />}
   {personData && <Exfooter />}
  </>
 )
}
