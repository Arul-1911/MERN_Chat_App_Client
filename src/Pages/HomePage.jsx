import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from '../Components/Authentication/Login';
import SignUp from '../Components/Authentication/SignUp'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function HomePage() {

  const navigate = useNavigate();

  //IF USER LOGGEDIN ALREADY
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if(user){
      navigate('/chats')
    }
  },[navigate])
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontFamily="Work sans" fontSize="4xl" color="black">
          CollabHub
        </Text>
      </Box>
      <Box p={4} w="100%" borderRadius="lg" bg="white" borderWidth="1px" color='black'>
        <Tabs variant="soft-rounded">
          <TabList mb='1em'>
            <Tab w='50%'>Login</Tab>
            <Tab w='50%'>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* login component */}
              <Login/>
            </TabPanel>
            <TabPanel>
             {/* signup component */}
             <SignUp/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomePage;
