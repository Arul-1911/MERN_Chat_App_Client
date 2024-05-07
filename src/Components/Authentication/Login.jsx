import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import axios from "axios";
import { backendUrl } from "../../BackendUrl/BackendUrl";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => {
    setShowPass(!showPass);
  };


  const submitHandler = async () => {
    setLoading(true);
    if(!email || !password){
       toast({
         title:"Please fill all the fields..",
         // description: "We've created your account for you.",
         status: "warning",
         duration: 5000,
         isClosable: true,
       });
       setLoading(false)
       return;
    }

    try{
      const config = {
        headers:{
          "Content-type":"application/json"
        }
      };

      const { data } = await axios.post(`${backendUrl}/api/user/login`, {email,password},config);
       toast({
         title:"Login Success",
         // description: "We've created your account for you.",
         status: "success",
         duration: 5000,
         isClosable: true,
       });
       localStorage.setItem('userinfo',JSON.stringify(data))
       setLoading(false)
       navigate('/chats')
    }catch(error){
       toast({
         title: "Error Occured",
         description: error.response.data.message,
         status: "error",
         duration: 5000,
         isClosable: true,
       });
       setLoading(false);
    }

  };

  return (
    <VStack spacing="5px" color="black">

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your Email.."
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
            value={password}
          />
          <InputRightElement width="4.5rem">
            <Button height="1.75rem" size="sm" onClick={handleClick}>
              {showPass ? <VscEye /> : <VscEyeClosed />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: "15px" }}
        onClick={submitHandler}
        isLoading={loading}
      >
       Login
      </Button>

      <Button 
      variant='solid'
      colorScheme="red"
      w='100%'
      onClick={() => {
         setEmail('guest@example.com');
         setpassword('123456')
      }}
      >
         Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
