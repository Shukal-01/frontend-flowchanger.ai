import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import CustomDialog from "./DialougeBox";
import { MdOutlineDone } from "react-icons/md";
import { useGlobalContext } from "../../../Context/GlobalContext";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { label } from "framer-motion/client";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


const AddNewClient = () => {
  const animatedComponents = makeAnimated();
  const { baseUrl, openToast } = useGlobalContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function handleCloseForm() {
    navigate("/clients")
  }
  const navigate = useNavigate();


  const [defaultLanguages, setDefaultLanguages] = useState(["portuguese", "German", "indonesia", "catlan", "Spanish", "Turkish", "Slovak", "Vitnamese", "Swedish", "Portguese_br", "ukrainian", "polish"])
  const [toggleCurrencyDropdown, setToggleCurrencyDropDown] = useState(false);

  const handleToggleCurrencyDropDown = () => {
    setToggleCurrencyDropDown(!toggleCurrencyDropdown)
  }

  const [selectAll, setSelectAll] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);

  const groups = [
    'ASTROPITAH SMM PROJECT',
    'digital',
    'HONEY TOUR & TRAVELS',
    'vevge',
    'webs'
  ]

  const handleGroupSelection = (selectAll) => {
    if (selectAll) {
      setSelectedGroups(groups);//select all group
      setSelectAll(true);
    }
    else {
      setSelectedGroups([]); //deselect all group
      setSelectAll(false);
    }
  };
  const toggleGroupSelection = (group) => {
    setSelectedGroups((prevSelected) =>
      prevSelected.includes(group)
        ? prevSelected.filter(g => g !== group)
        : [...prevSelected, group]
    );
  };
  

  const [clientName, setClientName] = useState("");
  const [company, setCompany] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [currency, setCurrency] = useState([]);
  const [language, setLanguage] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");


  const handleSubmit = async (e) => {
    console.log("Selected Groups:", selectedGroups);
    e.preventDefault();
    const result = await fetch(baseUrl + "client", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ name: clientName, company: company, vat_number: vatNumber, phone: phone, website: website, address: address, country: country, state: state, city: city, zip_code: zipCode, default_language: language, groups: selectedGroups, currency: currency, email: email })
    })
    console.log(result)
    const data = await result.json();
    if (result.status == 201) {
      openToast(data.msg || "Add Client Successfully", "success")
      navigate("/clients");
    }
    else {
      openToast(data.error || "An Error occured", "error")
    }
  }


  return (
    <div className=" flex justify-center items-center min-h-screen ">

      <div className="w-full max-w-3xl mt-[20px] ml-[20px] mr-[20px] xl:ml-[0] xl:mr-[0] bg-white shadow-cs border border-gray-100 rounded-lg p-[20px]">
        {/* <Link to = "/clients"><FaArrowLeft /></Link> */}
        <div className="mb-6">
          {/* <!-- Tabs for form sections --> */}
          <nav className="flex space-x-4 border-b pb-[10px] ">
            <a href="#" className=" py-2 hover:border-b-1 hover:border-[#27004a] text-[13px] xl:text-[14px] font-medium">Customer Details</a>
            <a href="#" className="text-gray-600 py-2 text-[13px] font-medium xl:text-[14px] hover:border-b-1 hover:border-[#27004a]">Billing & Shipping</a>
          </nav>
        </div>

        {/* <!-- Form starts --> */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">

            {/* <!-- Company --> */}
            <div>
              <label for="name" className="block text-sm font-medium text-gray-700">Name *</label>
              <input type="text" onChange={(e) => { setClientName(e.target.value) }} id="company" className="mt-1 block w-full border border-gray-300 focus-visible:outline-none rounded-md p-2 shadow-smsm:text-sm" name="name" required />
            </div>
            {/* <!-- Company --> */}
            <div>
              <label for="company" className="block text-sm font-medium text-gray-700">Company *</label>
              <input type="text" onChange={(e) => { setCompany(e.target.value) }} id="company" className="mt-1 block w-full border border-gray-300 focus-visible:outline-none rounded-md p-2 shadow-sm  sm:text-sm" name="company" required />
            </div>

            {/* <!-- VAT Number --> */}
            <div>
              <label for="vat" className="block text-sm font-medium text-gray-700">VAT Number</label>
              <input type="text" onChange={(e) => { setVatNumber(e.target.value) }} id="vat" className="mt-1 block w-full border border-gray-300 focus-visible:outline-none rounded-md p-2 shadow-sm  sm:text-sm" name="vat" required />
            </div>

            {/* <!-- email --> */}
            <div>
              <label for="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" onChange={(e) => { setEmail(e.target.value) }} id="phone" className="mt-1 block w-full border border-gray-300  rounded-md focus-visible:outline-none p-2 shadow-sm  sm:text-sm" name="email" required />
            </div>

            {/* <!-- Phone --> */}
            <div>
              <label for="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="tel" onChange={(e) => { setPhone(e.target.value) }} id="phone" className="mt-1 block w-full border border-gray-300 focus-visible:outline-none rounded-md p-2 shadow-smsm:text-sm" name="phone" required />
            </div>

            {/* <!-- Website --> */}
            <div>
              <label for="website" className="block text-sm font-medium text-gray-700">Website</label>
              <input type="url" onChange={(e) => { setWebsite(e.target.value) }} id="website" className="mt-1 block w-full border border-gray-300  rounded-md p-2 shadow-sm sm:text-sm focus-visible:outline-none" name="website" required />
            </div>

            {/* <!-- Groups --> */}

            <div className="relative">
              <label for="groups" className="block text-sm font-medium text-gray-700">Groups</label>
              <Select
                closeMenuOnSelect={false}
                isMulti
                onChange={(o) => {
                  const arr = o.map((op) => op.value)
                  setSelectedGroups(arr)
                }}
                options={groups.map((g) => {
                  return { value: g, label: g }
                })}
              />
            </div>

            {/* <!-- Currency and Default Language in one row --> */}
            <div className="flex flex-col justify-between md:flex-row items-center gap-[8px] w-full ">
              {/* <!-- Currency --> */}

              <div className="relative inline-block text-left w-[100%] md:w-[50%] ">
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 ">currency</label>
                <Select
                  name="currency"
                  closeMenuOnSelect={false}
                  isMulti
                  onChange={(o) => {
                    const arr = o.map((op) => op.value)
                    setCurrency(arr)
                  }}
                  options={[{ label: "USD", value: "$" }, { label: "INR", value: "₹" }]}
                  required
                />
              </div>


              {/* <!-- Default Language --> */}
              <div className="w-[100%] md:w-[50%] mt-[22px] ml-0 md:mt-[0]">
                <label for="language" className="block text-sm font-medium text-gray-700">Default Language</label>
                <Select
                  name="language"
                  closeMenuOnSelect={false}
                  isMulti
                  onChange={(o) => {
                    const arr = o.map((op) => op.value)
                    setLanguage(arr)
                  }}
                  options={defaultLanguages.map((op) => {
                    return { label: op, value: op }
                  })}
                  required
                />
              </div>
            </div>

            {/* <!-- Address --> */}
            <div>
              <label for="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" onChange={(e) => { setAddress(e.target.value) }} id="address" className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm sm:text-sm focus-visible:outline-none" name="address" required />
            </div>

            {/* <!-- City --> */}
            <div>
              <label for="city" className="block text-sm font-medium text-gray-700">City</label>
              <input type="text" onChange={(e) => { setCity(e.target.value) }} id="city" className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm sm:text-sm focus-visible:outline-none" name="city" required />
            </div>

            {/* <!-- State --> */}
            <div>
              <label for="state" className="block text-sm font-medium text-gray-700">State</label>
              <input type="text" onChange={(e) => { setState(e.target.value) }} id="state" className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm sm:text-sm focus-visible:outline-none" name="state" required />
            </div>

            {/* <!-- Zip Code --> */}
            <div>
              <label for="zip" className="block text-sm font-medium text-gray-700">Zip Code</label>
              <input type="text" onChange={(e) => { setZipCode(e.target.value) }} id="zip" className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm  sm:text-sm" name="zip" required />
            </div>

            {/* <!-- Country --> */}
            <div>
              <label for="country" className="block text-sm font-medium text-gray-700">Country</label>
              <input type="text" onChange={(e) => { setCountry(e.target.value) }} id="country" className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm sm:text-sm focus-visible:outline-none " name="country" required />
            </div>
          </div>

          {/* <!-- Submit Button --> */}
          <div className="mt-6 w-full   flex p-2 justify-end gap-[10px] ">
          <button onClick={handleCloseForm} className="bg-white text-[#27004a] border border-[#27004a] h-10 w-20 rounded-md">Cancel</button>
            <button type="submit" className=" allcrm-btn1 ">
              Save
            </button>
          </div>
        </form>
        {/* <!-- Form ends --> */}
      </div>

    </div>
  );
}

export default AddNewClient;