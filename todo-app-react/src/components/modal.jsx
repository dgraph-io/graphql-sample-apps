import React from "react"
import Modal from "react-modal"
import { Button, Flex, Input, Paragraph } from '../Styles'

export function MyModal({isOpen, onRequestClose, children}) {
  if (!isOpen) {
    return null;
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      appElement={document.getElementById("root")}
      contentLabel="Example Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0 ,0, 0.25)'
        },
        content: {
          background: '#ffffff',
          borderRadius: '20px',
          padding: '20px',
          width: '38%',
          height: '12%',
          margin: '3% auto',
        }
      }}
    >
      <Flex direction="row">
        <Paragraph>Edit your To-Do</Paragraph>
      </Flex>
      <Flex direction="row">
        {children}
      </Flex>
    </Modal>
  )
}

export default MyModal
