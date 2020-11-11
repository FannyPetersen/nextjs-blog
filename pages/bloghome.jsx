import React, { useRef } from "react";
import { withIronSession } from "next-iron-session";
import { useRouter } from "next/router";
import { newPost } from "../lib/addPost";

const BlogHomePage = ({ user }) => {

  const router = useRouter();
  const titleInput = useRef();
  //const bodyInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = titleInput.current.value;
    //const body = bodyInput.current.value;


    newPost(title, title, title, [], title, title);
    /*
    LOGIC TO CREATE NEW POST
    const response = await fetch("./api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });

    if (response.ok) {
      return router.push("/published");
    }
    */

  };



  return (
    <div>
    <div>
    <h1>Hello {user.email}</h1>
    <p>Publish a new post to Code Noobs below!</p>
  </div>

    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Title: <input type="text" ref={titleInput} />
        </label>
      </div>
      {/*<div>
        <label>
          Body: <input type="text" ref={bodyInput} />
        </label>
      </div>*/}
      <div>
        <button type="submit">Publish</button>
      </div>
    </form>
    </div>
  );

  };




export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    const user = req.session.get("user");

    if (!user) {
      res.statusCode = 404;
      res.end();
      return { props: {} };
    }

    return {
      props: { user }
    };
  },
  {
    cookieName: "MYSITECOOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false
    },
    password: "RexLrd0MVeeieap9EeNl6MxtYu4kViuA" /* process.env.APPLICATION_SECRET */
  }
);

export default BlogHomePage;


