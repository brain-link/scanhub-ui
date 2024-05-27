// Copyright (C) 2023, BRAIN-LINK UG (haftungsbeschränkt). All Rights Reserved.
// SPDX-License-Identifier: GPL-3.0-only OR LicenseRef-ScanHub-Commercial
// PatientTable.tsx is responsible for rendering the patient table view.
import * as React from 'react'
import Typography from '@mui/joy/Typography'
import Button from '@mui/joy/Button'
import IconButton from '@mui/joy/IconButton';
import AddSharpIcon from '@mui/icons-material/AddSharp'
import ClearIcon from '@mui/icons-material/Clear';
import ModalDialog from '@mui/joy/ModalDialog'
import ModalClose from '@mui/joy/ModalClose'
import Input from '@mui/joy/Input'
import Textarea from '@mui/joy/Textarea'
import FormLabel from '@mui/joy/FormLabel'
import FormControl from '@mui/joy/FormControl'
import Modal from '@mui/joy/Modal'
import Stack from '@mui/joy/Stack'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';


import { useMutation } from 'react-query'
import { BaseTask, TaskOut, TaskType } from "../generated-client/exam";
import { taskApi } from '../api';
import { ModalComponentProps } from '../interfaces/components.interface'


export default function TaskTemplateCreateModal(props: ModalComponentProps<TaskOut>) {

  const [task, setTask] = React.useState<BaseTask>({
    workflow_id: undefined, description: '', type: TaskType.ProcessingTask, status: {}, args: {}, artifacts: {}, destinations: {}, is_template: true, is_frozen: false
  })
  
  // New argument
  const [argKey, setArgKey] = React.useState<string>("")
  const [argVal, setArgVal] = React.useState<string>("")

  // New Destination
  const [destinationKey, setDestinationKey] = React.useState<string>("")
  const [destinationVal, setDestinationVal] = React.useState<string>("")

  // New Artifact
  const [artifactKey, setArtifactKey] = React.useState<string>("")
  const [artifactVal, setArtifactVal] = React.useState<string>("")

  // Post a new exam template and refetch exam table
  const mutation = useMutation(async () => {
    await taskApi.createTaskTemplateApiV1ExamTaskTemplatePost(task).then((response) => { props.onSubmit(response.data) }).catch((err) => { console.log(err) })
  })

  return (
    <Modal
      open={props.isOpen}
      color='neutral'
      onClose={() => props.setOpen(false)}
      sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
    >
      <ModalDialog
        aria-labelledby='basic-modal-dialog-title'
        aria-describedby='basic-modal-dialog-description'
        sx={{ borderRadius: 'md', p: 5 }}
      >
        <ModalClose
          sx={{
            top: '10px',
            right: '10px',
            borderRadius: '50%',
            bgcolor: 'background.body',
          }}
        />

        <Typography id='basic-modal-dialog-title' component='h2' level='inherit' fontSize='1.25em' mb='0.25em'>
          Create New Workflow Template
        </Typography>

        <Stack direction="row" spacing={4}>

          <Stack spacing={1}>

            {/* TODO: Drop-down menu to select exam template */}
            <FormLabel>Workflow ID</FormLabel>
            <Input
              name={'workflow_id'}
              onChange={(e) => setTask({ ...task, [e.target.name]: e.target.value })}
              defaultValue={ task.workflow_id }
              size="sm"
            />

            <FormLabel>Type</FormLabel>
            <Select defaultValue={task.type} placeholder={task.type} size="sm">
              {
                Object.keys(TaskType).map((key) => (
                  <Option key={key} value={key}>
                    { TaskType[key as keyof typeof TaskType] }
                  </Option>
                ))
              }
            </Select>

            <FormLabel>Comment</FormLabel>
            <Textarea 
              minRows={2} 
              name={'description'}
              onChange={(e) => setTask({ ...task, [e.target.name]: e.target.value })}
              defaultValue={ task.description }
            />

          </Stack>

          <Stack spacing={1}>

            <FormLabel>Arguments</FormLabel>

            <Stack direction='row' spacing={1}>

              <FormControl>
                <FormLabel>Key</FormLabel>
                <Input onChange={e => setArgKey(e.target.value)} size="sm"/>
              </FormControl>

              <FormControl>
                <FormLabel>Value</FormLabel>
                <Stack direction='row' spacing={1}>
                  <Input onChange={e => setArgVal(e.target.value)} size="sm"/>
                  <IconButton
                    onClick={() => {
                      setTask({ ...task, args: {...task.args, [argKey]: argVal}})
                    }}
                    size="sm"
                  >
                    <AddSharpIcon />
                  </IconButton>
                </Stack>
              </FormControl>

            </Stack>

            {
              task && Object.entries(task.args).map((arg) => (
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography level='body-sm' textColor='text.tertiary'>{arg[0]}: {arg[1]}</Typography>
                  <IconButton
                    size="sm"
                    onClick={() => {
                      setTask(prevTask => {
                        const tmpArgs = { ...prevTask.args };
                        delete tmpArgs[arg[0]];
                        return { ...prevTask, args: tmpArgs };
                      })
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </Stack>
              ))
            }

          </Stack>

          <Stack spacing={1}>

            <FormLabel>Destinations</FormLabel>

            <Stack direction='row' spacing={1}>

              <FormControl>
                <FormLabel>Key</FormLabel>
                <Input onChange={e => setDestinationKey(e.target.value)} size="sm"/>
              </FormControl>

              <FormControl>
                <FormLabel>Value</FormLabel>
                <Stack direction='row' spacing={1}>
                  <Input onChange={e => setDestinationVal(e.target.value)} size="sm"/>
                  <IconButton
                    onClick={() => {
                      setTask({ ...task, destinations: {...task.destinations, [destinationKey]: destinationVal}})
                    }}
                    size="sm"
                  >
                    <AddSharpIcon />
                  </IconButton>
                </Stack>
              </FormControl>

            </Stack>

            {
              task && Object.entries(task.destinations).map((destination) => (
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography level='body-sm' textColor='text.tertiary'>{destination[0]}: {destination[1]}</Typography>
                  <IconButton
                    size="sm"
                    onClick={() => {
                      setTask(prevTask => {
                        const tmpDestinations = { ...prevTask.destinations };
                        delete tmpDestinations[destination[0]];
                        return { ...prevTask, destinations: tmpDestinations };
                      })
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </Stack>
              ))
            }

          </Stack>


          <Stack spacing={1}>

            <FormLabel>Artifacts</FormLabel>

            <Stack direction='row' spacing={1}>

              <FormControl>
                <FormLabel>Key</FormLabel>
                <Input onChange={e => setArtifactKey(e.target.value)} size="sm"/>
              </FormControl>

              <FormControl>
                <FormLabel>Value</FormLabel>
                <Stack direction='row' spacing={1}>
                  <Input onChange={e => setArtifactVal(e.target.value)} size="sm"/>
                  <IconButton
                    onClick={() => {
                      setTask({ ...task, artifacts: {...task.artifacts, [artifactKey]: artifactVal}})
                    }}
                    size="sm"
                  >
                    <AddSharpIcon />
                  </IconButton>
                </Stack>
              </FormControl>

            </Stack>

            {
              task && Object.entries(task.artifacts).map((artifact) => (
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography level='body-sm' textColor='text.tertiary'>{artifact[0]}: {artifact[1]}</Typography>
                  <IconButton
                    size="sm"
                    onClick={() => {
                      setTask(prevTask => {
                        const tmpArtifacts = { ...prevTask.args };
                        delete tmpArtifacts[artifact[0]];
                        return { ...prevTask, args: tmpArtifacts };
                      })
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </Stack>
              ))
            }

          </Stack>
          
        </Stack>

        <Button
          size='sm'
          sx={{ maxWidth: 120 }}
          onClick={(event) => {
            event.preventDefault()
            mutation.mutate()
            props.setOpen(false)
          }}
        >
          Save
        </Button>

      </ModalDialog>
    </Modal>
  )
}
