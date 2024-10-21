function download(title) {
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
  const detailRes = await get(apiQuery, true).then((r) => {
   return r.json()
  })
  console.log(detailRes)
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
  const get_url_main_data = url_link.map((m) => {
   return [m.path, m.quality, m.size]
  })
  var url2 = get_url_main_data
  var final_source

  const final_duplicate = url2.filter((m) => !(m[1] == "360p"))
  console.log(final_duplicate)
  const final = final_duplicate.map((m, i) => {
   final_source = {
    quality: m[1] + Math.floor(Math.random() * 10 + 1),
    url: m[0],
    key: i,
   }
   return final_source
  })
  const src = final.reverse()
  setSource(src)
 }

 reww(query)
}
download(streamTiltle)
