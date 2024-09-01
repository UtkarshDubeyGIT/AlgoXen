import MLIntegration from "../ML config/mainc"
import Navbar from "./Navbar";
import DashBoard from "./SideHome"
const Home = ()=>{
    return(
        <div>
        <Navbar/>
        <div className="flex w-screen h-screen justify-center items-center bg-[url('https://res.cloudinary.com/dmnjig3al/image/upload/v1725171376/xrqwzb7tt5dmsrnychts.jpg')] bg-cover">
            <DashBoard className = "w-2/6"/>
            <MLIntegration className = "w-4/6"/>
        </div>
        </div>
    )
}

export default Home;