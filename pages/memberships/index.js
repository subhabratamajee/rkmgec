import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';
import Router from 'next/router';
import Link from 'next/link';
import cookie from 'js-cookie';

function Home() {
  const {data, revalidate} = useSWR('/api/me', async function(args) {
    const res = await fetch(args);
    return res.json();
  });
  if (!data) return <h1>Loading...</h1>;
  let loggedIn = false;
  if (data.email) {
    loggedIn = true;
  }
  return (
    <div>
      <Head>
        <title>Welcome to landing page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="body">
            <h1>Simplest login</h1>

      <h2>welcome to rkmgec</h2>
      {loggedIn && (
        <>
          <p>Welcome {data.email}!</p>
          <button className='button'
            onClick={() => {
              cookie.remove('token');
              // revalidate();
              Router.push('/memberships/login');
            }}>
            Logout
          </button>
        </>
      )}
      {!loggedIn && (
        <>
         <button className='button'><Link  href="memberships/login">Login</Link></button>
          <p>or</p>
          <button className='button'><Link  href="memberships/signup">Sign Up</Link></button>
        </>
      )}
    </div>
    </div>
  );
}

export default Home;