import "./navbar.css"
import { getLangNameFromCode } from "language-name-map"
import { StyledComponent } from "styled-components"
import { IoChevronBack } from "react-icons/io5"
import { MdClear } from "react-icons/md"
import { Link } from "react-router-dom"
const Navbar = () => {
 const logoppath = "https://image.tmdb.org/t/p/w92"
 var default_pic =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
 function searchBar() {
  const dump = document.querySelector(".search_results_section")
  if (dump.childNodes) {
   dump.innerHTML = ""
  }
  const nav_component = document.querySelector(".nav_component")
  const nav_search_component = document.querySelector(".nav_search_component")
  nav_component.classList.toggle("togglesearch")
  nav_search_component.classList.toggle("togglesearch")
 }
 async function search(title) {
  const end = `https://api.themoviedb.org/3/search/multi?api_key=680db35a08bf7184a8a2c16cd0d7308e&language=en-US&query=${title}&page=1&include_adult=false`
  const data = await fetch(end)
   .then((d) => d.json())
   .then((d) => {
    const popus = document.querySelector(".search_results_section")
    var raw = d.results.slice(0, 4).map((d) => {
     var path, year, role, type, lang, votes
     if (d.media_type == "movie") {
      if (d.poster_path === null) {
       path = default_pic
      } else {
       path = logoppath + d.poster_path
      }
      year = d.release_date?.split("-")[0]
      type = ""
      role = ""
      votes = d.vote_average
      lang = getLangNameFromCode(d.original_language).name
      var link = `/title/${d.id}/${encodeURIComponent(d.title?.toString())}`
     } else if (d.media_type == "tv") {
      if (d.poster_path === null) {
       path = default_pic
      } else {
       path = logoppath + d.poster_path
      }
      year = d.first_air_date?.split("-")[0]
      type = " • tv-show"
      role = ""
      votes = d.vote_average
      lang = getLangNameFromCode(d.original_language).name
      var share_title = d.name
      var link = `/tv/${d.id}/${encodeURIComponent(d.title?.toString())}`
     } else {
      if (d.profile_path === null) {
       path = default_pic
      } else {
       path = logoppath + d.profile_path
      }
      role = d.known_for_department
      year = ""
      type = ""
      lang = ""
      votes = ""
      var link = `/person/${d.id}`
     }

     popus.style.display = "block"
     return `<div  class="search_results_container">
     <a href=${link} style="text-decoration:none"><div class="result_box">
      <img src=${path} height="51px" width="34px"></img>
       <div> 
       <div> ${d.title || d.name} </div>
       <div style="color:grey;font-size:12px;"> ${year} ${type} ${role} </div>
       </div>
       <div style="margin-left:auto;font-size:10px;padding-right:3px">
       <div style="width:fit-content;color:red">${lang}</div>
       <div style="margin-top:2px;color:lightgrey">${votes}</div>
       </div>
      </div>
      </a>
  </div>`
    })
    popus.innerHTML = raw.join("")
   })
 }
 return (
  <>
   <nav id="nav" className="navbar">
    <ul className="nav_component">
     <li className="logo_list">
      <span id="logo" className="logo_red space">
       TIME
      </span>
      <span id="logo" style={{ margin: "2.5px" }} className="space">
       PASS
      </span>
     </li>
     <li>
      <div id="logo" style={{ fontSize: "11px" }}>
       <span
        className="active"
        style={{ marginRight: "15px", letterSpacing: "1.5px" }}
       >
        <span style={{ color: "red", letterSpacing: "1px" }}>NEW</span> RELEASES
       </span>
       <span style={{ letterSpacing: "1.5PX" }}>
        <span style={{ color: "red", letterSpacing: "1px" }}>must</span> watch
       </span>
      </div>
     </li>
     <li onClick={() => searchBar()}>
      <div id="logo ">
       <i
        className="fa fa-search"
        style={{ font_size: "24px", color: "white", marginRight: "6px" }}
       ></i>
      </div>
     </li>
    </ul>
    <ul className="nav_search_component togglesearch">
     <div className="search">
      <span>
       <IoChevronBack style={{ paddingTop: "4px" }} />
      </span>
      <input
       className="searchbar sym"
       style={{ fontSize: "12px", color: "white" }}
       placeholder="Search for movies,tv shows,actors"
       onKeyUp={(e) => {
        const query = e.target.value.toLowerCase()
        const dump = document.querySelector(".search_results_section")

        if ((e.code = "BackSpace" && e.target.value == "")) {
         dump.style.display = "none"
        } else {
         dump.style.display = "block"

         search(query)
        }
       }}
      ></input>
      <span onClick={() => searchBar()}>
       <MdClear style={{ paddingTop: "3.5px", marginLeft: "70%" }} />
      </span>
     </div>
    </ul>
    <div className="search_results_section"></div>
   </nav>
  </>
 )
}

export default Navbar
