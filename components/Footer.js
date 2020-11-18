import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer>2020 Copyright © The Code Noobs</footer>
      {/*<Link href={`/login`}>
      <p className={utilStyles.login}>You one of the codenoobs? <a>{"Login here."}</a></p>
  </Link>*/}
      
      <style jsx>{`
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .logo {
          height: 1em;
          margin: 5px;
        }
      `}</style>
    </>
  );
}
