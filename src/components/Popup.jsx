import React  from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions";
import { DialogTitle } from "@material-ui/core";
import { Form } from 'react-final-form';
import Button from "@material-ui/core/Button";




export default function Popup({ title, confirmText, onCreate, visible, onCancel, render, validate}) {

    return (
      <Dialog
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
    );
  };