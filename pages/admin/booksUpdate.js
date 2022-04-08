// import React from 'react'
import React, { useState,useEffect } from "react";
// import d from '../../public/bookbg'
import styles from "../../styles/Bookform.module.css";
import useSWR from "swr";
import dbConnect from "../../lib/mongodb";
import Books from "../../models/Books";
import axios from "axios";


export default function BookUpdate({books}) {
    const [search, setSearch] = useState("");
    const [user, setUser] = useState({});
    
    const [userid, setUserid] = useState('')
    useEffect(() => {
     const fetchUser = async ()=>{
       const res =await axios.get(`user/${userid}`)
       setUser(res.data)
     }
    })

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

// import User from "../../models/User";

 
  
  
    <div>
    {loggedIn &&(
      <div className={styles.body}>
      
     

        <div>
          <input className="input"
            type="text"
            placeholder="search..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <ul>
            {books
              .filter((book) => {
                if (search == "") {
                  return book;
                } else if (
                  book.book_title
                    .toLowerCase()
                    .includes(search.toLocaleLowerCase()) ||
                  book.author
                    .toLowerCase()
                    .includes(search.toLocaleLowerCase()) 
                    // ||
                  // book.contact
                  //   .toLowerCase()
                  //   .includes(search.toLocaleLowerCase())
                ) {
                  return book;
                }
                // else if(search!=book.book.toLowerCase().includes(search.toLocaleLowerCase())){
                //   return <h1>Search term not found</h1>
                // }
              })
              .map((book) => {
                return (
                  
                  book.isShow === false && (<>
                    <li key={book._id}>
                    setUserid({book.userId});
                      <div>
                        <h2>Book Name : {book.book_title}</h2>
                        <h4>Name : {book.author}</h4>
                        <p>Contact No : {book.contact}</p>
                        <hr />
                      </div>
                    </li>
                  </>
                  )
                );
              })}
          </ul>
        </div>
      </div>
      )}
        {!loggedIn && (
        <>
          <h1>Sorry You're not an Admin !!!</h1>
        </>
      )}
      <style jsx>{`
        h1 {
          color: blue;
        }
        h2 {
          color: blueviolet;
        }
        h3 {
          color: green;
        }
        h1 {
          font-style: oblique;
        }
        h2 {
          font-style: initial;
        }
        h3 {
          font-style: italic;
          font-size: 25px;
        }
        h4 {
          color: red;
        }
        p {
          color: green;
        }
        li {
          diaplay: inline-block;
          list-style: none;
        }
      `}</style>
    </div>
  );
}





export async function getServerSideProps(params) {
    const { db } = await dbConnect();
    const books = await Books.find({}).lean();
    // const user = await User.findById(params.userId).lean();
    // pet._id = pet._id.toString()
    // const books = await db
    //   .collection("books")
    //   .find({})
    //   .sort({ metacritic: -1 })
    //   .limit(20)
    //   .toArray();
  
    return {
      props: {
        books: JSON.parse(JSON.stringify(books)),
        // user: JSON.parse(JSON.stringify(user)),
      },
    };
  }