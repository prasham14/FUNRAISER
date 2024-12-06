import React from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import im1 from "./images/smilefoundaiton.jpeg"
import im2 from "./images/cry.jpeg"
import im3 from "./images/OIP (2).jpeg"
import im4 from "./images/goonj.jpeg"
import im5 from "./images/nanhikali.jpeg"
import im6 from "./images/care.jpeg"
import im7 from "./images/helpage.jpeg"
import im8 from "./images/pratham.jpeg"
import im9 from "./images/akp.jpeg"
import im10 from "./images/stc.jpeg"

const NGO = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
  }

  const links = [
    {
      id: 7,
      title: "Helpage India",
      image: im7,
      url: "https://www.helpageindia.org/"
    },
    {
      id: 8,
      title: "Pratham",
      image: im8,
      url: "https://www.pratham.org/"
    },
    {
      id: 9,
      title: "Akshaya Patra Foundation",
      image: im9,
      url: "https://www.akshayapatra.org/"
    },
    {
      id: 1,
      title: "Smile Foundaton",
      image: im1,
      url: "https://www.smilefoundationindia.org/"
    },
    {
      id: 2,
      title: "CRY (Child Rights and You)",
      image: im2,
      url: "https://www.cry.org/"
    },
    {
      id: 3,
      title: "Give India Foundation  ",
      image: im3,
      url: "https://www.giveindia.org/"
    },
    {
      id: 4,
      title: "Goonj",
      image: im4,
      url: "https://goonj.org/"
    },
    {
      id: 5,
      title: "Nanhi Kali ",
      image: im5,
      url: "https://www.nanhikali.org/"
    },
    {
      id: 6,
      title: "Care India",
      image: im6,
      url: "https://careifoundation.org/"
    },

    {
      id: 10,
      title: "	Save the Children India",
      image: im10,
      url: "https://balrakshabharat.org/"
    },
  ];


  return (
    <div className="min-h-screen bg-[#f2f1ed] py-12 px-6 lg:px-16 ">
      <button onClick={handleBack} className='
      flex items-center text-black  hover:text-[#aa4528] text-xl font-bold transition-transform transform hover:scale-110'><FaArrowLeft /></button>
      <h1 className="text-center sm:text-4xl text-2xl font-bold mt-5 text-black mb-12">
        Here are the Most Popular NGOs and Foundations in India!
      </h1>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4 ">
        {links.map((link) => (
          <div
            key={link.id}
            className="relative group bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src={link.image}
                alt={link.title}
                className="w-full  h-52 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="p-6 text-center">
                <span
                  className="text-xl font-semibold text-black hover:text-[#aa4528] transition-colors duration-300"
                >
                  {link.title}
                </span>
              </div>
            </a>
          </div>

        ))}
      </div>
    </div>

  );
};

export default NGO;
