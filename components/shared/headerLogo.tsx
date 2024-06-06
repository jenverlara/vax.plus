import Image from "next/image";
import Link from "next/link";

const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="hidden items-center lg:flex">
        <Image
          src="/vaxplus_logo.png"
          height={100}
          width={100}
          alt="logo"
          priority
        />
        <p className="ml-2.5 text-2xl font-semibold text-white">Vaxplus</p>
      </div>
    </Link>
  );
};

export default HeaderLogo;
