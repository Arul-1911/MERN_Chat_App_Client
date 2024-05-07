import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { IoMdSearch } from "react-icons/io";
import { useState } from "react";
import { ChatState } from "../../ContextApi/ChatProvider";
import ProfileModel from "./ProfileModel";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/hooks";
import { backendUrl } from "../../BackendUrl/BackendUrl";
import axios from 'axios';
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadigChat, setLoadingChat] = useState();

  const navigate = useNavigate();
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    //LOGOUT
  const logoutHandler = () => {
    localStorage.removeItem("userinfo");
    navigate("/");
  };

  //SEARCH USER 
  const handleSearch = async () => {
    if(!search){
       toast({
         title: "Please Enter Something in Search",
         status: "error",
         duration: 5000,
         isClosable: true,
         position:'top'
       });
       return;
    }

    try {
      setLoading(true)

      const config = {
        headers:{
          Authorization:`Bearer ${user.token}`,
        },
      }
      const {data} = await axios.get(`${backendUrl}/api/user?search=${search}`, config);
      setLoading(false)
      setSearchResult(data)
    } catch (error) {
     toast({
         title: "Error occured",
         description:"Failed to load the search results",
         status: "error",
         duration: 5000,
         isClosable: true,
         position:'bottom-left'
       });
       return;
    }
  }

  //ACCESSCHAT
  const accesschat = async (userId) => {
    try {
      setLoadingChat(true)

      const config = {
        headers:{
          "Content-type":"application/json",
          Authorization:`Bearer ${user.token}`
        }
      };

      const { data } = await axios.post(`${backendUrl}/api/chat`,{userId}, config);

      if(!chats.find((c) => c._id === data._id)) setChats([data,...chats])

      setSelectedChat(data);
      setLoadingChat(data)
      setLoading(false)
      onClose()

    } catch (error) {
       toast({
         title: "Error occured",
         description: "Failed to fetch the Chat",
         status: "error",
         duration: 5000,
         isClosable: true,
         position: "bottom-left",
       });
       setLoading(false)
       return;
    }
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search User" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <IoMdSearch />
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work sans">
          CollabHub
        </Text>
        <div>
          <Menu>
            <MenuButton p="1">
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            {/* <MenuList>
            </MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.userName}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModel user={user}>
                {/* <MenuItem>My profile</MenuItem> */}
              </ProfileModel>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
              onClick={handleSearch}
              >
                Go
              </Button>
            </Box>
            { loading ? (
              <ChatLoading/> 
            ) : (
               searchResult?.map(user => (
                <UserListItem key={user._id} user={user} handleFunction={() => accesschat(user._id)}/>
               ))
            )}
            {loadigChat&& <Spinner ml="auto" display="flex"/>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
