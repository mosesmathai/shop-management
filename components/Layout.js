import { useSession, signIn} from "next-auth/react"
import Nav from "@/components/Nav"
import { useState } from "react"
import Logo from "./Logo";



export default function Layout({children}) {

  const [showNav,setShowNav] = useState(false);
  const { data: session } = useSession();

  if(!session) {
    return (
      <section className="purple-settings-main shadow">
        <button className="primary-button" onClick={() => signIn('google')}>Login with Google</button>
      </section>
    )
  }
  return (
    <div className="bg-black min-h-screen">
     <div className="flex md:hidden text-white">
        <button 
          className="ml-2"
          type="button"
          onClick={() => setShowNav(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <div className="flex grow justify-center mr-4 mt-2">
          <Logo />
        </div>
     </div>
      <main className="flex">
        <div className="flex flex-col">
          <Nav show={showNav} />  
        </div>
        <div className="bg-white flex-grow m-2 rounded-md p-4">{children}</div>
      </main>
    </div>
  )

}