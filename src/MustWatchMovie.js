import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Link } from "react-router-dom"
import { Pagination } from "swiper"
const Movie = (props) => {
 const movie = props.data
 return (
  <Swiper
   loop={true}
   pagination={true}
   modules={[Pagination]}
   className="mySwiper"
  >
   {movie.map((m, i) => {
    try {
     var photo_link = m.images.backdrops[4].file_path
    } catch (e) {
     var photo_link = m.images.backdrops[0].file_path
    }
    const photo = `https://image.tmdb.org/t/p/original${photo_link}`
    const logo_link = m.images.logos[0].file_path
    const logo = `https://image.tmdb.org/t/p/original${logo_link}`
    return (
     <SwiperSlide className="swiperslide" key={i}>
      <Link to={`/title/${m.id}/${m.title}`}>
       <div
        className="container"
        style={{
         backgroundColor: "red",
         backgroundImage: `url(
                            ${photo ? photo : "none"}
                        )`,
        }}
       >
        <img className="logo" src={logo}></img>
       </div>
      </Link>
     </SwiperSlide>
    )
   })}
  </Swiper>
 )
}
export default Movie
