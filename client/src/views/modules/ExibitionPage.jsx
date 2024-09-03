/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import baseUrl from "../../utils/baseUrl"
import LazyLoad from 'react-lazyload'
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function ExibitionPage({
  visible,
  setActiveScreen,
}) {

  const [coupleHistory, setCoupleHistory] = useState()
  const [userData, setUserData] = useState('')
  const redirect = useNavigate()

  useEffect(() => {

    const url = window.location.search
    const urlParams = new URLSearchParams(url)

    async function getUserData() {
      if (url.includes('?id')) {
        try {
          const response = await axios.get(`${baseUrl.productionUrl}/users/get-user-by-id/${urlParams.get('id')}`, {
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

      setCoupleHistory(`${years}a, ${months}m,${days}d`)

      return coupleHistory
    }

    calculateTogheterTime()
  })

  return (

    <div className="flex justify-center items-center bg-white">
      <div className="text-center w-[95%]">

        <p className="mt-6">Feito com <b className="font-semibold">Goals 💕</b></p>

        <div className="pt-12">
          <div className="flex justify-center items-center relative right-[5px]">
            <img
              src={`${baseUrl.profielPicPrefix}${userData?.couple?.persons[0].profilePic}`}
              className="bg-gray-500 w-[60px] h-[60px] rounded-full relative left-[15px] shadow-xl"
            />
            <img
              src={`${baseUrl.profielPicPrefix}${userData?.couple?.persons[1].profilePic}`}
              className="bg-gray-500 w-[60px] h-[60px] rounded-full shadow-xl"
            />
          </div>
          <p className="font-medium pt-2">
            {`${userData?.couple?.persons[0].name} & ${userData?.couple?.persons[1].name}`}
          </p>
        </div>
        <h1 className="text-5xl italic font-bold py-8">
          {`${userData?.description}`}
        </h1>
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
          localStorage.getItem('userLogged') && (
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