import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext } from "react";

import { AiOutlinePlus } from "react-icons/ai";
import mainContext from "./MainContext";

export default function AddForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state, setData, handleAddPost } = useContext(mainContext);

  return (
    <>
      <IconButton
        colorScheme="linkedin"
        aria-label="Search database"
        isRound
        size="md"
        color="white"
        pos="fixed"
        bottom="10"
        right={10}
        fontSize="20px"
        icon={<AiOutlinePlus />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Post something</ModalHeader>
          <form onSubmit={(e) => handleAddPost(e, onClose)}>
            <ModalBody>
              <Textarea
                size="lg"
                placeholder="What's on your mind?"
                height="200px"
                value={state.data.content}
                onChange={(e) => setData(`content`, e.target.value)}
                isRequired
              />
            </ModalBody>
            <ModalFooter>
              <Button type="button" colorScheme="red" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button type="submit" variant="ghost" colorScheme="blue">
                POST
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
