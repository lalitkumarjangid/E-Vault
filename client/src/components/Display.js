import { useState } from "react";
import "./Display.css";
const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      // console.log(str);
      // console.log(str_array);
      const images = str_array.map((item, i) => {
        return (
          <a href={item} key={i} target="-blank">
            <img
              key={i}
              src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              alt="new"
              className="image-list"></img>
          </a>
        );
      });
      setData(images);
    } else {
      alert("No image to display");
    }
  };
  return (
    <>
      <div className="image-list">{data}</div>
      <input
        className=" address w-[600px] bg-gradient-to-r
         from-pink-300 to-cyan-300 border-2 m-auto mt-2 rounded-lg p-3 flex border-gray-300"
        type="text"
        placeholder="Enter your address"></input>
      <button
        className=" center button bg-gradient-to-r from-pink-500 to-cyan-400 px-4 my-6 py-2 text-white font-semibold rounded-lg hover:bg-transparent"
        onClick={getdata}>
        Get Data
      </button>
    </>
  );
};
export default Display;
