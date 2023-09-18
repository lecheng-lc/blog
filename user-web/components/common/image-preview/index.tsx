import React, { useState } from 'react'
import Carousel, { Modal, ModalGateway } from 'react-images'
const ImagePreView = (props:any) => {
  const {list, showIndex = 0, modalIsOpen,changeModalStatus} = props
  return (
    <ModalGateway>
      {modalIsOpen ? (
        <Modal onClose={changeModalStatus}>
          <Carousel views={list} currentIndex={showIndex} />
        </Modal>
      ) : null}
    </ModalGateway>
  )
}
export default ImagePreView