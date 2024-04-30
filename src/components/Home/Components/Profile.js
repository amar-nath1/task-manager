import { useNavigate } from "react-router-dom"

const Profile =()=>{
    const navigate = useNavigate()
    const logoutClickHandler = () => {
            localStorage.clear()
            navigate('/signin')
    }


    return (
        <div class='mt-2' 
        style={{textAlign:'right'}}>
            <button style={{ color:'white',fontSize:'larger'}} onClick={logoutClickHandler} type="button" class="btn btn-primary">Logout</button>
        </div>
    )
}

export default Profile;