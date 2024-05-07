import { Box } from "@chakra-ui/react";
import { ChatState } from "../ContextApi/ChatProvider";
import SideDrawer from "../Components/Miscellinous/SideDrawer.jsx";
import MyChats from "../Components/MyChats.jsx";
import ChatBox from "../Components/ChatBox.jsx";

const ChatPage = () => {
  const { user } =  ChatState()
  return (
  <div style={{width:"100%"}}>
   {user && <SideDrawer/>}
   <Box 
   display="flex"
   justifyContent='space-between'
   w='100%'
   h='91.5vh'
   p='10px'
   > 
      {user && <MyChats/>}
      {user && <ChatBox/>}
   </Box>
  </div>);
};

export default ChatPage;
