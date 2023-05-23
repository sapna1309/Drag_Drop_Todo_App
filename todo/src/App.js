import { Box, Button, Flex, Heading, useDisclosure, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, 
  Input} from "@chakra-ui/react";
import { v4 as uuidv4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';
import Column from "./Components/Column";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useEffect, useState } from "react";
import { AddIcon} from "@chakra-ui/icons";


//const unique_id = uuid();
//const small_id = unique_id.slice(0,8)

function App() {
  const [todo,setTodo] = useState("");
  const [tasks, setTasks] = useState([]);
  const [todos,setTodos] = useState([]);
  const [inProgress,setInProgress] = useState([]);
  const [completed,setCompleted] = useState([]);
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(()=>{
    setTodos(tasks.filter((task) => task.status==="todo"));
    setInProgress(tasks.filter((task) => task.status==="inProgress"));
    setCompleted(tasks.filter((task) => task.status==="completed"));
  },[tasks]);

 const statuses = ["todo", "inProgress", "completed"];


  const addTodo = () => {
   let todoObj={
    id:uuidv4(),
    task:todo,
    status:"todo"
   }
   if(todo.length<3) return toast.error("A task must have atleast 3 characters");
    setTasks((prev)=>{
      const list = [...prev,todoObj];
      localStorage.setItem("Tasks",JSON.stringify(list));
      return list
    });
    
    onClose();
    toast.success("Task created successfully!!")
  }
  //console.log("Tasks",tasks);
  //textShadow='2px 1px #E87A01'
 useEffect(()=>{
  setTasks(JSON.parse(localStorage.getItem("Tasks"))||[]);
 },[])

  return (
    <>
   <DndProvider backend={HTML5Backend}>
    <Toaster/>
      <Box bg={"main-bg"} w={"full"} h={"100vh"}>
        <Flex
          justify={"space-between"}
          py={"1rem"}
          w={"full"}
          bg={"column-bg"}
          mb={"1.5rem"}
          shadow={"dark-lg"}
        >
          <Heading
            bgGradient="linear(to-r, #E87A01, #DED1A4)"
            bgClip="text"
            fontWeight="extrabold"
            px={"1rem"}
          >
            Todo App
          </Heading>
          <Button mx={"1rem"}
          bg={"card-bg"}
          // bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
          _hover={{
            bgGradient: 'linear(to-r, #E87A01, #DED1A4)',
          }}
          onClick={onOpen}
          >
            <AddIcon color={"white"} _hover={{color:"#100A0C"}} />
          </Button>
        </Flex>
        <Flex justifyContent={"space-between"} px={"4rem"}>
          {statuses.map((status,index) => {
            return <Column key={index} status={status} tasks={tasks} setTasks={setTasks} todos={todos} inProgress={inProgress} completed={completed} />
          })}
        </Flex>
      </Box>
    </DndProvider>
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color={"card-bg"} >Create New Todo</ModalHeader>
            <ModalCloseButton color={"card-bg"} />
            <ModalBody>
             <Input type="text" placeholder="Todo..." variant={"filled"} _focus={{border:"2px solid #E87A01"}} onChange={(e)=>setTodo(e.target.value)} />
            </ModalBody>
             
            <ModalFooter>
              <Button colorScheme='orange' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='outline' colorScheme="orange" onClick={addTodo} >Create</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </>
  );
}

export default App;
