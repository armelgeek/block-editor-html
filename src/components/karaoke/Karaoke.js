import React from "react";
import User from "../../../../User";
import Lyrics from "./Lyrics";
const lx = [
  {
    words: [
      { text: "Arise", startTime: 1.11 },
      { text: "ye", startTime: 1.33 },
      { text: "workers", startTime: 1.44 },
      { text: "from", startTime: 1.66 },
      { text: "your", startTime: 1.88 },
      { text: "slumbers", startTime: 2.11 },
    ],
  },
  {
    words: [
      { text: "Arise", startTime: 2.33 },
      { text: "ye", startTime: 2.55 },
      { text: "prisoners", startTime: 2.66 },
      { text: "of", startTime: 2.88 },
      { text: "want", startTime: 2.99 },
    ],
  },
];

const Home = () => {
  return (
    <>
      {/**<div class="ms_top_btn">
        <a href="#" class="ms_btn reg_btn">
          <span>register</span>
        </a>
        <a href="#" class="ms_btn">
          <span>2</span>
        </a>
      </div>**/}
      {/**<div class="ms_top_artist">
          <div class="container-fluid">
              <div class="row">
                  <div class="col-lg-12">
                      <div class="ms_heading">
                          <h1>Featured Playlist</h1>
                      </div>
                  </div>
                  <div class="col-lg-2 col-md-6">
                      <div class="ms_rcnt_box marger_bottom30">
                          <div class="ms_rcnt_box_img">
                              <img src="images/radio/img1.jpg" alt="" class="img-fluid">
                              <div class="ms_main_overlay">
                                  <div class="ms_box_overlay"></div>
                                  <div class="ms_play_icon">
                                      <img src="images/svg/play.svg" alt="">
                                  </div>
                              </div>
                          </div>
                          <div class="ms_rcnt_box_text">
                              <h3><a href="#">Top Trendings</a></h3>
                              <p>20 songs</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-2 col-md-6">
                      <div class="ms_rcnt_box marger_bottom30">
                          <div class="ms_rcnt_box_img">
                              <img src="images/radio/img2.jpg" alt="" class="img-fluid">
                              <div class="ms_main_overlay">
                                  <div class="ms_box_overlay"></div>
                                  <div class="ms_play_icon">
                                      <img src="images/svg/play.svg" alt="">
                                  </div>
                              </div>
                          </div>
                          <div class="ms_rcnt_box_text">
                              <h3><a href="#">New Romantic Charts</a></h3>
                              <p>20 songs</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-2 col-md-6">
                      <div class="ms_rcnt_box marger_bottom30">
                          <div class="ms_rcnt_box_img">
                              <img src="images/radio/img3.jpg" alt="" class="img-fluid">
                              <div class="ms_main_overlay">
                                  <div class="ms_box_overlay"></div>
                                  <div class="ms_play_icon">
                                      <img src="images/svg/play.svg" alt="">
                                  </div>
                              </div>
                          </div>
                          <div class="ms_rcnt_box_text">
                              <h3><a href="#">Dance Beats - Hip Hops</a></h3>
                              <p>20 songs</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-2 col-md-6">
                      <div class="ms_rcnt_box marger_bottom30">
                          <div class="ms_rcnt_box_img">
                              <img src="images/radio/img4.jpg" alt="" class="img-fluid">
                              <div class="ms_main_overlay">
                                  <div class="ms_box_overlay"></div>
                                  <div class="ms_play_icon">
                                      <img src="images/svg/play.svg" alt="">
                                  </div>
                              </div>
                          </div>
                          <div class="ms_rcnt_box_text">
                              <h3><a href="#">Workout Time</a></h3>
                              <p>20 songs</p>
                          </div>
                      </div>
                  </div> 
                  <div class="col-lg-2 col-md-6">
                      <div class="ms_rcnt_box marger_bottom30">
                          <div class="ms_rcnt_box_img">
                              <img src="images/radio/img5.jpg" alt="" class="img-fluid">
                              <div class="ms_main_overlay">
                                  <div class="ms_box_overlay"></div>
                                  <div class="ms_play_icon">
                                      <img src="images/svg/play.svg" alt="">
                                  </div>
                              </div>
                          </div>
                          <div class="ms_rcnt_box_text">
                              <h3><a href="#">Best Classics Of All Time</a></h3>
                              <p>20 songs</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-2 col-md-6">
                      <div class="ms_rcnt_box marger_bottom30">
                          <div class="ms_rcnt_box_img">
                              <img src="images/radio/img6.jpg" alt="" class="img-fluid">
                              <div class="ms_main_overlay">
                                  <div class="ms_box_overlay"></div>
                                  <div class="ms_play_icon">
                                      <img src="images/svg/play.svg" alt="">
                                  </div>
                              </div>
                          </div>
                          <div class="ms_rcnt_box_text">
                              <h3><a href="#">Heart Broken - Soul Music</a></h3>
                              <p>20 songs</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-2 col-md-6">
                      <div class="ms_rcnt_box marger_bottom30">
                          <div class="ms_rcnt_box_img">
                              <img src="images/radio/img7.jpg" alt="" class="img-fluid">
                              <div class="ms_main_overlay">
                                  <div class="ms_box_overlay"></div>
                                  <div class="ms_play_icon">
                                      <img src="images/svg/play.svg" alt="">
                                  </div>
                              </div>
                          </div>
                          <div class="ms_rcnt_box_text">
                              <h3><a href="#">International Hits</a></h3>
                              <p>20 songs</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-2 col-md-6">
                      <div class="ms_rcnt_box marger_bottom30">
                          <div class="ms_rcnt_box_img">
                              <img src="images/radio/img8.jpg" alt="" class="img-fluid">
                              <div class="ms_main_overlay">
                                  <div class="ms_box_overlay"></div>
                                  <div class="ms_play_icon">
                                      <img src="images/svg/play.svg" alt="">
                                  </div>
                              </div>
                          </div>
                          <div class="ms_rcnt_box_text">
                              <h3><a href="#">Nostalgia</a></h3>
                              <p>20 songs</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-2 col-md-6">
                      <div class="ms_rcnt_box marger_bottom30">
                          <div class="ms_rcnt_box_img">
                              <img src="images/radio/img9.jpg" alt="" class="img-fluid">
                              <div class="ms_main_overlay">
                                  <div class="ms_box_overlay"></div>
                                  <div class="ms_play_icon">
                                      <img src="images/svg/play.svg" alt="">
                                  </div>
                              </div>
                          </div>
                          <div class="ms_rcnt_box_text">
                              <h3><a href="#">Retros</a></h3>
                              <p>20 songs</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-2 col-md-6">
                      <div class="ms_rcnt_box marger_bottom30">
                          <div class="ms_rcnt_box_img">
                              <img src="images/featured/song4.jpg" alt="" class="img-fluid">
                              <div class="ms_main_overlay">
                                  <div class="ms_box_overlay"></div>
                                  <div class="ms_play_icon">
                                      <img src="images/svg/play.svg" alt="">
                                  </div>
                              </div>
                          </div>
                          <div class="ms_rcnt_box_text">
                              <h3><a href="#">Summer Season</a></h3>
                              <p>20 songs</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-2 col-md-6">
                      <div class="ms_rcnt_box marger_bottom30">
                          <div class="ms_rcnt_box_img">
                              <img src="images/radio/img10.jpg" alt="" class="img-fluid">
                              <div class="ms_main_overlay">
                                  <div class="ms_box_overlay"></div>
                                  <div class="ms_play_icon">
                                      <img src="images/svg/play.svg" alt="">
                                  </div>
                              </div>
                          </div>
                          <div class="ms_rcnt_box_text">
                              <h3><a href="#">Rock It</a></h3>
                              <p>20 songs</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-2 col-md-6">
                      <div class="ms_rcnt_box marger_bottom30">
                          <div class="ms_rcnt_box_img">
                              <img src="images/radio/img11.jpg" alt="" class="img-fluid">
                              <div class="ms_main_overlay">
                                  <div class="ms_box_overlay"></div>
                                  <div class="ms_play_icon">
                                      <img src="images/svg/play.svg" alt="">
                                  </div>
                              </div>
                          </div>
                          <div class="ms_rcnt_box_text">
                              <h3><a href="#">Top 20s Hits</a></h3>
                              <p>20 songs</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-2 col-md-6">
                      <div class="ms_rcnt_box">
                          <div class="ms_rcnt_box_img">
                              <img src="images/radio/img12.jpg" alt="" class="img-fluid">
                              <div class="ms_main_overlay">
                                  <div class="ms_box_overlay"></div>
                                  <div class="ms_play_icon">
                                      <img src="images/svg/play.svg" alt="">
                                  </div>
                              </div>
                          </div>
                          <div class="ms_rcnt_box_text">
                              <h3><a href="#">Happy Mood</a></h3>
                              <p>20 songs</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-2 col-md-6">
                      <div class="ms_rcnt_box">
                          <div class="ms_rcnt_box_img">
                              <img src="images/radio/img13.jpg" alt="" class="img-fluid">
                              <div class="ms_main_overlay">
                                  <div class="ms_box_overlay"></div>
                                  <div class="ms_play_icon">
                                      <img src="images/svg/play.svg" alt="">
                                  </div>
                              </div>
                          </div>
                          <div class="ms_rcnt_box_text">
                              <h3><a href="#">90s Best Tracks</a></h3>
                              <p>20 songs</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div className="ms_free_download ms_purchase_wrapper">
        <div className="ms_heading">
          <h1>Purchased Tracks</h1>
        </div>
        <div className="album_inner_list">
          <div className="album_list_wrapper">
            <ul className="album_list_name">
              <li>#</li>
              <li>Song Title</li>
              <li>Album</li>
              <li className="text-center">price</li>
              <li className="text-center">Duration</li>
              <li className="text-center">Add To Favourites</li>
              <li className="text-center">More</li>
              <li className="text-center">remove</li>
            </ul>
            <ul>
              <li>
                <a href="#">
                  <span className="play_no">01</span>
                  <span className="play_hover"></span>
                </a>
              </li>
              <li>
                <a href="#">Bloodlust</a>
              </li>
              <li>
                <a href="#">Dream Your Moments</a>
              </li>
              <li className="text-center">
                <a href="#">$5</a>
              </li>
              <li className="text-center">
                <a href="#">5:26</a>
              </li>
              <li className="text-center">
                <a href="#">
                  <span className="ms_icon1 ms_fav_icon"></span>
                </a>
              </li>
              <li className="text-center ms_more_icon">
                <a href="javascript:;">
                  <span className="ms_icon1 ms_active_icon"></span>
                </a>
                <ul className="more_option">
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_fav"></span>
                      </span>
                      Add To Favourites
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_queue"></span>
                      </span>
                      Add To Queue
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_dwn"></span>
                      </span>
                      Download Now
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_playlst"></span>
                      </span>
                      Add To Playlist
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_share"></span>
                      </span>
                      Share
                    </a>
                  </li>
                </ul>
              </li>
              <li className="text-center">
                <a href="#">
                  <span className="ms_close">
                    <img src="./assets/images/svg/close.svg" alt="" />
                  </span>
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="#">
                  <span className="play_no">02</span>
                  <span className="play_hover"></span>
                </a>
              </li>
              <li>
                <a href="#">Desired Games</a>
              </li>
              <li>
                <a href="#">Dream Your Moments</a>
              </li>
              <li className="text-center">
                <a href="#">$5</a>
              </li>
              <li className="text-center">
                <a href="#">5:26</a>
              </li>
              <li className="text-center">
                <a href="#">
                  <span className="ms_icon1 ms_fav_icon"></span>
                </a>
              </li>
              <li className="text-center ms_more_icon">
                <a href="javascript:;">
                  <span className="ms_icon1 ms_active_icon"></span>
                </a>
                <ul className="more_option open_option">
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_fav"></span>
                      </span>
                      Add To Favourites
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_queue"></span>
                      </span>
                      Add To Queue
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_dwn"></span>
                      </span>
                      Download Now
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_playlst"></span>
                      </span>
                      Add To Playlist
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_share"></span>
                      </span>
                      Share
                    </a>
                  </li>
                </ul>
              </li>
              <li className="text-center">
                <a href="#">
                  <span className="ms_close">
                    <img src="./assets/images/svg/close.svg" alt="" />
                  </span>
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="#">
                  <span className="play_no">03</span>
                  <span className="play_hover"></span>
                </a>
              </li>
              <li>
                <a href="#">Until I Met You</a>
              </li>
              <li>
                <a href="#">Dream Your Moments</a>
              </li>
              <li className="text-center">
                <a href="#">$5</a>
              </li>
              <li className="text-center">
                <a href="#">5:26</a>
              </li>
              <li className="text-center">
                <a href="#">
                  <span className="ms_icon1 ms_fav_icon"></span>
                </a>
              </li>
              <li className="text-center ms_more_icon">
                <a href="javascript:;">
                  <span className="ms_icon1 ms_active_icon"></span>
                </a>
                <ul className="more_option">
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_fav"></span>
                      </span>
                      Add To Favourites
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_queue"></span>
                      </span>
                      Add To Queue
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_dwn"></span>
                      </span>
                      Download Now
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_playlst"></span>
                      </span>
                      Add To Playlist
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_share"></span>
                      </span>
                      Share
                    </a>
                  </li>
                </ul>
              </li>
              <li className="text-center">
                <a href="#">
                  <span className="ms_close">
                    <img src="./assets/images/svg/close.svg" alt="" />
                  </span>
                </a>
              </li>
            </ul>
            <ul className="play_active_song">
              <li>
                <a href="#">
                  <span className="play_no">04</span>
                  <span className="play_hover"></span>
                </a>
              </li>
              <li>
                <a href="#">Dark Alley Acoustic</a>
              </li>
              <li>
                <a href="#">Dream Your Moments</a>
              </li>
              <li className="text-center">
                <a href="#">$5</a>
              </li>
              <li className="text-center">
                <a href="#">5:26</a>
              </li>
              <li className="text-center">
                <a href="#">
                  <span className="ms_icon1 ms_fav_icon"></span>
                </a>
              </li>
              <li className="text-center ms_more_icon">
                <a href="javascript:;">
                  <span className="ms_icon1 ms_active_icon"></span>
                </a>
                <ul className="more_option">
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_fav"></span>
                      </span>
                      Add To Favourites
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_queue"></span>
                      </span>
                      Add To Queue
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_dwn"></span>
                      </span>
                      Download Now
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_playlst"></span>
                      </span>
                      Add To Playlist
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_share"></span>
                      </span>
                      Share
                    </a>
                  </li>
                </ul>
              </li>
              <li className="text-center">
                <a href="#">
                  <span className="ms_close">
                    <img src="./assets/images/svg/close.svg" alt="" />
                  </span>
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="#">
                  <span className="play_no">05</span>
                  <span className="play_hover"></span>
                </a>
              </li>
              <li>
                <a href="#">Cloud nine</a>
              </li>
              <li>
                <a href="#">Dream Your Moments</a>
              </li>
              <li className="text-center">
                <a href="#">$5</a>
              </li>
              <li className="text-center">
                <a href="#">5:26</a>
              </li>
              <li className="text-center">
                <a href="#">
                  <span className="ms_icon1 ms_fav_icon"></span>
                </a>
              </li>
              <li className="text-center ms_more_icon">
                <a href="javascript:;">
                  <span className="ms_icon1 ms_active_icon"></span>
                </a>
                <ul className="more_option">
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_fav"></span>
                      </span>
                      Add To Favourites
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_queue"></span>
                      </span>
                      Add To Queue
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_dwn"></span>
                      </span>
                      Download Now
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_playlst"></span>
                      </span>
                      Add To Playlist
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_share"></span>
                      </span>
                      Share
                    </a>
                  </li>
                </ul>
              </li>
              <li className="text-center">
                <a href="#">
                  <span className="ms_close">
                    <img src="./assets/images/svg/close.svg" alt="" />
                  </span>
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="#">
                  <span className="play_no">06</span>
                  <span className="play_hover"></span>
                </a>
              </li>
              <li>
                <a href="#">Walking Promises</a>
              </li>
              <li>
                <a href="#">Dream Your Moments</a>
              </li>
              <li className="text-center">
                <a href="#">$5</a>
              </li>
              <li className="text-center">
                <a href="#">5:26</a>
              </li>
              <li className="text-center">
                <a href="#">
                  <span className="ms_icon1 ms_fav_icon"></span>
                </a>
              </li>
              <li className="text-center ms_more_icon">
                <a href="javascript:;">
                  <span className="ms_icon1 ms_active_icon"></span>
                </a>
                <ul className="more_option">
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_fav"></span>
                      </span>
                      Add To Favourites
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_queue"></span>
                      </span>
                      Add To Queue
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_dwn"></span>
                      </span>
                      Download Now
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_playlst"></span>
                      </span>
                      Add To Playlist
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_share"></span>
                      </span>
                      Share
                    </a>
                  </li>
                </ul>
              </li>
              <li className="text-center">
                <a href="#">
                  <span className="ms_close">
                    <img src="./assets/images/svg/close.svg" alt="" />
                  </span>
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="#">
                  <span className="play_no">07</span>
                  <span className="play_hover"></span>
                </a>
              </li>
              <li>
                <a href="#">Endless Things</a>
              </li>
              <li>
                <a href="#">Dream Your Moments</a>
              </li>
              <li className="text-center">
                <a href="#">$5</a>
              </li>
              <li className="text-center">
                <a href="#">5:26</a>
              </li>
              <li className="text-center">
                <a href="#">
                  <span className="ms_icon1 ms_fav_icon"></span>
                </a>
              </li>
              <li className="text-center ms_more_icon">
                <a href="javascript:;">
                  <span className="ms_icon1 ms_active_icon"></span>
                </a>
                <ul className="more_option">
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_fav"></span>
                      </span>
                      Add To Favourites
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_queue"></span>
                      </span>
                      Add To Queue
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_dwn"></span>
                      </span>
                      Download Now
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_playlst"></span>
                      </span>
                      Add To Playlist
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_share"></span>
                      </span>
                      Share
                    </a>
                  </li>
                </ul>
              </li>
              <li className="text-center">
                <a href="#">
                  <span className="ms_close">
                    <img src="./assets/images/svg/close.svg" alt="" />
                  </span>
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="#">
                  <span className="play_no">08</span>
                  <span className="play_hover"></span>
                </a>
              </li>
              <li>
                <a href="#">Gimme Some Courage</a>
              </li>
              <li>
                <a href="#">Dream Your Moments</a>
              </li>
              <li className="text-center">
                <a href="#">$5</a>
              </li>
              <li className="text-center">
                <a href="#">5:26</a>
              </li>
              <li className="text-center">
                <a href="#">
                  <span className="ms_icon1 ms_fav_icon"></span>
                </a>
              </li>
              <li className="text-center ms_more_icon">
                <a href="javascript:;">
                  <span className="ms_icon1 ms_active_icon"></span>
                </a>
                <ul className="more_option">
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_fav"></span>
                      </span>
                      Add To Favourites
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_queue"></span>
                      </span>
                      Add To Queue
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_dwn"></span>
                      </span>
                      Download Now
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_playlst"></span>
                      </span>
                      Add To Playlist
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_share"></span>
                      </span>
                      Share
                    </a>
                  </li>
                </ul>
              </li>
              <li className="text-center">
                <a href="#">
                  <span className="ms_close">
                    <img src="./assets/images/svg/close.svg" alt="" />
                  </span>
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="#">
                  <span className="play_no">09</span>
                  <span className="play_hover"></span>
                </a>
              </li>
              <li>
                <a href="#">One More Stranger</a>
              </li>
              <li>
                <a href="#">Dream Your Moments</a>
              </li>
              <li className="text-center">
                <a href="#">$5</a>
              </li>
              <li className="text-center">
                <a href="#">5:26</a>
              </li>
              <li className="text-center">
                <a href="#">
                  <span className="ms_icon1 ms_fav_icon"></span>
                </a>
              </li>
              <li className="text-center ms_more_icon">
                <a href="javascript:;">
                  <span className="ms_icon1 ms_active_icon"></span>
                </a>
                <ul className="more_option">
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_fav"></span>
                      </span>
                      Add To Favourites
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_queue"></span>
                      </span>
                      Add To Queue
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_dwn"></span>
                      </span>
                      Download Now
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_playlst"></span>
                      </span>
                      Add To Playlist
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_share"></span>
                      </span>
                      Share
                    </a>
                  </li>
                </ul>
              </li>
              <li className="text-center">
                <a href="#">
                  <span className="ms_close">
                    <img src="./assets/images/svg/close.svg" alt="" />
                  </span>
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="#">
                  <span className="play_no">10</span>
                  <span className="play_hover"></span>
                </a>
              </li>
              <li>
                <a href="#">Cloud nine</a>
              </li>
              <li>
                <a href="#">Dream Your Moments</a>
              </li>
              <li className="text-center">
                <a href="#">$5</a>
              </li>
              <li className="text-center">
                <a href="#">5:26</a>
              </li>
              <li className="text-center">
                <a href="#">
                  <span className="ms_icon1 ms_fav_icon"></span>
                </a>
              </li>
              <li className="text-center ms_more_icon">
                <a href="javascript:;">
                  <span className="ms_icon1 ms_active_icon"></span>
                </a>
                <ul className="more_option">
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_fav"></span>
                      </span>
                      Add To Favourites
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_queue"></span>
                      </span>
                      Add To Queue
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_dwn"></span>
                      </span>
                      Download Now
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_playlst"></span>
                      </span>
                      Add To Playlist
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_share"></span>
                      </span>
                      Share
                    </a>
                  </li>
                </ul>
              </li>
              <li className="text-center">
                <a href="#">
                  <span className="ms_close">
                    <img src="images/svg/close.svg" alt="" />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="ms_view_more padder_bottom20">
          <a href="#" className="ms_btn">
            view more
          </a>
        </div>
      </div>
      <div className="ms_top_artist">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="ms_heading">
                <h1>Live Stations</h1>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="ms_rcnt_box marger_bottom30">
                <div className="ms_rcnt_box_img">
                  <img
                    src="./assets/images/station/station1.jpg"
                    alt=""
                    className="img-fluid"
                  />
                  <div className="ms_main_overlay">
                    <div className="ms_box_overlay"></div>
                    <div className="ms_play_icon">
                      <img src="./assets/images/svg/play.svg" alt="" />
                    </div>
                  </div>
                  <span className="ms_frequency">fm 101</span>
                </div>
                <div className="ms_rcnt_box_text">
                  <h3>
                    <a href="#">Frequency 101</a>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="ms_rcnt_box marger_bottom30">
                <div className="ms_rcnt_box_img">
                  <img
                    src="./assets/images/station/station1.jpg"
                    alt=""
                    className="img-fluid"
                  />
                  <div className="ms_main_overlay">
                    <div className="ms_box_overlay"></div>
                    <div className="ms_play_icon">
                      <img src="./assets/images/svg/play.svg" alt="" />
                    </div>
                  </div>
                  <span className="ms_frequency">fm 102</span>
                </div>
                <div className="ms_rcnt_box_text">
                  <h3>
                    <a href="#">Frequency 102</a>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="ms_rcnt_box marger_bottom30">
                <div className="ms_rcnt_box_img">
                  <img
                    src="./assets/images/station/station1.jpg"
                    alt=""
                    className="img-fluid"
                  />
                  <div className="ms_main_overlay">
                    <div className="ms_box_overlay"></div>
                    <div className="ms_play_icon">
                      <img src="./assets/images/svg/play.svg" alt="" />
                    </div>
                  </div>
                  <span className="ms_frequency">fm 103</span>
                </div>
                <div className="ms_rcnt_box_text">
                  <h3>
                    <a href="#">Frequency 103</a>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="ms_rcnt_box marger_bottom30">
                <div className="ms_rcnt_box_img">
                  <img
                    src="./assets/images/station/station1.jpg"
                    alt=""
                    className="img-fluid"
                  />
                  <div className="ms_main_overlay">
                    <div className="ms_box_overlay"></div>
                    <div className="ms_play_icon">
                      <img src="./assets/images/svg/play.svg" alt="" />
                    </div>
                  </div>
                  <span className="ms_frequency">fm 104</span>
                </div>
                <div className="ms_rcnt_box_text">
                  <h3>
                    <a href="#">Frequency 104</a>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="ms_rcnt_box marger_bottom30">
                <div className="ms_rcnt_box_img">
                  <img
                    src="./assets/images/station/station1.jpg"
                    alt=""
                    className="img-fluid"
                  />
                  <div className="ms_main_overlay">
                    <div className="ms_box_overlay"></div>
                    <div className="ms_play_icon">
                      <img src="./assets/images/svg/play.svg" alt="" />
                    </div>
                  </div>
                  <span className="ms_frequency">fm 105</span>
                </div>
                <div className="ms_rcnt_box_text">
                  <h3>
                    <a href="#">Frequency 105</a>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="ms_rcnt_box marger_bottom30">
                <div className="ms_rcnt_box_img">
                  <img
                    src="./assets/images/station/station1.jpg"
                    alt=""
                    className="img-fluid"
                  />
                  <div className="ms_main_overlay">
                    <div className="ms_box_overlay"></div>
                    <div className="ms_play_icon">
                      <img src="./assets/images/svg/play.svg" alt="" />
                    </div>
                  </div>
                  <span className="ms_frequency">fm 106</span>
                </div>
                <div className="ms_rcnt_box_text">
                  <h3>
                    <a href="#">Frequency 106</a>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="ms_rcnt_box">
                <div className="ms_rcnt_box_img">
                  <img
                    src="./assets/images/station/station1.jpg"
                    alt=""
                    className="img-fluid"
                  />
                  <div className="ms_main_overlay">
                    <div className="ms_box_overlay"></div>
                    <div className="ms_play_icon">
                      <img src="./assets/images/svg/play.svg" alt="" />
                    </div>
                  </div>
                  <span className="ms_frequency">fm 107</span>
                </div>
                <div className="ms_rcnt_box_text">
                  <h3>
                    <a href="#">Frequency 107</a>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="ms_rcnt_box">
                <div className="ms_rcnt_box_img">
                  <img
                    src="./assets/images/station/station1.jpg"
                    alt=""
                    className="img-fluid"
                  />
                  <div className="ms_main_overlay">
                    <div className="ms_box_overlay"></div>
                    <div className="ms_play_icon">
                      <img src="./assets/images/svg/play.svg" alt="" />
                    </div>
                  </div>
                  <span className="ms_frequency">fm 108</span>
                </div>
                <div className="ms_rcnt_box_text">
                  <h3>
                    <a href="#">Frequency 108</a>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="ms_rcnt_box">
                <div className="ms_rcnt_box_img">
                  <img
                    src="./assets/images/station/station1.jpg"
                    alt=""
                    className="img-fluid"
                  />
                  <div className="ms_main_overlay">
                    <div className="ms_box_overlay"></div>
                    <div className="ms_play_icon">
                      <img src="./assets/images/svg/play.svg" alt="" />
                    </div>
                  </div>
                  <span className="ms_frequency">fm 109</span>
                </div>
                <div className="ms_rcnt_box_text">
                  <h3>
                    <a href="#">Frequency 109</a>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ms_weekly_inner">
        <div className="row">
          <div className="col-lg-12">
            <div className="ms_heading">
              <h1>Download Trending Tracks</h1>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 padding_right40">
            <div className="ms_weekly_box">
              <div className="weekly_left">
                <div className="w_top_song">
                  <div className="w_tp_song_img">
                    <img src="./assets/images/weekly/song1.jpg" alt="" />
                    <div className="ms_song_overlay"></div>
                    <div className="ms_play_icon">
                      <img src="./assets/images/svg/play.svg" alt="" />
                    </div>
                  </div>
                  <div className="w_tp_song_name">
                    <h3>
                      <a href="#">Until I Met You</a>
                    </h3>
                    <p>Ava Cornish</p>
                  </div>
                </div>
              </div>
              <div className="weekly_right">
                <span className="w_song_time">5:10</span>
                <span className="ms_more_icon" data-other="1">
                  <img src="./assets/images/svg/more.svg" alt="" />
                </span>
              </div>
              <ul className="more_option">
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_fav"></span>
                    </span>
                    Add To Favourites
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_queue"></span>
                    </span>
                    Add To Queue
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_dwn"></span>
                    </span>
                    Download Now
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_playlst"></span>
                    </span>
                    Add To Playlist
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_share"></span>
                    </span>
                    Share
                  </a>
                </li>
              </ul>
            </div>
            <div className="ms_divider"></div>
            <div className="ms_weekly_box">
              <div className="weekly_left">
                <div className="w_top_song">
                  <div className="w_tp_song_img">
                    <img src="./assets/images/weekly/song2.jpg" alt="" />
                    <div className="ms_song_overlay"></div>
                    <div className="ms_play_icon">
                      <img src="./assets/images/svg/play.svg" alt="" />
                    </div>
                  </div>
                  <div className="w_tp_song_name">
                    <h3>
                      <a href="#">Walking Promises</a>
                    </h3>
                    <p>Ava Cornish</p>
                  </div>
                </div>
              </div>
              <div className="weekly_right">
                <span className="w_song_time">5:10</span>
                <span className="ms_more_icon" data-other="1">
                  <img src="./assets/images/svg/more.svg" alt="" />
                </span>
              </div>
              <ul className="more_option">
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_fav"></span>
                    </span>
                    Add To Favourites
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_queue"></span>
                    </span>
                    Add To Queue
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_dwn"></span>
                    </span>
                    Download Now
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_playlst"></span>
                    </span>
                    Add To Playlist
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_share"></span>
                    </span>
                    Share
                  </a>
                </li>
              </ul>
            </div>
            <div className="ms_divider"></div>
            <div className="ms_weekly_box">
              <div className="weekly_left">
                <div className="w_top_song">
                  <div className="w_tp_song_img">
                    <img src="./assets/images/weekly/song3.jpg" alt="" />
                    <div className="ms_song_overlay"></div>
                    <div className="ms_play_icon">
                      <img src="./assets/images/svg/play.svg" alt="" />
                    </div>
                  </div>
                  <div className="w_tp_song_name">
                    <h3>
                      <a href="#">Gimme Some Courage</a>
                    </h3>
                    <p>Ava Cornish</p>
                  </div>
                </div>
              </div>
              <div className="weekly_right">
                <span className="w_song_time">5:10</span>
                <span className="ms_more_icon" data-other="1">
                  <img src="./assets/images/svg/more.svg" alt="" />
                </span>
              </div>
              <ul className="more_option">
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_fav"></span>
                    </span>
                    Add To Favourites
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_queue"></span>
                    </span>
                    Add To Queue
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_dwn"></span>
                    </span>
                    Download Now
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_playlst"></span>
                    </span>
                    Add To Playlist
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_share"></span>
                    </span>
                    Share
                  </a>
                </li>
              </ul>
            </div>
            <div className="ms_divider"></div>
            <div className="ms_weekly_box">
              <div className="weekly_left">
                <div className="w_top_song">
                  <div className="w_tp_song_img">
                    <img src="./assets/images/weekly/song4.jpg" alt="" />
                    <div className="ms_song_overlay"></div>
                    <div className="ms_play_icon">
                      <img src="./assets/images/svg/play.svg" alt="" />
                    </div>
                  </div>
                  <div className="w_tp_song_name">
                    <h3>
                      <a href="#">Desired Games</a>
                    </h3>
                    <p>Ava Cornish</p>
                  </div>
                </div>
              </div>
              <div className="weekly_right">
                <span className="w_song_time">5:10</span>
                <span className="ms_more_icon" data-other="1">
                  <img src="./assets/images/svg/more.svg" alt="" />
                </span>
              </div>
              <ul className="more_option">
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_fav"></span>
                    </span>
                    Add To Favourites
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_queue"></span>
                    </span>
                    Add To Queue
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_dwn"></span>
                    </span>
                    Download Now
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_playlst"></span>
                    </span>
                    Add To Playlist
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_share"></span>
                    </span>
                    Share
                  </a>
                </li>
              </ul>
            </div>
            <div className="ms_divider"></div>
            <div className="ms_weekly_box">
              <div className="weekly_left">
                <div className="w_top_song">
                  <div className="w_tp_song_img">
                    <img src="./assets/images/weekly/song5.jpg" alt="" />
                    <div className="ms_song_overlay"></div>
                    <div className="ms_play_icon">
                      <img src="./assets/images/svg/play.svg" alt="" />
                    </div>
                  </div>
                  <div className="w_tp_song_name">
                    <h3>
                      <a href="#">Dark Alley Acoustic</a>
                    </h3>
                    <p>Ava Cornish</p>
                  </div>
                </div>
              </div>
              <div className="weekly_right">
                <span className="w_song_time">5:10</span>
                <span className="ms_more_icon" data-other="1">
                  <img src="./assets/images/svg/more.svg" alt="" />
                </span>
              </div>
              <ul className="more_option">
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_fav"></span>
                    </span>
                    Add To Favourites
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_queue"></span>
                    </span>
                    Add To Queue
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_dwn"></span>
                    </span>
                    Download Now
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_playlst"></span>
                    </span>
                    Add To Playlist
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_share"></span>
                    </span>
                    Share
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 padding_right40">
            <div className="ms_weekly_box">
              <div className="weekly_left">
                <div className="w_top_song">
                  <div className="w_tp_song_img">
                    <img src="./assets/images/weekly/song6.jpg" alt="" />
                    <div className="ms_song_overlay"></div>
                    <div className="ms_play_icon">
                      <img src="./assets/images/svg/play.svg" alt="" />
                    </div>
                  </div>
                  <div className="w_tp_song_name">
                    <h3>
                      <a href="#">Walking Promises</a>
                    </h3>
                    <p>Ava Cornish</p>
                  </div>
                </div>
              </div>
              <div className="weekly_right">
                <span className="w_song_time">5:10</span>
                <span className="ms_more_icon" data-other="1">
                  <img src="./assets/images/svg/more.svg" alt="" />
                </span>
              </div>
              <ul className="more_option">
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_fav"></span>
                    </span>
                    Add To Favourites
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_queue"></span>
                    </span>
                    Add To Queue
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_dwn"></span>
                    </span>
                    Download Now
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_playlst"></span>
                    </span>
                    Add To Playlist
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_share"></span>
                    </span>
                    Share
                  </a>
                </li>
              </ul>
            </div>
            <div className="ms_divider"></div>
            <div className="ms_weekly_box">
              <div className="weekly_left">
                <div className="w_top_song">
                  <div className="w_tp_song_img">
                    <img src="./assets/images/weekly/song7.jpg" alt="" />
                    <div className="ms_song_overlay"></div>
                    <div className="ms_play_icon">
                      <img src="./assets/images/svg/play.svg" alt="" />
                    </div>
                  </div>
                  <div className="w_tp_song_name">
                    <h3>
                      <a href="#">Endless Things</a>
                    </h3>
                    <p>Ava Cornish</p>
                  </div>
                </div>
              </div>
              <div className="weekly_right">
                <span className="w_song_time">5:10</span>
                <span className="ms_more_icon" data-other="1">
                  <img src="./assets/images/svg/more.svg" alt="" />
                </span>
              </div>
              <ul className="more_option open_option">
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_fav"></span>
                    </span>
                    Add To Favourites
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_queue"></span>
                    </span>
                    Add To Queue
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_dwn"></span>
                    </span>
                    Download Now
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_playlst"></span>
                    </span>
                    Add To Playlist
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_share"></span>
                    </span>
                    Share
                  </a>
                </li>
              </ul>
            </div>
            <div className="ms_divider"></div>
            <div className="ms_weekly_box ms_active_play">
              <div className="weekly_left">
                <div className="w_top_song">
                  <div className="w_tp_song_img">
                    <img src="./assets/images/weekly/song8.jpg" alt="" />
                    <div className="ms_song_overlay"></div>
                    <div className="ms_play_icon">
                      <div className="ms_bars">
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                      </div>
                    </div>
                  </div>
                  <div className="w_tp_song_name">
                    <h3>
                      <a href="#">Dream Your Moments</a>
                    </h3>
                    <p>Ava Cornish</p>
                  </div>
                </div>
              </div>
              <div className="weekly_right">
                <span className="w_song_time">5:10</span>
                <span className="ms_more_icon" data-other="1">
                  <img src="./assets/images/svg/more.svg" alt="" />
                </span>
              </div>
              <ul className="more_option">
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_fav"></span>
                    </span>
                    Add To Favourites
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_queue"></span>
                    </span>
                    Add To Queue
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_dwn"></span>
                    </span>
                    Download Now
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_playlst"></span>
                    </span>
                    Add To Playlist
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_share"></span>
                    </span>
                    Share
                  </a>
                </li>
              </ul>
            </div>
            <div className="ms_divider"></div>
            <div className="ms_weekly_box">
              <div className="weekly_left">
                <div className="w_top_song">
                  <div className="w_tp_song_img">
                    <img src="./assets/images/weekly/song9.jpg" alt="" />
                    <div className="ms_song_overlay"></div>
                    <div className="ms_play_icon">
                      <img src="./assets/images/svg/play.svg" alt="" />
                    </div>
                  </div>
                  <div className="w_tp_song_name">
                    <h3>
                      <a href="#">Until I Met You</a>
                    </h3>
                    <p>Ava Cornish</p>
                  </div>
                </div>
              </div>
              <div className="weekly_right">
                <span className="w_song_time">5:10</span>
                <span className="ms_more_icon" data-other="1">
                  <img src="./assets/images/svg/more.svg" alt="" />
                </span>
              </div>
              <ul className="more_option">
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_fav"></span>
                    </span>
                    Add To Favourites
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_queue"></span>
                    </span>
                    Add To Queue
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_dwn"></span>
                    </span>
                    Download Now
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_playlst"></span>
                    </span>
                    Add To Playlist
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_share"></span>
                    </span>
                    Share
                  </a>
                </li>
              </ul>
            </div>
            <div className="ms_divider"></div>
            <div className="ms_weekly_box">
              <div className="weekly_left">
                <div className="w_top_song">
                  <div className="w_tp_song_img">
                    <img src="./assets/images/weekly/song5.jpg" alt="" />
                    <div className="ms_song_overlay"></div>
                    <div className="ms_play_icon">
                      <img src="./assets/images/svg/play.svg" alt="" />
                    </div>
                  </div>
                  <div className="w_tp_song_name">
                    <h3>
                      <a href="#">Gimme Some Courage</a>
                    </h3>
                    <p>Ava Cornish</p>
                  </div>
                </div>
              </div>
              <div className="weekly_right">
                <span className="w_song_time">5:10</span>
                <span className="ms_more_icon" data-other="1">
                  <img src="./assets/images/svg/more.svg" alt="" />
                </span>
              </div>
              <ul className="more_option">
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_fav"></span>
                    </span>
                    Add To Favourites
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_queue"></span>
                    </span>
                    Add To Queue
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_dwn"></span>
                    </span>
                    Download Now
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_playlst"></span>
                    </span>
                    Add To Playlist
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_share"></span>
                    </span>
                    Share
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-12 col-md-12">
            <div className="ms_weekly_box">
              <div className="weekly_left">
                <div className="w_top_song">
                  <div className="w_tp_song_img">
                    <img src="./assets/images/weekly/song2.jpg" alt="" />
                    <div className="ms_song_overlay"></div>
                    <div className="ms_play_icon">
                      <img src="./assets/images/svg/play.svg" alt="" />
                    </div>
                  </div>
                  <div className="w_tp_song_name">
                    <h3>
                      <a href="#">Dark Alley Acoustic</a>
                    </h3>
                    <p>Ava Cornish</p>
                  </div>
                </div>
              </div>
              <div className="weekly_right">
                <span className="w_song_time">5:10</span>
                <span className="ms_more_icon" data-other="1">
                  <img src="./assets/images/svg/more.svg" alt="" />
                </span>
              </div>
              <ul className="more_option">
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_fav"></span>
                    </span>
                    Add To Favourites
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_queue"></span>
                    </span>
                    Add To Queue
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_dwn"></span>
                    </span>
                    Download Now
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_playlst"></span>
                    </span>
                    Add To Playlist
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_share"></span>
                    </span>
                    Share
                  </a>
                </li>
              </ul>
            </div>
            <div className="ms_divider"></div>
            <div className="ms_weekly_box">
              <div className="weekly_left">
                <div className="w_top_song">
                  <div className="w_tp_song_img">
                    <img src="./assets/images/weekly/song11.jpg" alt="" />
                    <div className="ms_song_overlay"></div>
                    <div className="ms_play_icon">
                      <img src="./assets/images/svg/play.svg" alt="" />
                    </div>
                  </div>
                  <div className="w_tp_song_name">
                    <h3>
                      <a href="#">The Heartbeat Stops</a>
                    </h3>
                    <p>Ava Cornish</p>
                  </div>
                </div>
              </div>
              <div className="weekly_right">
                <span className="w_song_time">5:10</span>
                <span className="ms_more_icon" data-other="1">
                  <img src="./assets/images/svg/more.svg" alt="" />
                </span>
              </div>
              <ul className="more_option">
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_fav"></span>
                    </span>
                    Add To Favourites
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_queue"></span>
                    </span>
                    Add To Queue
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_dwn"></span>
                    </span>
                    Download Now
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_playlst"></span>
                    </span>
                    Add To Playlist
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_share"></span>
                    </span>
                    Share
                  </a>
                </li>
              </ul>
            </div>
            <div className="ms_divider"></div>
            <div className="ms_weekly_box">
              <div className="weekly_left">
                <div className="w_top_song">
                  <div className="w_tp_song_img">
                    <img src="./assets/images/weekly/song12.jpg" alt="" />
                    <div className="ms_song_overlay"></div>
                    <div className="ms_play_icon">
                      <img src="./assets/images/svg/play.svg" alt="" />
                    </div>
                  </div>
                  <div className="w_tp_song_name">
                    <h3>
                      <a href="#">One More Stranger</a>
                    </h3>
                    <p>Ava Cornish</p>
                  </div>
                </div>
              </div>
              <div className="weekly_right">
                <span className="w_song_time">5:10</span>
                <span className="ms_more_icon" data-other="1">
                  <img src="./assets/images/svg/more.svg" alt="" />
                </span>
              </div>
              <ul className="more_option">
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_fav"></span>
                    </span>
                    Add To Favourites
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_queue"></span>
                    </span>
                    Add To Queue
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_dwn"></span>
                    </span>
                    Download Now
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_playlst"></span>
                    </span>
                    Add To Playlist
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_share"></span>
                    </span>
                    Share
                  </a>
                </li>
              </ul>
            </div>
            <div className="ms_divider"></div>
            <div className="ms_weekly_box">
              <div className="weekly_left">
                <div className="w_top_song">
                  <div className="w_tp_song_img">
                    <img src="./assets/images/weekly/song13.jpg" alt="" />
                    <div className="ms_song_overlay"></div>
                    <div className="ms_play_icon">
                      <img src="./assets/images/svg/play.svg" alt="" />
                    </div>
                  </div>
                  <div className="w_tp_song_name">
                    <h3>
                      <a href="#">Walking Promises</a>
                    </h3>
                    <p>Ava Cornish</p>
                  </div>
                </div>
              </div>
              <div className="weekly_right">
                <span className="w_song_time">5:10</span>
                <span className="ms_more_icon" data-other="1">
                  <img src="./assets/images/svg/more.svg" alt="" />
                </span>
              </div>
              <ul className="more_option">
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_fav"></span>
                    </span>
                    Add To Favourites
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_queue"></span>
                    </span>
                    Add To Queue
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_dwn"></span>
                    </span>
                    Download Now
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_playlst"></span>
                    </span>
                    Add To Playlist
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_share"></span>
                    </span>
                    Share
                  </a>
                </li>
              </ul>
            </div>
            <div className="ms_divider"></div>
            <div className="ms_weekly_box">
              <div className="weekly_left">
                <div className="w_top_song">
                  <div className="w_tp_song_img">
                    <img src="./assets/images/weekly/song14.jpg" alt="" />
                    <div className="ms_song_overlay"></div>
                    <div className="ms_play_icon">
                      <img src="./assets/images/svg/play.svg" alt="" />
                    </div>
                  </div>
                  <div className="w_tp_song_name">
                    <h3>
                      <a href="#">Endless Things</a>
                    </h3>
                    <p>Ava Cornish</p>
                  </div>
                </div>
              </div>
              <div className="weekly_right">
                <span className="w_song_time">5:10</span>
                <span className="ms_more_icon" data-other="1">
                  <img src="./assets/images/svg/more.svg" alt="" />
                </span>
              </div>
              <ul className="more_option">
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_fav"></span>
                    </span>
                    Add To Favourites
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_queue"></span>
                    </span>
                    Add To Queue
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_dwn"></span>
                    </span>
                    Download Now
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_playlst"></span>
                    </span>
                    Add To Playlist
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="opt_icon">
                      <span className="icon icon_share"></span>
                    </span>
                    Share
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>*/}
      {/**<div>Suspendre un compte</div>
        <User />
        <Lyrics lyrics={lx}/>**/}
    </>
  );
};
export default Home;
