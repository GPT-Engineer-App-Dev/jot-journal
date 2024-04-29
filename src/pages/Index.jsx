import { useState } from 'react';
import { Box, Button, Flex, Input, Text, VStack, useToast } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addNote = () => {
    if (input.trim() === '') {
      toast({
        title: 'Cannot add empty note',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setNotes([...notes, { id: Date.now(), text: input }]);
    setInput('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const editNote = (id, newText) => {
    setNotes(notes.map(note => note.id === id ? { ...note, text: newText } : note));
  };

  return (
    <VStack spacing={8} p={5}>
      <Flex w="100%" justifyContent="space-between">
        <Input
          placeholder="Add a new note..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          size="lg"
        />
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={addNote}>
          Add
        </Button>
      </Flex>
      <VStack spacing={4} w="100%">
        {notes.map(note => (
          <Flex key={note.id} p={4} w="100%" borderWidth="1px" borderRadius="lg" justifyContent="space-between" alignItems="center">
            <Text>{note.text}</Text>
            <Flex>
              <Button size="sm" leftIcon={<FaEdit />} onClick={() => editNote(note.id, prompt('Edit your note:', note.text))}>
                Edit
              </Button>
              <Button size="sm" leftIcon={<FaTrash />} colorScheme="red" onClick={() => deleteNote(note.id)}>
                Delete
              </Button>
            </Flex>
          </Flex>
        ))}
      </VStack>
    </VStack>
  );
};

export default Index;