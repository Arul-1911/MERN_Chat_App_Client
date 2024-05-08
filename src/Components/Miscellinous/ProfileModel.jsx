import { ViewIcon } from "@chakra-ui/icons";
import { Button, Icon, IconButton, Image, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";


//PROFILE MODEL 
const ProfileModel = ({user, children}) => {
   const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      <Modal isOpen={isOpen} onClose={onClose} size='lg' isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader 
          fontSize='40px'
          fontFamily='Work sans'
          display='flex'
          justifyContent='center'
          >{user.userName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody 
          display='flex'
          flexDirection="column"
          alignItems="center"
          >
           <Image borderRadius='full' boxSize="150px" src={user.pic} align={user.userName}/>
           <Text fontSize="28px" marginTop="10px">{user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModel;
