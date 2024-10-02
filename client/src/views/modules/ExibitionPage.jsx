/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import baseUrl from "../../utils/baseUrl"
import LazyLoad from 'react-lazyload'
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"

export default function ExibitionPage({
  visible,
  setActiveScreen,
}) {

  const [coupleHistory, setCoupleHistory] = useState()
  const [userData, setUserData] = useState('')
  const [userId, setUserId] = useState('')
  const [songUrl, setSongUrl] = useState('')
  const redirect = useNavigate()

  useEffect(() => {

    const url = window.location.search
    const urlParams = new URLSearchParams(url)

    setUserId(urlParams.get('id'))

    async function getUserData() {
      if (url.includes('?id')) {
        try {
          const response = await axios.get(`${baseUrl.productionUrlFIX}/users/get-user-by-id/${urlParams.get('id')}`, {
            headers: {
              "ngrok-skip-browser-warning": "true"
            }
          })

          setUserData(response.data.user)

        } catch (error) {
          console.error(error)
          redirect('/')
        }
      }
    }

    getUserData()

  }, [])

  useEffect(() => {

    async function getSongMP3() {
      if (userData?.favoriteSong?.videoId) {
        try {
          const response = await axios.post(
            `${baseUrl.productionUrlFIX}/get-stream-mp3`,
            {
              videoId: userData?.favoriteSong?.videoId
            },
            {
              headers: {
                "Access-Control-Allow-Origin": "*"
              },
              responseType: 'blob'
            })

          const audioUrl = URL.createObjectURL(response.data)
          setSongUrl(audioUrl)

        } catch (error) {
          console.error(error)
        }
      }
    }

    getSongMP3()

  }, [userData])

  useEffect(() => {
    async function calculateTogheterTime(timestamp) {

      timestamp = userData?.beginAt

      const [yy, mm, dd] = timestamp.split('-').map(Number)
      const formattedDate = new Date(yy, mm - 1, dd)
      const currentDate = new Date()

      const msDiff = currentDate - formattedDate

      const oneDay = 24 * 60 * 60 * 1000
      const dayDiff = Math.floor(msDiff / oneDay)
      const years = Math.floor(dayDiff / 365)
      const months = Math.floor((dayDiff % 365) / 30)
      const days = dayDiff % 30

      setCoupleHistory(`${years} Anos, ${months} Meses, ${days} Dias`)

      return coupleHistory
    }

    calculateTogheterTime()
  })

  return (

    <div className="flex justify-center items-center bg-white">
      <div className="text-center w-[95%]">

        <p className="mt-6">
          Feito com
          <NavLink to={'/'}>
            <b className="font-semibold"> Goals 💕</b>
          </NavLink>

        </p>

        <div className="pt-12">
          <p className="font-medium pt-2">
            {userData?.couple?.name}
          </p>
        </div>
        <h1 className="text-5xl italic font-bold py-8">
          {`${userData?.description}`}
        </h1>
        <h2 className="font-semibold text-gray-500 text-center px-12 mb-6">
          {`${userData?.message}`}
        </h2>

        <div>
          {
            userData?.favoriteSong && (
              <div>
                <div className="flex justify-center mt-4 mb-4">
                  <div className="border-2  w-[180px] rounded-md px-2 shadow-lg flex justify-center items-center">
                    <img src="/music-icon.png" className="w-[14px]" alt="" />
                    <p
                      className="ml-2 whitespace-nowrap text-sm overflow-hidden text-ellipsis font-semibold"
                      onClick={() => document.querySelector('audio').play()}
                    >
                      {userData?.favoriteSong?.title}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <audio
                    autoPlay
                    loop
                    src={songUrl}
                  >
                  </audio>
                </div>
              </div>
            )
          }
        </div>

        <p className="text-lg font-medium">Juntos á</p>
        <p className="font-bold italic text-xl">{coupleHistory}</p>

        <div className="mt-[50%] p-4 relative">

          {
            userData?.photos?.length <= 0 && (
              <div className="flex justify-center items-center">
                <p className="border-2 px-2 w-[160px] rounded-md bg-gray-100">Sem fotos ainda</p>
              </div>
            )
          }


          {
            userData?.photos?.map((photo, index) => (
              <LazyLoad once>
                <img
                  key={index}
                  className={`absolute shadow-lg shadow-[#000000b3] rounded-md transition-all duration-300 ease-in-out w-[50%] hover:scale-[1.2] hover:z-[9999] ${index === 0 ? 'top-[-120px] left-[40%]' :
                    index === 1 ? 'top-[-55px] left-[0%] h-[260px] object-cover' :
                      index === 2 ? 'top-[40px] left-[50%]' :
                        index === 3 ? 'top-[195px] left-[15%]' :
                          'top-[180px] left-[45%] h-[180px] object-cover'
                    }`}
                  src={`${photo.directLink}`}
                >
                </img>
              </LazyLoad>
            ))
          }

        </div>

        {
          localStorage.getItem('userId') === userId && (
            <div className="mt-6 absolute top-0 left-[20px]">
              <button
                className="px-2 py-1 rounded-md shadow-sm text-md border-2 cursor-pointer"
                onClick={() => redirect('/home?settings')}
              >
                Voltar
              </button>
            </div>
          )
        }

      </div>
    </div>


  )
}