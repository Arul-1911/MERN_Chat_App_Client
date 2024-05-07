import { Avatar, Box, Text } from "@chakra-ui/react"

const UserListItem = ({ user, handleFunction }) => {
 
  return (
    <div>
      <Box 
      onClick={handleFunction}
      cursor="pointer"
      bg='#E8E8E8'
      _hover={{
         background:"#38B2AC",
         color:"white"
      }}
      w='100%'
      display="flex"
      alignItems="center"
      color="black"
      p={3}
      py={2}
      mb={2}
      borderRadius="lg"
      >
         <Avatar 
         mr={2}
         size="sm"
         cursor="pointer"
         name={user.userName}
         src={user.pic}
         />
         <Box>
            <Text>{user.userName}</Text>
            <Text fontSize='xs'><b>Email:</b>{user.email}</Text>
         </Box>
      </Box>
    </div>
  )
}

export default UserListItem