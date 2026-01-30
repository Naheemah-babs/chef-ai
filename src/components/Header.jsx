import '../styles/header.css'
import chefAILogo from "../assets/ChefIcon.png"
export default function Header(){
    return (
        <>
            <header className='header-div'>
                <img src={chefAILogo} alt="logo of the AI Chef" className='chefAi-Logo' />
                <h1>My AI Chef</h1>
            </header>
        </>
    )
}