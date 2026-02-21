import BackgroundAnimation from "../components/BackgroundAnimation"
import { Outlet } from "react-router-dom"

const HandleLayout = () => {
  return (
    <>
        {/* Video Background */}
        <BackgroundAnimation />

        <Outlet />
    </>
  )
}

export default HandleLayout