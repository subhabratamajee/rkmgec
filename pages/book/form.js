import Head from "next/head";
import React, { useState } from "react";
import { useEffect } from "react";
// import post from '../api/book'
import { useRouter } from 'next/router'
// import Image from "next/image";
import styles from "../../styles/Bookform.module.css";

function Form() {
	const router = useRouter()
	// const contentType = 'application/json'

  const [name, setName] = useState('')
  const [roll, setRoll] = useState('')
const[email,setEmail]=useState('')
const[contact,setContact]=useState('')
const[year,setYear]=useState('')
const[book,setBook]=useState('')

	const [error, setError] = useState()
	const [message, setMessage] = useState('')
  
  const handlePost = async (e) => {
    e.preventDefault();

    // reset error and message
    setError('');
    setMessage('');

    // fields check
    if (!name || !roll || !email|| !contact|| !year || !book) return setError('All fields are required');
   
    // if (formValidate) return setError({errs});
    

    let bookreq={
      name,
      roll,
      email,
      contact,
      year,
      book,
      createdAt: new Date().toISOString(),
    };
    let response = await fetch('../api/book', {
      method: 'POST',
      // headers: {
      //   Accept: contentType,
      //   'Content-Type': contentType,
      // },
      body: JSON.stringify(bookreq),
  });

  let data = await response.json();

  if (data.success) {
    // reset the fields
    setName('');
    setRoll('');
    setEmail('');
    setContact('');
    setYear('');
    setBook('');
 
      setMessage(data.message);

    
      setTimeout(() => {
        router.push('./availablebooks')
      }, 100)
    
  
    
   
} else {
    // set the error
    return setError(data.message);
}
};
















    
  




    //   setErrors({ errs });
   
 

  // const formValidate = () => {
  //   let err = {}
  //   if (!name) err.name = 'Name is required'
  //   if (!roll) err.roll = 'Roll No is required'
  //   if (!email) err.email = 'Email is required'
  //   if (!contact) err.contact = 'Contact is required'
	// if (!year) err.year = 'Year is required'
	// if (!book) err.book = 'Book Name is required'
  //   return err
  // }
  // const errs = formValidate()
  // if (Object.keys(errs).length !=0) {
    
  //   setError({ errs })
  // }
  
  // {Object.keys(error).map((err, index) => (
  //   <li key={index}>{err}</li>
  //         ))}


  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Required Book Form</title>
      </Head>
      <div className={styles.container}>
      <div><a href="./availablebooks">abailable books</a></div>
        <div className={styles.contactForm}>
          <h2>Book Submittng</h2>
          <form onSubmit={handlePost} className={styles.form}>
 
          {error ? (
                        <div className={styles.formItem}>
                            <h3 className={styles.error}> {error}</h3>
                        </div>
                    ) : null}
                    {message ? (
                        <div className={styles.formItem}>
                            <h3 className={styles.message}>{message}</h3>
                        </div>
                    ) : null}

            Name
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            Roll_No
            <input
              type="text"
              name="roll"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
            />
            <br />
            Email
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            Contact_No
            <input
              type="text"
              name="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <br />
            Year:
            <input
              type="text"
              name="year"
              list="yearlist"
              placeholder="Select Year.." value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <datalist id="yearlist"   >
              <option value="1st year" />
              <option value="2nd year" />
              <option value="3rd year" />
              <option value="4th year" />
            </datalist>
            <br />
            Select:
            <br />
            Book Name
            <input
              type="text"
              name="bookname"
              value={book}
              onChange={(e) => setBook(e.target.value)}
            />
            <br />
           <button type="submit">Request Book</button>
            <br />
          </form>
        </div>
      </div>
    </>
  );
}

export default Form;
