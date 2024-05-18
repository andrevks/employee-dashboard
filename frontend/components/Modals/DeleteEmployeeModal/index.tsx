import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import { DeleteEmployeeModalProps } from './types'

export const DeleteEmployeeModal = ({
  isOpen,
  onClose,
  onConfirm
}: DeleteEmployeeModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Remover Funcionário</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>
          Tem certeza que deseja remover o funcionário?
        </Text>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='red' mr={3} onClick={onConfirm} >
          Remover
        </Button>
        <Button onClick={onClose} variant='ghost'>cancelar</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
)