"use client"
import Image from "next/image"
import Link from "next/link"

const navIcons=[
  {src:"/assets/icons/search.svg",al:'search'},
  {src:"/assets/icons/black-heart.svg", alt:'heart'},
  {src:"/assets/icons/user.svg", alt:'user'},
]

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="nav">
          <Link href="/" className="flex items-center gap-1">
            <Image src="/assets/icons/logo.svg" width={27} height={27} alt="logo"/>
            <p className="nav-logo">
              Price<span className="text-primary">Wise</span>
            </p>
          </Link> 
          <div className="flex items-center gap-5">
            {
              navIcons.map((icon)=>(
                  <Image className="object-contain" key={icon.alt} src={icon.src} width={24} height={24} alt="icons"/>
              ))
            }
          </div>
      </nav>
    </header>
  )
}

export default Navbar