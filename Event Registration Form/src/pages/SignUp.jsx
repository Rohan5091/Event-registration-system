import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../Hellers/axiosinstance";

function SignUp() {
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [isverified,setIsverified] = useState(false);
  let [timer, setTimer] = useState(60);
  const [OTP, setOTP] = useState(0);
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
    otp:""
  });
 
  function handelformdata(e) {
    const { name, value } = e.target;
      setSignUpData({
        ...signUpData,
        [name]: value,
      });
  }
  function GetImage(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      setSignUpData({
        ...signUpData,
        avatar: uploadedImage,
      });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setImage(this.result);
      });
    }
  }

  async function createNewAccount(e) {
    e.preventDefault();
    if (
      !signUpData.fullName ||
      !signUpData.email ||
      !signUpData.password ||
      !signUpData.avatar
    ) {
      toast.error("every field is required");
      return;
    }
    if (!isverified) {
      toast.error("verify your email");
      return;
    }
    if (signUpData.fullName.length < 5) {
      toast.error("name should be atleast 5 charactors");
      return;
    }
    if (
      !signUpData.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      toast.error("please enter a valid email");
      return;
    }
    if (
      !signUpData.password.match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      )
    ) {
      toast.error(
        "password should be 6-16 charactors and it has atleast 1 number and 1 special charactor"
      );
      return;
    }

    const formData = new FormData();
    formData.append("fullName", signUpData.fullName);
    formData.append("email", signUpData.email);
    formData.append("password", signUpData.password);
    formData.append("avatar", signUpData.avatar);

    try {
      const response = await axiosInstance.post("/user/register", formData);
      if (response?.data?.success) {
        navigate("/eventlist");
      }
    } catch (error) {
      if (error?.response?.data?.message == "User is already exist") {
        toast.error(error?.response.data?.message);
        navigate("/login");
      }
    } finally {
      setSignUpData({
        fullName: "",
        email: "",
        password: "",
        avatar: "",
      });
      setImage("");
    }
  }
  
  function verifyOTP(e) {
    
     e.preventDefault();
     if (!signUpData.otp) {
       toast.error("Enter otp")
     }
     else if(OTP==signUpData.otp){
       document.getElementById("timerline").style.display = "none";
       document.getElementById("verifyotp").style.display = "none";
       document.getElementById("resendbtn").style.display = "none";
       document.getElementById("veryfied").style.display = "block";
       document.getElementById("messageforopt").style.display = "none";
       document.getElementById("inputotp").disabled = true;
       setIsverified(true);
     }else{
       toast.error("Please Enter correct otp")
     }
  }
  
  if (isverified) {
    document.getElementById("resendbtn").style.display = "none";
    signUpData.otp="000000";
  }

 
  async function handleemailverification() {
     const otp = Math.floor(Math.random() * 1000000);
     setOTP(otp);
     if (!signUpData.email) {
       toast.error("Enter your email")
       return;
     }
     const formData={
       otp:otp,
       email:signUpData.email
     }
      try {
      const response = await axiosInstance.post("/notify/sendotp",formData);
      } catch (error) {
         console.log(error.message);
      }

   
    document.getElementById("messageforopt").style.display = "block";
    document.getElementById("timerline").style.display = "block";
    document.getElementById("verifyotp").style.display = "block";
    document.getElementById("resendbtn").style.display = "none";
    document.getElementById("verify").style.display = "none";
    document.getElementById("inputotp").disabled = false;

     let time = setInterval(() => {
      setTimer(timer--);
      document.getElementById("second").innerHTML = timer;
      if (timer <= 0) {
        clearInterval(time);
        document.getElementById("timerline").style.display = "none";
        document.getElementById("verifyotp").style.display = "none";
        document.getElementById("resendbtn").style.display = "block";
        document.getElementById("messageforopt").style.display = "none";
        document.getElementById("inputotp").disabled = true;
        setTimer(60);
      }
    }, 1000);
  }

  return (
    <div className="flex items-center  h-screen">
      <div className="">
        <img
          src="https://img.lovepik.com/photo/45009/7683.jpg_wh860.jpg"
          alt="sign up Image"
        />
      </div>
      <form 
        noValidate
        onSubmit={createNewAccount} 
        className="flex p-10 text-black  gap-4  flex-col 
      ">
        <h1 className="text-4xl mx-auto justify-center font-semibold text-blue-500">
            User Registration
        </h1>
        <label
          className=" cursor-pointer text-black mx-auto"
          htmlFor="uoload_image"
        >
          {image ? (
            <img
              src={image}
              className="h-24 w-24 border rounded-full "
              alt="image"
            />
          ) : (
            <BsPersonCircle className="h-24 w-24 text-black" />
          )}
        </label>
        <input
          type="file"
          required
          className="hidden"
          name="uoload_image"
          id="uoload_image"
          accept=".jpeg .jpg .png .svg"
          onChange={GetImage}
        />
        <div className="flex flex-col gap-2">
          <label className="font-bold text-lg" htmlFor="fullName">
            Name :
          </label>
          <input
            type="text"
            id="fullName"
            required
            placeholder="Enter your name...."
            name="fullName"
            className="px-3 py-2 border rounded-md border-black bg-slate-300"
            onChange={handelformdata}
            value={signUpData.fullName}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-lg" htmlFor="email">
            Email :
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="Enter your email...."
            name="email"
            className="px-3 py-2 border rounded-md border-black bg-slate-300"
            onChange={handelformdata}
            value={signUpData.email}
            autoComplete="off"
          />
        </div>
        <div className=" flex flex-col gap-2">
          <label className="font-bold text-lg" htmlFor="password">
            Password :
          </label>
          <input
            type="password"
            required
            placeholder="Enter your password....."
            name="password"
            className="px-3 py-2 border rounded-md border-black bg-slate-300"
            onChange={handelformdata}
            value={signUpData.password}
            autoComplete="off"
          />
        </div>
        <div className=" flex flex-col w-96 gap-2">
          <div className="flex items-center justify-between">
            <span
              onClick={() => handleemailverification()}
              className="text-blue-600  cursor-pointer"
              id="verify"
            >
              verify email
            </span>
            <span 
            id="veryfied"
            className="text-blue-600 hidden cursor-pointer">
              verified
            </span>
          </div>
          <p id="messageforopt" className="hidden">
            Enter One time password OTP send to your registered email address
          </p>
          <input
            type="number"
            id="inputotp"
            required
            disabled
            placeholder="Enter your OTP....."
            name="otp"
            className="px-3 py-2 border rounded-md border-black bg-slate-300"
            onChange={handelformdata}
            value={signUpData.otp}
          />
          <div className=" flex flex-col  items-center">
          <button
            id="verifyotp"
            onClick={verifyOTP}
            type="button"
            className="hidden bg-orange-500 w-fit px-3 border-white mt-3 py-2 text-black font-bold text-lg rounded-md"
          >
            {" "}
            verify otp
          </button>
          <p id="timerline" className="hidden ">
            Wait for <span id="second">60</span> seconds to resend otp
          </p>
          <button
            id="resendbtn"
            onClick={() => handleemailverification()}
            type="button"
            className="hidden bg-orange-500 w-fit px-3 border-white mt-3 py-2 text-black font-bold text-lg rounded-md"
          >
            {" "}
            Resend otp
          </button>
          
          </div>
        </div>
        <input
          className="bg-yellow-500 items-center cursor-pointer border-white mt-3 py-2 text-lg rounded-md text-black font-bold"
          type="submit"
        />
        <p className="">
          If already have a account?{" "}
          <Link className="text-yellow-500 text-lg font-semibold" to={"/login"}>
            login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
