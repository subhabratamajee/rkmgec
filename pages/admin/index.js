import {useRouter} from 'next/router';
import useSWR from "swr";
import React from "react";
// router = useRouter()
function Admin() {
    const router=useRouter()
  const { data } = useSWR("/api/me", async function (args) {
    const res = await fetch(args);
    return res.json();
  });
  console.log(data);
  if (!data) return <h1>Loading...</h1>;
  let loggedIn = false;
  if (data.admin == true) {
    loggedIn = true;
  }
  return (
    <>
      {loggedIn && (
        <>
          {" "}
          <h1>Welcome {data.name}!!! you are an ADMIN of RKMGEC</h1>
        </>
      )}
      {!loggedIn && (
        <>
          <h1>Sorry You're not an Admin !!!</h1>
        </>
      )}
    </>
  );
}
export default Admin;
