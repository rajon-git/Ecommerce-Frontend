import Jumbotron from "../../components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";
import { useAuth } from "../../context/auth"

const UserOrders=()=>{
    const [auth,setAuth]=useAuth();
    return(
        <>
        <Jumbotron title={`Hello ${auth?.user?.name}`} subTitle="Dasboard" />
        <div className="conatiner-fluid">
            <div className="row">
                <div className="clo-md-3">
                    <UserMenu/>
                </div>
                <div className="col-md-9">
                <div className="p-3 mt-2 mb-2 h4 bg-light">Orders</div>
                User Order History
                </div>
            </div>
        </div>
        </>
    )
}
export default UserOrders;