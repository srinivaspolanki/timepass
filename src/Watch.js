import { useLocation, useParams } from "react-router-dom"
import "./watch.css"
import CryptoJS from "crypto-js"
import { customAlphabet } from "nanoid"
import ReactHlsPlayer from "react-hls-player"
import { Player } from "react-tuby"
import "react-tuby/css/main.css"
import { MdError } from "react-icons/md"
import { useEffect, useState, useRef } from "react"
import Exfooter from "./Exfooter"
import Footer from "./Footer"
import Navextra from "./Navextra"
import styled from "styled-components"
import { set } from "lodash"
export default function Watch() {
 const [er, SetEr] = useState("")
 const [source, setSource] = useState(false)
 const [series, setSeries] = useState(false)
 const [seasonDetails, setSeasonDetails] = useState("")
 const [ep, setEp] = useState("")
 const loc = useLocation()
 var streamTiltle = loc.pathname.split("/")[3]
 var year = loc.pathname.split("/")[4]
 var back = loc.pathname.split("/")[5]
 var base_path = "https://image.tmdb.org/t/p/original/"
 var backdrop = base_path + back + ".jpg"
 try {
  var tag = true
  var tagline = loc.state.tagline
 } catch {
  var tag = false
  var tagline = ""
 }
 var series_name = streamTiltle.toString()
 useEffect(() => {
  async function flix() {
   var CORS_PROXY_URL = `https://proxy.cors.sh/`
   const watchRes = await fetch(
    `${CORS_PROXY_URL}https://api.consumet.org/movies/flixhq/${streamTiltle}`,
    {
     headers: {
      "x-cors-api-key": "5655b82e-0a83-4897-be82-ca584acbbeda",
     },
    }
   )
    .then((d) => {
     console.log(d.text())
     d.json()
    })
    .then((d) => {
     console.log("hi")
     console.log(d)
     return d
    })
    .catch()
   {
    SetEr("Currently the server is down! But u can still download the movie")
   }
   console.log(watchRes)
   const streamIdD = watchRes.results.filter((m) => {
    if (streamTiltle.toString() == m.title && year == m.releaseDate) {
     return m
    }
   })
   console.log(streamIdD)
   const streamId = streamIdD[0].id
   const streamLink = await fetch(
    `https://api.consumet.org/movies/flixhq/info?id=${streamId}`
   )
    .then((data) => data.json())
    .then((d) => d)
   const params = new URLSearchParams({
    episodeId: streamLink.episodes[0].id,
    mediaId: streamId,
   })
   var finall
   try {
    finall = await fetch(
     `${CORS_PROXY_URL}https://api.consumet.org/movies/flixhq/watch?${params.toString()}`,
     {
      headers: {
       "x-cors-api-key": "5655b82e-0a83-4897-be82-ca584acbbeda",
      },
     }
    )
     .then((d) => d.json())
     .then((d) => {
      return d
     })
   } catch (e) {
    SetEr("An error accured please refresh the page!")
   }
   var srt
   try {
    srt = finall.subtitles.filter(
     ({ lang }, i) => lang.includes("English") || lang.includes("English")
    )
    var subs = srt.map((m) => {
     var stt = {
      lang: m.lang,
      language: m.lang,
      url: m.url,
     }
     return stt
    })
   } catch (e) {}
   const final = finall.sources
   console.log(final)
   setSource([final, subs])
  }
  flix()
 }, [])

 const ref = useRef(null)
 useEffect(() => {
  ref.current?.addEventListener("timeupdate", () => {
   console.log(ref.current?.currentTime)
  })
 }, [])

 if (tagline.length < 40) {
  var Bg = styled.div`
   background: red;
  `
 } else {
  var Bg = styled.div`
   background: rgba(255, 255, 255, 0.1);
   border-radius: 5px;
   box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
   backdrop-filter: blur(0.8px);
   -webkit-backdrop-filter: blur(0.8px);
   border: 1px solid rgba(255, 255, 255, 0.11);
  `
 }

 return (
  <>
   <Navextra />
   <div
    className="movie_container"
    style={{
     display: "flex",
     width: "100%",
     justifyContent: "center",
     fontFamily: `"Staatliches", cursive`,
     flexDirection: "column",
     alignItems: "center",
     height: "60vh",
    }}
   >
    {!source && (
     <div
      className="streamInfo"
      style={{
       display: "flex",
       width: "100%",
       justifyContent: "center",
       alignItems: "center",
       letterSpacing: "1.5px",
      }}
      width="100%"
      height="100%"
     >
      Getting{" "}
      <span style={{ color: "red", margin: "0px 5px 0px 5px" }}>your </span>
      stream...
     </div>
    )}

    {Boolean(source) && (
     <>
      <Player
       src={source[0]}
       subtitles={source[1]}
       poster={backdrop}
       dimensions={{ width: "100%", height: "250pX", color: "white" }}
      >
       {(ref, props) => <ReactHlsPlayer playerRef={ref} {...props} />}
      </Player>
     </>
    )}

    {Boolean(source) && tag && tagline.length > 1 && (
     <Bg className="tagline_watch">{tagline.toString()}</Bg>
    )}

    {er && (
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
       <MdError
        fontSize="25px"
        style={{ marginBottom: "12px", color: "red" }}
       />
      </div>
      <div>{er}</div>
     </div>
    )}
   </div>

   <Footer />
   <Exfooter />
  </>
 )
}
