
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import baseUrl from "../../utils/baseUrl"
import axios from 'axios'


export default function Settings({
  visible,
  setActiveScreen,
  userData,
  refreshUserData
}) {

  const [userMessage, setMessage] = useState('')
  const [userBeginAt, setBeginAt] = useState('')
  const redirect = useNavigate()

  useEffect(() => {
    function checkLogged() {
      if (localStorage.getItem('userLogged') !== 'true') {
        redirect('/')
      }
    }

    checkLogged()
  }, [])

  useEffect(() => {
    setMessage(userData?.description)
    setBeginAt(userData?.beginAt)
  }, [userData?.beginAt, userData?.description])

  async function handlePhotoChange(event) {

    const formData = new FormData()
    const userId = userData?.id
    const file = event.target.files[0]


    formData.append("file", file)
    formData.append("userId", userId)

    try {

      await axios.post(`${baseUrl.productionUrl}/users/upload-photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })

      refreshUserData()

    } catch (error) {
      console.error(error)
    }


  }

  async function saveUserSettings() {

    const payload = {
      userId: userData?.id,
      newMessage: userMessage,
      newBeginAt: userBeginAt
    }

    try {
      await axios.post(`${baseUrl.productionUrl}/users/save-settings`, payload)
      refreshUserData()
    } catch (error) {
      console.error(error)
    }

  }

  function goToSite() {
    redirect(`/goals?id=${userData?.id}`)
  }

  return (
    <>

      <div className="w-[95%]">
        <h1 className="text-black text-center">Goals 💕</h1>

        <div className="flex justify-start pt-10">
          <div className="flex justify-center items-center relative right-[5px]">
            <img
              src={`${baseUrl.profielPicPrefix}${userData?.couple?.persons[0].profilePic}`}
              className="bg-gray-500 w-[40px] h-[40px] rounded-full relative left-[15px] shadow-xl"
            />
            <img
              src={`${baseUrl.profielPicPrefix}${userData?.couple?.persons[1].profilePic}`}
              className="bg-gray-500 w-[40px] h-[40px] rounded-full shadow-xl"
            />
          </div>
          <p className="font-medium pt-2 px-2 text-xl">
            {`${userData?.couple?.persons[0].name} & ${userData?.couple?.persons[1].name}`}
          </p>
        </div>

        <div className="mt-10 border-2 p-1 rounded-md">

          <div className="flex justify-start items-center">
            <p className="font-medium pr-2 text-xl">
              Fotos
            </p>
            <p className="font-medium text-xl w-[30px] text-center rounded-md border-2 shadow-sm">
              {userData?.photos?.length}
            </p>
          </div>

          <div className="mt-4">
            <div className="grid grid-cols-2">
              {
                userData?.photos.map((photo, index) => (
                  <div
                    key={index}
                    className="flex justify-center m-1"
                  >
                    <img
                      src={photo?.directLink}
                      className="h-[260px] w-[100%] rounded-md shadow-lg shadow-[#00000014] object-cover"
                    />
                  </div>
                ))
              }

              {
                userData?.photos.length < 5 && (
                  <div
                    className="h-[260px] w-[100%] m-2 border-dashed border-slate-500 border-2 rounded-md flex justify-center items-center relative"
                  >
                    <p className="text-6xl text-slate-500">+</p>
                    <input
                      type="file"
                      name="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handlePhotoChange}
                    />
                  </div>
                )
              }

            </div>

          </div>

        </div>

        <div className="mt-6 border-2 p-1 rounded-md px-4">
          <p className="font-medium pr-2 text-xl">
            Mensagem Principal
          </p>
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setMessage(e.target.value)}
            className="outline-none text-4xl pt-4 font-semibold w-[100%]"
          />
        </div>

        <div className="mt-4 border-2 p-1 rounded-md px-4">
          <p className="font-medium pr-2 text-xl">
            Início do Namoro
          </p>
          <input
            type="date"
            value={userBeginAt}
            onChange={(e) => setBeginAt(e.target.value)}
            className="outline-none text-xl pt-4 font-semibold w-[100%]"
          />
        </div>

        <div className="mt-10">
          <button
            className="py-3 w-[100%] rounded-sm text-[#EA2DA0] border-[#EA2DA0] border-2 font-medium text-xl"
            onClick={() => saveUserSettings()}
          >
            Salvar Alterações
          </button>

          <button
            className="mt-4 py-3 w-[100%] rounded-sm bg-[#EA2DA0] text-white font-medium text-xl"
            onClick={() => goToSite()}
          >
            Ver Site
          </button>

        </div>


      </div>

    </>
  )
}