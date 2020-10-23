import { withIronSession } from "next-iron-session";

const VALID_EMAIL = "petersen.fanny@gmail.com" || "jorgedelacruz@gmail.com";
const VALID_PASSWORD = "opensesamecodenoobs";
const application_secret = "RexLrd0MVeeieap9EeNl6MxtYu4kViuA"

export default withIronSession(
  async (req, res) => {
    if (req.method === "POST") {
      const { email, password } = req.body;

      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        req.session.set("user", { email });
        await req.session.save();
        return res.status(201).send("");
      }

      return res.status(403).send("");
    }

    return res.status(404).send("");
  },
  {
    cookieName: "MYSITECOOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false
    },
    password: application_secret /* process.env.APPLICATION_SECRET */
  }
);