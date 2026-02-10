import {SocialIcon} from "react-social-icons"
import { GoMail } from "react-icons/go";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 text-center">
      <p>© {new Date().getFullYear()} Job Portal</p>

      <div className="flex justify-center gap-6 mt-3">
        {/* <a
          href="https://github.com/yourgithub"
          target="_blank"
          rel="noreferrer"
          className="hover:text-white"
        >
          GitHub
        </a> */}
        <SocialIcon url="https://github.com/JAnthonySelvan" />

        {/* <a
          href="https://linkedin.com/in/yourlinkedin"
          target="_blank"
          rel="noreferrer"
          className="hover:text-white"
        >
          LinkedIn
        </a> */}

        <SocialIcon url="https://www.linkedin.com/in/anthonyselvan-j" />

        <a
          href="mailto:janthonyselvan07@gmail.com"
          className="hover:text-white"
        >
          <GoMail className="scale-[240%] mt-4 mx-3" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
