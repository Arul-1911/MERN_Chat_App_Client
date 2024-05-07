//LOGIC FOR SINGLE CHAT

export const getSender = (loggedUser, users) => {
   return(
      users[0]._id === loggedUser._id ? users[1].userName : users[0].userName
   )
}