import { useState } from "react";
import { Link } from "react-router-dom";
import { GenieDataContext } from "../context/GenieContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";

const GenieRegister = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { genie, setGenie } = useContext(GenieDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const genieData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        id: vehicleId,
        capacity: vehicleCapacity,
        type: vehicleType,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/genies/register`,
      genieData
    );

    if (response.status === 201) {
      const data = response.data;
      setGenie(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/genie/home");
    }

    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setVehicleColor("");
    setVehicleId("");
    setVehicleCapacity("");
    setVehicleType("");
  };
  return (
    <div className="py-5 px-5 h-screen flex flex-col justify-between">
      <div>
        <h1 className="text-[30px] text-blue-300 font-medium mb-[20px]">
          Genie
        </h1>

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg w-full  font-medium mb-2">Enter name</h3>
          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input
              required
              className="bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>

          <h3 className="text-lg font-medium mb-2">Enter email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>

          <input
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            type="password"
            placeholder="password"
          />

          <h3 className="text-lg font-medium mb-2">
            Enter Vehicle Information
          </h3>
          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Color"
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value);
              }}
            />
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Id (MH12AB1234)"
              value={vehicleId}
              onChange={(e) => {
                setVehicleId(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-4 mb-7">
            <select
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value);
              }}
            >
              <option value="" disabled>
                Capacity
              </option>
              <option value="xs">XS (Light weight couriers)</option>
              <option value="sm">SM (Small size couriers)</option>
              <option value="md">MD (Medium size couriers)</option>
              <option value="lg">LG (Large size couriers)</option>
              <option value="xl">XL (Extra large size couriers)</option>
            </select>
            <select
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value);
              }}
            >
              <option value="" disabled>
                Type
              </option>
              <option value="bicycle">Bicycle</option>
              <option value="bike">Bike</option>
              <option value="rikshaw">Rikshaw</option>
              <option value="car">Car</option>
              <option value="van">Van</option>
              <option value="pickup">Pickup</option>
              <option value="truck">Truck</option>
            </select>
          </div>

          <button className="bg-blue-500 text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
            Create account
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/genie/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight text-justify py-[10px]">
          By creating an account, you acknowledge that you have read and agree
          to abide by our <span className="underline">Terms of Service</span>{" "}
          and <span className="underline">Privacy Policy</span>, which outline
          how we handle your data and your responsibilities as a user.{" "}
        </p>
      </div>
    </div>
  );
};

export default GenieRegister;
