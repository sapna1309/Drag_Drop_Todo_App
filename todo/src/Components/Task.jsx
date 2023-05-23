import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { useDrag } from 'react-dnd'

const Task = ({task, handleRemove, openModal}) => {
 
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: {id:task.id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  //console.log("IsDragged",isDragging);
  return (
    <Flex
    ref={drag}
    key={task.id}
     mb="1rem"
     h="auto"
     bg={isDragging
       ? "column-header-bg"
       : "card-bg"}
     rounded="3px"
     p="1.5rem"
     outline="2px solid"
     justify={"space-between"}
     outlineColor={
       isDragging
         ? "card-border"
         : "transparent"
     }
     boxShadow={
       isDragging
         ? "0 5px 10px rgba(0, 0, 0, 0.6)"
         : "unset"
     }
     
   >
     {/* textShadow='1px 1px #100A0C' */}
     <Text textShadow={isDragging
         ? "1px 1px #100A0C"
         : "1px 0px #DED1A4"} color={isDragging
         ? "subtle-text"
         : "white-text"} >{task.task}</Text>
     <HStack spacing={3}>
       <EditIcon onClick={()=>openModal(task.id)} _hover={{cursor:"pointer"}} color={isDragging
         ? "subtle-text"
         : "white-text"} />
       <DeleteIcon _hover={{cursor:"pointer"}} color={isDragging
         ? "subtle-text"
         : "white-text"} onClick={()=>handleRemove(task.id)} />
     </HStack>
   </Flex>
  )
}

export default Task