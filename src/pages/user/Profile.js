import Jumbotron from "../../components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";
import { useAuth } from "../../context/auth"

const UserProfile=()=>{
    const [auth,setAuth]=useAuth();
    return(
        <>
        <Jumbotron title={`Hello ${auth?.user?.name}`} subTitle="Dashboard"/>
        <div className="container-floid">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                <div  className="col-md-9">
                    <div className="p-3 mt-2 mb-2 h4 bg-light">Profile</div>
                    Update Profile...
                </div>
            </div>
        </div>
        </>
    )
}
export default UserProfile;