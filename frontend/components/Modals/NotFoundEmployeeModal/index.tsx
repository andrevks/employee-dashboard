import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import { NotFoundEmployeeModalProps } from './types'

export const NotFoundEmployeeModal = ({
  isOpen,
  onClose,
  onConfirm
}: NotFoundEmployeeModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Funcionário Não Encontrado</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>
          Não foi possível encontrar o funcionário. Deseja criar um novo? 
        </Text>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onConfirm} >
          Criar
        </Button>
        <Button onClick={onClose} variant='ghost'>Voltar</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
)