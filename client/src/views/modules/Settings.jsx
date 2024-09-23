
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useNavigate, NavLink } from "react-router-dom"
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
  const [favoriteSong, setFavoriteSong] = useState('')
  const [songInfo, setSongInfo] = useState('')
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

  useEffect(() => {

    async function getSongUrl() {
      if (userData?.favoriteSong?.videoId) {
        try {
          const response = await axios.post(`${baseUrl.localUrl}/get-stream-url`, {
            videoId: userData?.favoriteSong?.videoId
          })

          setSongInfo(response.data?.audioUrl)

        } catch (error) {
          console.error(error)
        }
      }
    }

    getSongUrl()

  }, [userData])

  async function handlePhotoChange(event) {

    const formData = new FormData()
    const userId = userData?.id
    const file = event.target.files[0]


    formData.append("file", file)
    formData.append("userId", userId)

    try {

      await axios.post(`${baseUrl.localUrl}/users/upload-photo`, formData, {
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
      await axios.post(`${baseUrl.localUrl}/users/save-settings`, payload)
      refreshUserData()
    } catch (error) {
      console.error(error)
    }

  }

  function goToSite() {
    redirect(`/goals?id=${userData?.id}`)
  }

  async function removePhoto(userId, driveId) {

    const payload = {
      userId: userId,
      driveId: driveId
    }

    try {

      await axios.post(`${baseUrl.localUrl}/users/remove-photo`, payload)
      alert('foto removida com sucesso')
      refreshUserData()

    } catch (error) {
      alert(error.message)
    }
  }

  async function searchSong() {
    try {

      const response = await axios.get(`${baseUrl.localUrl}/search-song/${userData?.id}/${favoriteSong}`)
      setSongInfo(response.data?.song)
      refreshUserData()

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="w-[85%]">
        <div className="flex justify-center m-2 text-center">
          <p className="border-2 font-semibold w-[80px] rounded-md shadow-sm">
            <NavLink to={'/'}>
              Goals 💕
            </NavLink>
          </p>
        </div>

        <div className="flex justify-start pt-5">
          <p className="font-semibold pt-2 px-2 text-xl">
            {userData?.couple?.name}
          </p>
        </div>

        <div className="mt-10 p-1 rounded-md">

          <div className="flex justify-start items-center">
            <p className="font-medium pr-2 text-xl">
              Fotos
            </p>
            <p className="font-medium text-xl w-[30px] text-center rounded-md border-2 shadow-sm bg-white">
              {userData?.photos?.length}
            </p>
          </div>

          <div className="mt-4">
            <div className="grid grid-cols-2">
              {
                userData?.photos.map((photo, index) => (
                  <div
                    key={index}
                    className="flex justify-center m-1 relative"
                  >
                    <img
                      src={photo?.directLink}
                      className="h-[260px] w-[100%] rounded-md shadow-md shadow-[#0000003a] object-cover"
                    />
                    <p
                      className="absolute p-2 px-4 rounded-sm bg-[#ffffffc7] right-2 bottom-4 shadow-md flex items-center justify-center"
                      onClick={() => removePhoto(userData?.id, photo?.driveId)}
                    >
                      <img src="/trash.svg" className="w-[25px]" />
                    </p>
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

        <div className="mt-6 border-2 py-2 rounded-md px-4 bg-white">
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

        <div className="mt-6 border-2 py-2 rounded-md px-4 bg-white">
          <p className="font-medium pr-2 text-xl">
            Música de Fundo
          </p>
          <div className="relative flex items-center mt-4 border-2 p-2 rounded-md ">
            <input
              type="text"
              value={favoriteSong}
              placeholder="Nome da Música"
              onChange={(e) => setFavoriteSong(e.target.value)}
              className="outline-none text-xl font-semibold w-[100%]"
            />
            <div
              className="p-2 border-2 shadow-sm rounded-md"
              onClick={() => searchSong()}
            >
              <img
                src="/search.svg"
                className="w-[20px]"
              />
            </div>
          </div>
          <div>
            {
              userData?.favoriteSong && (
                <div>
                  <div className="mt-2 flex items-center">
                    <div className="p-1">
                      <img
                        src={userData?.favoriteSong?.image}
                        className=" min-w-[80px] w-[80px] h-[80px] object-cover rounded-sm shadow-md"
                      />
                    </div>
                    <div className="ml-2">
                      <p className="font-semibold text-lg leading-5">
                        {userData?.favoriteSong?.title}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <audio
                      controls
                      src={songInfo}
                    >
                    </audio>
                  </div>
                </div>
              )
            }
          </div>
        </div>

        <div className="mt-4 border-2 py-2 rounded-md px-4 bg-white">
          <p className="font-medium pr-2 text-xl">
            Início do Namoro
          </p>
          <input
            type="date"
            value={userBeginAt}
            onChange={(e) => setBeginAt(e.target.value)}
            className="outline-none text-xl pt-4 font-semibold w-[100%] bg-white"
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