import Navextra from "./Navextra"
import Footer from "./Footer"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { customAlphabet } from "nanoid"
import { MdError } from "react-icons/md"
import CryptoJS from "crypto-js"
import "./download.css"
import Exfooter from "./Exfooter"

const Download = () => {
 const [file, setFile] = useState("")
 const [err, SetErr] = useState("")

 const { id } = useParams()
 useEffect(() => {
  async function download(title) {
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
    } catch (e) {
     SetErr("An error accured please refersh the page!")
    }
    const super_id = detailRes.data[0].id

    const urlQuery = {
     uid: "",
     module: "Movie_downloadurl_v3",
     mid: super_id,
     oss: "1",
     group: "",
    }
    const mediaRes = (await get(urlQuery).then((r) => r.json())).data
    const url_link = mediaRes.list.filter((m) => {
     return m.path && m.quality
    })
    var final_source
    const get_url_main_data = url_link.map((m, i) => {
     final_source = {
      quality: m.real_quality,
      url: m.path,
      key: i,
      size: m.size,
     }
     return final_source
    })
    console.log(get_url_main_data)

    setFile(get_url_main_data)
   }

   reww(query)
  }
  download(id)
 }, [])

 function playVideo(path) {
  const playVideo = document.querySelector("#playVideo")
  playVideo.innerHTML = `
    <video width="320" height="240" controls>
        <source src=${path} type="video/mp4"></source>
    </video>
    `
 }
 return (
  <>
   <Navextra />

   {err && (
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
      <MdError fontSize="25px" style={{ marginBottom: "12px", color: "red" }} />
     </div>
     <div>{err}</div>
    </div>
   )}
   {!file && (
    <div
     style={{
      fontFamily: `"Staatliches", cursive`,
      fontSize: "18px",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      letterSpacing: "1PX",
      height: "50vh",
      color: "grey",
     }}
    >
     searching your files
    </div>
   )}
   {file && file.length > 0 && (
    <>
     <div
      style={{
       display: "flex",
       width: "100%",
       height: "auto",
       padding: "10px",
       paddingTop: "95px",
       boxSizing: "border-box",
       justifyContent: "space-between",
       alignItems: "center",
       flexDirection: "column",
       flexWrap: "wrap",
       gap: "17PX",
       letterSpacing: "1px",
       marginBottom: "30PX",
      }}
     >
      {file.map((m, i) => {
       var path = m.url
       return (
        <div
         key={i}
         style={{
          background: "red",
          color: "white",
          marginRight: "10px",
          textAlign: "center",
          width: "160px",
          padding: "10px",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "space-between",
          fontFamily: `"Staatliches", cursive`,
         }}
         className="downloadbox"
         onClick={() => {
          playVideo(path)
         }}
        >
         <span>{m.quality}</span>

         <span>{m.size}</span>
        </div>
       )
      })}
     </div>
     <div
      style={{
       display: "flex",
       width: "100%",
       justifyContent: "center",
       alignItems: "center",
       flexDirection: "column",
       fontFamily: `"Staatliches", cursive`,
       gap: "15px",
       letterSpacing: "1px",
      }}
     >
      <center>
       To download the movie click on the required quality u wish
      </center>
      <center>wait untill the movie is loaded</center>
      <center>
       you can download the file from the videos control (three dots : )
      </center>
     </div>

     <div
      style={{
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
       marginTop: "10px",
      }}
      id="playVideo"
     ></div>
    </>
   )}
   {file && file.length <= 0 && (
    <>
     <div
      style={{
       display: "flex",
       width: "100%",
       height: "40vh",
       alignItems: "center",
       justifyContent: "center",
       fontFamily: `"Staatliches", cursive`,
       letterSpacing: "1px",
       flexDirection: "column",
       paddingTop: "70px",
      }}
     >
      <div>
       <MdError
        fontSize="30px"
        style={{ marginBottom: "12px", color: "red" }}
       />
      </div>
      <div>The requested resource is not available </div>
     </div>
    </>
   )}
   <Footer />
   <Exfooter />
  </>
 )
}

export default Download
