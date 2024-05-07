import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast  } from "@chakra-ui/react";
import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import axios from 'axios'
import { backendUrl } from "../../BackendUrl/BackendUrl";
import {useNavigate} from 'react-router-dom';

const Login = () => {
 const [userName, setUserName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [showPass,setShowPass] = useState(false);
  const [loading,setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate()


  const handleClick = () => {
   setShowPass(!showPass)
  }

  const postDetails = (pics) => {
    setLoading(true);
    if(pics === undefined){
      toast({
        title: "Please Select an Image",
        // description: "We've created your account for you.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if(pics.type === 'image/jpeg' || pics.type === 'image/png'){
      const data = new FormData();
      data.append('file',pics);
      data.append('upload_preset','chat-app');
      data.append("cloud_name", 'dccxetkpg');
      fetch("https://api.cloudinary.com/v1_1/dccxetkpg/image/upload",{
        method:"post",
        body:data
      }).then((res) => res.json())
      .then((data) => {
        setPic(data.url.toString());
        console.log(data.url.toString());
        setLoading(false)
      }).catch((err) => {
        console.log(err);
        setLoading(false)
      })
    } else{
         toast({
           title: "Please Select an Image",
           // description: "We've created your account for you.",
           status: "warning",
           duration: 5000,
           isClosable: true,
         });
         return;
    }
  }

  const submitHandler = async () => {
    setLoading(true);
    if (!userName || !email || !password || !confirmPassword) {
      toast({
        title: "Please Fill All the fields",
        // description: "We've created your account for you.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if(password !== confirmPassword){
      toast({
        title: "Password Does not Match",
        // description: "We've created your account for you.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const config = {
        headers:{
          'content-type':'application/json',
        }
      };

      const { data } = await axios.post(
        `${backendUrl}/api/user`,
        { userName, email, password, pic },
        config
      );
       toast({
         title: "Registration Successful",
         // description: "We've created your account for you.",
         status: "success",
         duration: 5000,
         isClosable: true,
       });
      localStorage.setItem('userinfo',JSON.stringify(data));
      setLoading(false);
      navigate('/chats')

    } catch (error) {
       toast({
         title:"Error Occured",
         description: error.response.data.message,
         status: "error",
         duration: 5000,
         isClosable: true,
       });
      setLoading(false)
    }
  }

  return (
    <VStack spacing="5px" color="black">
      <FormControl id="userName" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your Name.."
          onChange={(e) => setUserName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your Email.."
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button height="1.75rem" size="sm" onClick={handleClick}>
              {showPass ? <VscEye /> : <VscEyeClosed />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Confirm-Password</FormLabel>
        <InputGroup>
          <Input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button height="1.75rem" size="sm" onClick={handleClick}>
              {showPass ? <VscEye /> : <VscEyeClosed />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic" isRequired>
        <FormLabel>Profile-Pic</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: "15px" }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Login;
