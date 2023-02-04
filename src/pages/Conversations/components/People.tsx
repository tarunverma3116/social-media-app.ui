import useGetFollowing from "hooks/mutations/account/useGetFollowing";
import React from "react";
import { useSpinner } from "../../../context/Spinner";

type Props = {};

const People = (props: Props) => {
  const [searchParams, setSearchParams] = React.useState<any>({ q: "" });
  const [users, setUsers] = React.useState<any>([]);
  const spinner = useSpinner();

  const HandleFetchPeople = async () => {
    spinner.setLoadingState(true);
    const response = await useGetFollowing();
    console.log("people", response.data);
    setUsers(response.data);
    spinner.setLoadingState(false);
  };

  const HandleSearchUsers = async (e: any) => {
    e.preventDefault();
    spinner.setLoadingState(true); // const response = await useSearchUsers(searchParams);
    // console.log("searched users", response);
    // setUsers(response.data);
    // setLoading(false);
    spinner.setLoadingState(false);
  };

  React.useEffect(() => {
    HandleFetchPeople();
  }, []);

  return (
    <div className="w-full people-card flex flex-col gap-2 p-2 text-white dark:text-black">
      <form className="form-control" onSubmit={HandleSearchUsers}>
        <div className="input-group mb-3">
          <input
            type="text"
            placeholder="Search for users"
            className="input input-bordered bg-transparent w-full border border-slate-700"
            onChange={(e) => setSearchParams({ q: e.target.value })}
          />
          <button className="btn btn-square bg-transparent" type="button">
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
      <div className="flex flex-col">
        {users?.map((user: any) => {
          return (
            <div className="flex flex-row gap-3 items-center py-3 px-1 border-t border-slate-800 hover:bg-slate-800 cursor-pointer">
              <div className="flex flex-col">
                <img
                  src={`https://pixelpark-images.s3.amazonaws.com/${user.profileImage}`}
                  className="rounded-xl w-10 h-10"
                  alt="profile"
                />
              </div>
              <div className="flex flex-col justify-between">
                <p className="text-white">{user.userName}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default People;
