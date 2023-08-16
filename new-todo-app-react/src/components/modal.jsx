import React from "react"
import Modal from "react-modal"
import { Button, Flex, Input, Paragraph } from '../Styles'

export function MyModal({isOpen, onRequestClose, children}) {
  if (!isOpen) {
    return null;
  }
  // console.log("Modal todo: " + todo)
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
          // border: '1px solid #EF255A',
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
  // {children}
  )
}

export default MyModal