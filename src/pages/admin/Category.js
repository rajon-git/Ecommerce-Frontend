import axios from "axios";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Jumbotron from "../../components/cards/Jumbotron";
import CategoryForm from "../../components/forms/CategoryForm";
import AdminMenu from "../../components/nav/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminCategory=()=>{
    //state
    const [auth,setAuth]=useAuth();
    const [name,setName]=useState("");
    const [categories,setCategories]=useState([]);
    const [visible,setVisible]=useState(false);
    const [selected,setSelected]=useState(null);
    const [updatingName,setUpdatingName]=useState("");

    useEffect(()=>{
        loadCategories();
    },[]);
    const loadCategories=async()=>{
        try{
            const {data}=await axios.get("/categories");
            setCategories(data);
        }catch(error){
            console.log(error)
        };
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const {data}=await axios.post("/category",{name});
            if(data?.error){
                toast.error(data.error);
            }
        else{
            loadCategories();
            setName("");
            toast.success(`"${data.name}" is created`);
        }
      }catch(error){
        console.log(error);
        toast.error("Create category faied,try again");
      }
    };
    const handleUpdate=async(e)=>{
        e.preventDefault();
        try{
            const {data}=await axios.put(`/category/${selected._id}`,{
            name:updatingName});
            if(data?.error){
                toast.error(data.error)
            }else{
                toast.success(`"${data.name}" is updated`);
                setSelected(null);
                setUpdatingName("");
                loadCategories();
                setVisible(false);
            }
        }catch(error){
            console.log(error);
            toast.error("Category may already exists. Try again");
        }
    }
    const handleDelete=async(e)=>{
        e.preventDefault();
        try{
            const {data}=await axios.delete(`/category/${selected._id}`);
            if(data?.error){
                console.log(data.error);
            }else{
                toast.success(`"${data.name}" is deleted`);
                setSelected(null);
                loadCategories();
                setVisible(false);
            }
        }catch(error){
            console.log(error);
            toast.error("Category may already exist. Try again.");
        }
    }
    return(
        <>
        <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subTitle="Admin Dashboard"
       />
         <div className="container-fluid">
          <div className="row">
           <div className="col-md-3">
            <AdminMenu />
             </div>
                <div className="col-md-9">
                  <div className="p-3 mt-2 mb-2 h4 bg-light">Create Categories</div>
                  <CategoryForm
                  value={name}
                  setValue={setName}
                  handleSubmit={handleSubmit}/>

                 <hr/>

                 <div className="col">
                 {categories?.map((c) => (
                <button
                  key={c._id}
                  className="btn btn-outline-primary m-3"
                  onClick={() => {
                    setVisible(true);
                    setSelected(c);
                    setUpdatingName(c.name);
                  }}
                >
                  {c.name}
                </button>
                 ))}
                 </div>
                 <Modal 
                 visible={visible}
                 onOk={()=> setVisible(false)}
                 onCancel={()=>setVisible(false)}
                 footer={null}
                 >
                    <CategoryForm
                    value={updatingName}
                    setValue={setUpdatingName}
                    handleSubmit={handleUpdate}
                    buttonText="Update"
                    handleDelete={handleDelete}
                    ></CategoryForm>
                 </Modal>
                </div>
            </div>
         </div>

        </>
    );

} 
export default AdminCategory;