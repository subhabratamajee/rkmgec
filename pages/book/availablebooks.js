import React from 'react'
// import d from '../../public/bookbg'
import styles from '../../styles/Bookform.module.css'
import {connectToDatabase} from '../../lib/mongodb'
function Availablebooks({books}) {
  return (<div>
    <div className={styles.body}>
        <h1 align="center"> RAMKRISHNA MAHATO GOVERNMENT ENGINEERING COLLEGE</h1>
        <h2 align="center">WELCOME TO OUR LIBRARY!</h2>
        <h3 align="center">A BOOK IS A DREAM THAT YOU HOLD IN YOUR HAND</h3>

<div>
<ul>
        {books.map((book,i) => (
          <li key={i}>
            <h2>Book Name : {book.book}</h2>
            <h4>Name : {book.name}</h4>
            <p>Contact No : {book.contact}</p>
            <hr />
          </li>
        ))}
        
      </ul>
</div>


        </div>
        <style jsx>{`
        h1 {
    color: blue;
}
h2 {
    color: blueviolet;
}
h3 {
    color:green;
}
h1 {
    font-style: oblique;
}
h2{
    font-style: initial;
}
h3{
    font-style: italic;
    font-size: 25px;
}
h4{
    color:red;
}
p{color:green;}
li{
    list-style:none;
}

        `}</style>
    </div>
  )
}
export default Availablebooks



export async function getServerSideProps() {
    const { db } = await connectToDatabase();
  
    const books = await db
      .collection("book")
      .find({})
      .sort({ metacritic: -1 })
      .limit(20)
      .toArray();
  
    return {
      props: {
        books: JSON.parse(JSON.stringify(books)),
      },
    };
  }