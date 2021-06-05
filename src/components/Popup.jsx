import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import { DialogTitle } from '@material-ui/core'
import { Form } from 'react-final-form'

export default function Popup ({ title, confirmText, onCreate, visible, onCancel, render, validate }) {
  return (
    <Dialog
      data-cy={title}
      open={visible}
      onClose={onCancel}
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <Form
          onSubmit={onCreate}
          validate={validate}
          render={render}
        />
      </DialogContent>
    </Dialog>
  )
};
