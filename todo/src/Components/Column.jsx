import React, { useState } from 'react';
import { Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { toast } from 'react-hot-toast';
import Task from './Task';
import { useDrop } from 'react-dnd';

const Column = ({ status, tasks, setTasks, todos, inProgress, completed }) => {

 const { isOpen, onOpen, onClose } = useDisclosure();
 const [editId,setEditId] = useState("");
 const [editTask,setEditTask] = useState("");

 const [{ isOver }, drop] = useDrop(() => ({
  accept: "task",
  drop: (item) => addItemToSection(item.id),
  collect: (monitor) => ({
    isOver: !!monitor.isOver()
  })
}));

 let title = "TO-DO";
 let taskToMap = todos;

 if(status==="inProgress"){
  title = "IN-PROGRESS";
 taskToMap = inProgress;
 };

 if(status==="completed"){
  title = "COMPLETED";
 taskToMap = completed;
 }

 const addItemToSection = (id) => {
  //console.log("Dropped",id,status);
  setTasks((prev)=>{
    const mTask = prev.map((t)=>{
      if(t.id===id){
        return {...t,status:status}
      }
      return t
    });
    localStorage.setItem("Tasks",JSON.stringify(mTask));
    return mTask;
  })
  toast("Task Status Changed",{icon:"😯"});
 }

 const handleRemove = (id) => {
  let filteredTask = tasks.filter((t)=>t.id!==id);
  localStorage.setItem("Tasks",JSON.stringify(filteredTask));
  setTasks(filteredTask);

  toast("Task Deleted",{icon:"☠️☠️"});
 };

 const handleEdit = () => {
  if(editId!==""){
    setTasks((prev)=>{
      let EditTask = prev.map((t)=>{
        if(t.id===editId){
          return {...t,task:editTask}
        }
        return t;
      });
      localStorage.setItem("Tasks",JSON.stringify(EditTask));
      return EditTask;
    });
    onClose();
    toast("Task Updated",{icon:"🙂"}); 
  };
 };

 const openModal = (id) =>{
   onOpen();
   setEditId(id);
 }

  return (
    <>
    <Stack ref={drop} rounded={"3px"} bg={isOver?"onDropColumn-bg":"column-bg"} w={"400px"} >
    <Flex
      px={"1.5rem"}
      mb={"1.5rem"}
      align={"center"}
      h={"60px"}
      bg={"column-header-bg"}
      rounded={"3px"}
     
    >
      <Text fontSize={"17px"} fontWeight={600} color={"subtle-text"} textShadow='1px 1px #100A0C'>
        {title}
      </Text>
      <Flex bg={"subtle-text"} alignItems={"center"} justifyContent={"center"} rounded={"full"} w={5} h={6} ml={5}><Text color={"black"}>{taskToMap.length}</Text></Flex>
    </Flex>
          <Flex
            px="1.5rem"
            flex={1}
            flexDir="column"
            color={"white-text"} 
          >
            {taskToMap.length>0 && taskToMap.map((task) => (
                  <Task key={task.id} task={task} handleRemove={handleRemove} openModal={openModal} />
               ))}
          </Flex>
        
  </Stack>
  <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color={"card-bg"} >Edit Todo</ModalHeader>
            <ModalCloseButton color={"card-bg"} />
            <ModalBody>
             <Input type="text" placeholder="Edit..." variant={"filled"} _focus={{border:"2px solid #E87A01"}} onChange={(e)=>setEditTask(e.target.value)} />
            </ModalBody>
             
            <ModalFooter>
              <Button colorScheme='orange' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='outline' colorScheme="orange" onClick={handleEdit} >Edit</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
  </>
  )
}

export default Column
