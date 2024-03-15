import Image from "next/image";
import Link from "next/link";
import logo from "/public/sc-logo.png";

export default function Footer() {
  //   const links = [
  //     { name: "Latest Articles", href: "/" },
  //     { name: "Your Reading List", href: "/readinglist" },
  //     { name: "Explore Creators", href: "/creators" },
  //     { name: "Not signed up?, Sign up", href: "/signup" },
  //     { name: "Already have an account?, Login", href: "/login" },
  //   ];

  const aboutUs = [
    { name: "Terms of Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Contact Us", href: "/contact" },
  ];

  const contactUs = [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/faqs" },
  ];

  return (
    <section className="flex md:flex-row flex-col justify-between mt-20">
      <div className="mt-10">
        <p className="flex items-end text-2xl font-bold">
          <Image src={logo} alt="me" width={40} height={40} />
          OpenKYC
        </p>
        <p className={`text-md font-medium max-w-[250px] my-2`}>
          Verify your identity effortlessly and securely with our Video KYC App
        </p>
        <p>© 2024 OpenKYC. All rights reserved.</p>
      </div>
      <div className="flex flex-wrap justify-between">
        {/* <div className="md:ml-5 mr-5 md:mr-0 mt-10">
          <p className="text-xl font-bold">Links</p>
          <ul className="text-md">
            {links.map((link, index) => (
              <li key={index} className="">
                <Link
                  href={link.href}
                  className="transition ease-in-out duration:300 hover:transition hover:ease-in-out hover:duration-300 hover:text-accent-1"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div> */}
        <div className="md:mx-5 mr-5 md:mr-0 mt-10">
          <p className="text-xl font-bold">About Us</p>
          <ul className="text-md">
            {aboutUs.map((link, index) => (
              <li key={index} className="">
                <Link
                  href={link.href}
                  className="transition ease-in-out duration:300 hover:transition hover:ease-in-out hover:duration-300 hover:text-accent-1"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:ml-5 mr-5 md:mr-0 mt-10">
          <p className="text-xl font-bold">Contact Us</p>
          <ul className="text-md">
            {contactUs.map((link, index) => (
              <li key={index} className="">
                <Link
                  href={link.href}
                  className="transition ease-in-out duration:300 hover:transition hover:ease-in-out hover:duration-300 hover:text-accent-1"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
