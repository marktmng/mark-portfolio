import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const socials = [
  { icon: <FaGithub />, path: "https://github.com/marktmng" },
  { icon: <FaLinkedinIn />, path: "https://www.linkedin.com/in/marktmng/" },
  //   { icon: <FaYoutube />, path: "" },
  //   { icon: <FaTwitter />, path: "" },
];

const Social = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link href={item.path} key={index} passHref>
            <div className={iconStyles}>{item.icon}</div>
          </Link>
        );
      })}
    </div>
  );
};
export default Social;
