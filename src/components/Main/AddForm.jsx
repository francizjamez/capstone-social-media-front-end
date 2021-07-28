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
import axios from "axios";
import { useContext, useState } from "react";

import { AiOutlinePlus } from "react-icons/ai";
import toasterContext from "../../contexts/ToasterContext";
import useMainStore from "./MainStore";

export default function AddForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState(``);
  const { makeToast } = useContext(toasterContext);
  const toggleReload = useMainStore((state) => state.toggleReload);

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
          <form onSubmit={handleAddPost}>
            <ModalBody>
              <Textarea
                size="lg"
                placeholder="What's on your mind?"
                height="200px"
                value={content}
                onChange={(e) => setContent(e.target.value)}
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

  async function handleAddPost(e) {
    e.preventDefault();
    await axios.post("/post", { content });
    makeToast("Successfully added post");
    setContent(`content`, "");
    toggleReload();
    onClose();
  }
}
