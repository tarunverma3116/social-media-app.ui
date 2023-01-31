import React, { useEffect } from "react";
import api from "../../api/axios";
import Searched from "./components/Searched";
import { useSpinner } from "../../context/Spinner";
import { useSearchParams } from "react-router-dom";

type Props = {};

const Users = (props: Props) => {
  const spinner = useSpinner();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchUsers, setSearchUsers] = React.useState<any>([]);

  const HandleSearchUsers = async (searchtext: any) => {
    // e.preventDefault();
    // console.log(searchtext, "ye query search test hai");
    spinner.setLoadingState(true);
    if (searchtext !== "" && searchtext !== null) {
      const response = await api.get(`/users/search?keyword=${searchtext}`);
      setSearchUsers(response.data);
    } else {
      setSearchUsers([]);
    }
    // console.log("search ka results", response.data);
    spinner.setLoadingState(false);
  };

  const removeQueryParams = () => {
    const param = searchParams.get("q");
    if (param) {
      searchParams.delete("q");
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    removeQueryParams();
  }, [searchParams === null]);

  useEffect(() => {
    const param = searchParams.get("q");
    // console.log("Param to searc in api", param);
    HandleSearchUsers(param);
  }, [searchParams]);

  // useEffect(() => {
  //   HandleSearchUsers("");
  // }, []);

  return (
    <section>
      <div className="flex flex-col lg:flex-row text-white dark:text-black justify-between items-center w-full">
        <p className="text-xl font-bold mb-6">Users of Diagon Alley</p>
        <form className="form-control" onSubmit={HandleSearchUsers}>
          <div className="input-group mb-3">
            <input
              type="text"
              placeholder="Search for users"
              className="input input-bordered bg-[#1B1C2D] w-60"
              onChange={(e) => setSearchParams({ q: e.target.value })}
            />
            <button className="btn btn-square" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
      <Searched users={searchUsers} />
    </section>
  );
};

export default Users;
