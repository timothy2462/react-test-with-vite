import React, { useCallback, useEffect, useState } from "react";
import logout from "../logout1.png"
import ellipse from "../elli.png"
import MkdSDK from "../utils/MkdSDK";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import DraggableTableRow from "./DraggableTableRow";
import { useNavigate } from "react-router-dom";
import { ref } from "yup";
import { showToast } from "../globalContext";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AuthContext } from "../authContext";

const AdminDashboardPage = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(1);
  const { dispatch} = React.useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const getVideos = async () => {
      let sdk = new MkdSDK();
      try {
        const res = await sdk.callRestAPI({
          payload: {},
          page: count, 
          limit: 10
        }, 'PAGINATE');
        // const jss = await res.json();
        // console.log(jss);
        console.log(res);
        setVideos(res.list);

      } catch (error) {
        
      }
    }
    
    getVideos();
  }, [])

  const moveItem = (dragIndex, hoverIndex) => {
    const draggedItem = videos[dragIndex];
    setVideos((prevItems) => {
      const newItems = [...prevItems];
      const [dragRow] = newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, dragRow);
      console.log(newItems);
      return newItems.map((item) => ({ ...item}));
    });
  };

  

  const logoutFunc = () => {
    showToast(dispatch, "Logged out");
          dispatch({
            type: "LOGOUT",
            payload: {
              
            },
          });
          navigate('/admin/login');
          localStorage.removeItem("token");
  }
  
  return (
    <DndProvider backend={HTML5Backend}>
    <div className="bg-black ">
      <nav className="w-[100%] bg-black h-[96px] flex justify-between items-center">
        <h1 className=" font-black text-5xl text-white">APP</h1>
        <button className=" px-[24px] py-[12px] rounded-[40px] bg-[#9BFF00] w-[128px]" alt="logout">
          <img src={logout} alt="" onClick={logoutFunc}/>
        </button>
      </nav>
      <div className="w-[100%] bg-black h-[88px] flex justify-between items-center">
        <p className="text-white font-thin text-4xl">Today’s leaderboard</p>
        <div className="bg-[#1D1D1D] text-white h-[56px] flex items-center pl-[24px] pr-[41px] rounded-xl">
          <p className=" font-thin text-base">30 May 2022</p>
          <img src={ellipse} alt="ellipse" className="ml-[8px] mr-[16px] "/>
          <button className="rounded-[8px] bg-[#9BFF00] py-[4px] px-[10px] text-black text-sm font-thin " alt="submissions">Submissions OPEN</button>
          <img src={ellipse} alt="ellipse" className="ml-[13px] mr-[16px] "/>
          <p className=" font-thin text-base">11:34</p>
        </div>
      </div>
      <main>
        
                <table className="w-full md:table-fixed" >
                  <thead>
                    
                    <tr>
                      <th className="text-gray-500 text-sm font-normal leading-[18px] px-6 py-6 gap-3 text-left flex items-center">
                        <div className="flex gap-9">#  <p className="pl-[2rem]">Title</p></div>
                      </th>
                      {['Author', 'Most Liked'].map((item, index) => (
                        <th
                          className={`text-gray-500 ${
                            index === 0 ? 'table-cell' : 'hidden md:table-cell'
                          } text-sm font-normal leading-[18px] px-3 py-6 gap-3`}
                          key={item}
                        >
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  {videos.length == 0 ? (
                    <p>Loading...</p>
                  ) : (

                  <tbody className="">
                    {videos?.map((video, index) => (
                      <DraggableTableRow id={video.id} video={video} index={index} moveItem={moveItem}/>
                     ))}
                  </tbody>
                  )}
                </table>
                {/* <SuperAdminPagination
                  currentPage={currentPage}
                  totalPages={data.total_pages}
                  setCurrentPage={setCurrentPage}
                /> */} 
                <div className="m-auto w-fit">
                  <button className="bg-white mr-[2rem] p-2 border-none cursor-pointer" onClick={async () =>  {
                          let sdk = new MkdSDK();
                          setCount(count -1);
                    const res = await sdk.callRestAPI({
                      payload: {},
                      page: count, 
                      limit: 10
                    }, 'PAGINATE');
                    console.log(res);
                    setVideos(res.list);
                  }}>PREV</button>
                  <button className="bg-white mr-[2rem] p-2 border-none cursor-pointer" onClick={
                    async () => {
                      let sdk = new MkdSDK();
                      setCount(count + 1)
                      const res = await sdk.callRestAPI({
                        payload: {},
                        page: count, 
                        limit: 10
                      }, 'PAGINATE');
                      console.log(res);
                      setVideos(res.list);
                    }
                  }>NEXT</button>
                </div>
      </main>
    </div>
    </DndProvider>
  );
};

export default AdminDashboardPage;
