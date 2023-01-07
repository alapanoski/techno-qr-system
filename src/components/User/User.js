import Image from "next/image";
import profilePic from "../../assets/temp_profile.jpeg";
import linkedinImage from "../../assets/linkedin.png";
import githubImage from "../../assets/github.png";
import emailImage from "../../assets/email.png";

export default function User({ user }) {
  return (
    <div className="w-full p-8 flex flex-col items-center gap-4">
      <Image
        alt="Profile Image"
        src={profilePic}
        width="200"
        height="200"
        className="w-[200px] h-[200px] object-cover rounded-full border-4 border-black"
      ></Image>
      <div className="flex flex-col justify-evenly gap-8">
        <p className="text-4xl">{user.name}</p>

        <div className="flex flex-row items-center gap-4">
          <a href={user.linkedin}>
            <Image src={linkedinImage} alt="LinkedIn" width="53" height="53" />
          </a>
          <a href={user.email}>
            <Image src={emailImage} alt="Email" width="55" height="55" />
          </a>
          <a href={user.github}>
            <Image src={githubImage} alt="GitHub" width="40" height="40" />
          </a>
        </div>
        <p className="text-3xl font-bold text-center">Points: 100</p>
      </div>
    </div>
  );
}
