import { useEffect, useState } from "react"
import baseUrl from "../../utils/baseUrl"

export default function ExibitionPage({
  visible,
  setActiveScreen,
  userData
}) {

  const [coupleHistory, setCoupleHistory] = useState()

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
    <div className="text-center w-[85%]">
      <div className="pt-8">
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
            <img
              key={photo.driveId}
              className={`absolute shadow-lg shadow-[#000000b3] rounded-md transition-all duration-300 ease-in-out w-[50%] hover:scale-[1.2] hover:z-[9999] ${
                index === 0 ? 'top-[-120px] left-[40%]' :
                index === 1 ? 'top-[-55px] left-[0%] h-[260px] object-cover' :
                index === 2 ? 'top-[40px] left-[50%]' :
                index === 3 ? 'top-[195px] left-[15%]' :
                'top-[180px] left-[45%] h-[180px] object-cover'
              }`}
              src={`${photo.directLink}`}
            >
            </img>
          ))
        }

      </div>

    </div>
  )
}