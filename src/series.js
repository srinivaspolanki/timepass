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

export default function Series() {
 const [er, SetEr] = useState("")
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
 useEffect(() => {
  async function download(title) {
   var query = title
   console.log("hello")
   const nanoid = customAlphabet("0123456789abcdef", 32)
   const iv = atob("d0VpcGhUbiE=")
   const key = atob("MTIzZDZjZWRmNjI2ZHk1NDIzM2FhMXc2")
   const apiUrls = [
    atob("aHR0cHM6Ly9zaG93Ym94LnNoZWd1Lm5ldC9hcGkvYXBpX2NsaWVudC9pbmRleC8="),
    atob("aHR0cHM6Ly9tYnBhcGkuc2hlZ3UubmV0L2FwaS9hcGlfY2xpZW50L2luZGV4Lw=="),
   ]
   const appKey = atob("bW92aWVib3g=")
   const appId = atob("Y29tLnRkby5zaG93Ym94")

   const crypto = {
    encrypt(str) {
     return CryptoJS.TripleDES.encrypt(str, CryptoJS.enc.Utf8.parse(key), {
      iv: CryptoJS.enc.Utf8.parse(iv),
     }).toString()
    },
    getVerify(str, str2, str3) {
     if (str) {
      return CryptoJS.MD5(CryptoJS.MD5(str2).toString() + str3 + str).toString()
     }
     return null
    },
   }

   const expiry = () => Math.floor(Date.now() / 1000 + 60 * 60 * 12)

   const get = (data, altApi = false) => {
    const defaultData = {
     childmode: "0",
     app_version: "11.5",
     appid: appId,
     lang: "en",
     expired_date: `${expiry()}`,
     platform: "android",
     channel: "Website",
    }
    const encryptedData = crypto.encrypt(
     JSON.stringify({
      ...defaultData,
      ...data,
     })
    )
    const appKeyHash = CryptoJS.MD5(appKey).toString()
    const verify = crypto.getVerify(encryptedData, appKey, key)
    const body = JSON.stringify({
     app_key: appKeyHash,
     verify,
     encrypt_data: encryptedData,
    })
    const b64Body = btoa(body)

    const formatted = new URLSearchParams()
    formatted.append("data", b64Body)
    formatted.append("appid", "27")
    formatted.append("platform", "android")
    formatted.append("version", "129")
    formatted.append("medium", "Website")
    var CORS_PROXY_URL = `https://proxy.cors.sh/`

    const requestUrl = altApi ? apiUrls[1] : apiUrls[0]
    return fetch(`${CORS_PROXY_URL}${requestUrl}`, {
     method: "POST",
     headers: {
      "x-cors-api-key": "5655b82e-0a83-4897-be82-ca584acbbeda",
      Platform: "android",
      "Content-Type": "application/x-www-form-urlencoded",
     },
     body: `${formatted.toString()}&token${nanoid()}`,
    })
   }
   async function reww(query) {
    var apiQuery = {
     module: "Search3",
     page: "1",
     type: "all",
     keyword: query,
     pagelimit: "20",
    }
    var detailRes
    try {
     detailRes = await get(apiQuery, true).then((r) => {
      return r.json()
     })
    } catch (e) {}
    console.log(detailRes)
    const super_id = detailRes.data[0]

    const urlQuery = {
     uid: "",
     module: "TV_downloadurl_v3",
     episode: "1",
     tid: super_id.id,
     season: "1",
     oss: "1",
     group: "",
    }
    const mediaRes = (await get(urlQuery).then((r) => r.json())).data
    console.log(mediaRes)
    const url_link = mediaRes.list.filter((m) => {
     return m.path && m.quality
    })
    var final_source
    const get_url_main_data = url_link.map((m, i) => {
     final_source = {
      quality: m.real_quality,
      url: m.path,
      key: i,
     }
     return final_source
    })
    const subst = []
    setSeries([get_url_main_data, subst])
   }
   reww(query)
  }
  download(streamTiltle)
 }, [])
 useEffect(() => {
  console.log("hi")
  async function seasonDetails(streamTiltle, year) {
   const end = `https://api.themoviedb.org/3/search/tv?api_key=680db35a08bf7184a8a2c16cd0d7308e&language=en-US&page=1&query=${streamTiltle}&include_adult=false&first_air_date_year=${year}`
   const firstres = await fetch(end)
    .then((d) => d.json())
    .then((d) => d.results)
   console.log(firstres)

   const dend = `https://api.themoviedb.org/3/tv/${firstres[0].id}?api_key=680db35a08bf7184a8a2c16cd0d7308e`
   const final_reslut = await fetch(dend)
    .then((d) => d.json())
    .then((d) => d.seasons)
   console.log(final_reslut)
   setSeasonDetails(final_reslut)
  }
  seasonDetails(streamTiltle, year)
 }, [])
 async function downloadd(title, ep, sea) {
  console.log(title, ep, sea)
  var query = title
  const nanoid = customAlphabet("0123456789abcdef", 32)
  const iv = atob("d0VpcGhUbiE=")
  const key = atob("MTIzZDZjZWRmNjI2ZHk1NDIzM2FhMXc2")
  const apiUrls = [
   atob("aHR0cHM6Ly9zaG93Ym94LnNoZWd1Lm5ldC9hcGkvYXBpX2NsaWVudC9pbmRleC8="),
   atob("aHR0cHM6Ly9tYnBhcGkuc2hlZ3UubmV0L2FwaS9hcGlfY2xpZW50L2luZGV4Lw=="),
  ]
  const appKey = atob("bW92aWVib3g=")
  const appId = atob("Y29tLnRkby5zaG93Ym94")

  const crypto = {
   encrypt(str) {
    return CryptoJS.TripleDES.encrypt(str, CryptoJS.enc.Utf8.parse(key), {
     iv: CryptoJS.enc.Utf8.parse(iv),
    }).toString()
   },
   getVerify(str, str2, str3) {
    if (str) {
     return CryptoJS.MD5(CryptoJS.MD5(str2).toString() + str3 + str).toString()
    }
    return null
   },
  }

  const expiry = () => Math.floor(Date.now() / 1000 + 60 * 60 * 12)

  const get = (data, altApi = false) => {
   const defaultData = {
    childmode: "0",
    app_version: "11.5",
    appid: appId,
    lang: "en",
    expired_date: `${expiry()}`,
    platform: "android",
    channel: "Website",
   }
   const encryptedData = crypto.encrypt(
    JSON.stringify({
     ...defaultData,
     ...data,
    })
   )
   const appKeyHash = CryptoJS.MD5(appKey).toString()
   const verify = crypto.getVerify(encryptedData, appKey, key)
   const body = JSON.stringify({
    app_key: appKeyHash,
    verify,
    encrypt_data: encryptedData,
   })
   const b64Body = btoa(body)

   const formatted = new URLSearchParams()
   formatted.append("data", b64Body)
   formatted.append("appid", "27")
   formatted.append("platform", "android")
   formatted.append("version", "129")
   formatted.append("medium", "Website")
   var CORS_PROXY_URL = `https://proxy.cors.sh/`

   const requestUrl = altApi ? apiUrls[1] : apiUrls[0]
   return fetch(`${CORS_PROXY_URL}${requestUrl}`, {
    method: "POST",
    headers: {
     "x-cors-api-key": "5655b82e-0a83-4897-be82-ca584acbbeda",
     Platform: "android",
     "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `${formatted.toString()}&token${nanoid()}`,
   })
  }
  async function reww(query, ep, sea) {
   console.log(query, ep, sea)

   var apiQuery = {
    module: "Search3",
    page: "1",
    type: "all",
    keyword: query,
    pagelimit: "20",
   }
   var detailRes
   try {
    detailRes = await get(apiQuery, true).then((r) => {
     return r.json()
    })
   } catch (e) {}
   const super_id = detailRes.data[0]
   console.log("near url query")
   const urlQuery = {
    uid: "",
    module: "TV_downloadurl_v3",
    episode: ep,
    tid: super_id.id,
    season: sea,
    oss: "1",
    group: "",
   }
   console.log("ater url query")
   const mediaRes = (await get(urlQuery).then((r) => r.json())).data
   console.log(mediaRes)
   const url_link = mediaRes.list.filter((m) => {
    return m.path && m.quality
   })
   var final_source
   const get_url_main_data = url_link.map((m, i) => {
    final_source = {
     quality: m.real_quality,
     url: m.path,
     key: i,
    }
    return final_source
   })
   const subst = []
   console.log(get_url_main_data)
   setSeries([get_url_main_data, subst])
  }
  reww(query, ep, sea)
 }

 var episode_count = []
 if (ep) {
  for (let i = 1; i <= parseInt(ep[0]); i++) {
   episode_count.push(i)
  }
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
     height: "105vh",
    }}
   >
    {!series && (
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

    {Boolean(series) && (
     <div
      style={{
       width: "100%",
       height: "250px",
       marginTop: "40px",
      }}
     >
      <Player
       src={series[0]}
       subtitles={series[1]}
       poster={backdrop}
       dimensions={{ width: "100%", height: "250px", color: "white" }}
      ></Player>
     </div>
    )}

    {Boolean(series) && tag && tagline.length > 1 && (
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
    <div className="season_data">
     {series &&
      seasonDetails &&
      seasonDetails.map((s, i) => {
       var epC = s.episode_count
       if (s.season_number >= 1) {
        return (
         <div
          key={i}
          className="season_no"
          style={{
           color: "black",
           background: "white",
           padding: "10px",
           border: "none",
           marginTop: "10px",
          }}
          onClick={(e) => {
           setEp([epC, s.season_number])
          }}
         >
          season {s.season_number}
         </div>
        )
       }
      })}
    </div>
    <div
     style={{
      width: "100%",
      height: "200px",
     }}
    >
     {" "}
     {series && seasonDetails && ep && (
      <div
       style={{
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "flex-start",
        gap: "10px",

        flexWrap: "wrap",
        padding: "15px",
       }}
      >
       {episode_count.map((e, i) => {
        return (
         <span
          className="ep_no"
          style={{
           background: "red",
           textAlign: "center",
           paddingLeft: "12px",
           paddingRight: "12px",
           paddingTop: "5px",
           borderRadius: "2px",
           paddingBottom: "5px",
          }}
          onClick={(e) => {
           var episodee = i + 1
           var seasonee = ep[1]
           console.log("hi")
           downloadd(streamTiltle, episodee, seasonee)
          }}
         >
          {e}
         </span>
        )
       })}
      </div>
     )}
    </div>
    <div
     style={{
      padding: "10px",
      letterSpacing: "1px",
     }}
    >
     Plase refresh the page if u are not getting the stream while switching
     between season and episodes
    </div>
   </div>

   <Footer />
   <Exfooter />
  </>
 )
}
