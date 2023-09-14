// Copyright (C) 2023, BRAIN-LINK UG (haftungsbeschränkt). All Rights Reserved.
// SPDX-License-Identifier: GPL-3.0-only OR LicenseRef-ScanHub-Commercial

// ExamCreateModal.tsx is responsible for rendering the modal for creating a new exam.

import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';


// Import mui joy components
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import Grid from '@mui/joy/Grid';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import IconButton from '@mui/joy/IconButton';
import UploadFileSharpIcon from '@mui/icons-material/UploadFileSharp';

// Import api service and interfaces
import { patientView } from '../utils/size_vars';
import { MRISequence } from '../interfaces/mri-data.interface';
import mriSequenceService from '../client/sequence-api';

function SequenceUpload() {

    const [dialogOpen, setDialogOpen] = React.useState(false);

    const [sequence, setSequence] = React.useState<MRISequence>({
        _id: "", 
        name: "",
        description: "",
        sequence_type: "",
        tags: [],
        file: null,
        file_extension: ".seq"
    })

    const uploadSequence = useMutation( async () => {
        await mriSequenceService.uploadSequenceFile(sequence)
        .catch( (err) => { console.log("Error on sequence upload: ", err) })
        // check if upload was successful
    })

    React.useEffect(() => {
        console.log(sequence)
    }, [sequence.file])

    return (
        <React.Fragment>
            <IconButton 
                variant='soft'
                sx={{ "--IconButton-size": patientView.iconButtonSize }}
                onClick={ () => { setDialogOpen(true) }}
            >
                <UploadFileSharpIcon />
            </IconButton>

            <Modal 
                open={dialogOpen}
                color='neutral'
                onClose={() => setDialogOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <ModalDialog
                    aria-labelledby="basic-modal-dialog-title"
                    aria-describedby="basic-modal-dialog-description"
                    sx={{ width: '50vw', borderRadius: 'md', p: 5 }}
                >
                    <ModalClose
                        sx={{
                            top: '10px',
                            right: '10px',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    <Typography
                        id="basic-modal-dialog-title"
                        component="h2"
                        level="inherit"
                        fontSize="1.25em"
                        mb={3}
                    >
                        Upload sequence
                    </Typography>
                    
                    <Stack spacing={1.5} justifyContent="flex-start">
                        
                        <FormLabel> Name </FormLabel>
                        <Input 
                            name="name"
                            onChange={(e) => setSequence({...sequence, [e.target.name]: e.target.value})} 
                            placeholder="Sequence name"
                            defaultValue={ sequence.name }
                            required 
                        />

                        <FormLabel> Description </FormLabel>
                        <Input 
                            name="description"
                            onChange={(e) => setSequence({...sequence, [e.target.name]: e.target.value})} 
                            placeholder="Sequence description"
                            defaultValue={ sequence.name }
                            required 
                        />

                        <FormLabel> Type </FormLabel>
                        <Input 
                            name="sequence_type"
                            onChange={(e) => setSequence({...sequence, [e.target.name]: e.target.value})} 
                            placeholder="Sequence type"
                            defaultValue={ sequence.sequence_type ? sequence.sequence_type : "" }
                            required 
                        />

                        <Button
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                        >
                            <input 
                                hidden 
                                accept='*.seq' 
                                type="file"
                                onChange={(e) => {e.preventDefault(); setSequence({...sequence, file: e.target.files ? e.target.files[0] : null})}}
                            />
                            Upload sequence
                        </Button>
        
                        <Button 
                            size='sm'
                            sx={{ maxWidth: 120 }}
                            onClick={
                                (event) => {
                                    event.preventDefault();
                                    uploadSequence.mutate();
                                    setDialogOpen(false);
                                }
                            }
                        >
                            Save    
                        </Button>

                    </Stack>
                </ModalDialog>
            </Modal>

        </React.Fragment>
    );  
}

export default SequenceUpload;