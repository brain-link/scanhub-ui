import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useMutation } from "react-query";

// Mui joy components
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import IconButton from '@mui/joy/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import ContentPasteSharpIcon from '@mui/icons-material/ContentPasteSharp';
import SnippetFolderSharpIcon from '@mui/icons-material/SnippetFolderSharp';

// Interfaces and api service
import { Exam } from '../interfaces/data.interface';
import { ItemComponentProps } from '../interfaces/components.interface';
import { ExamApiService } from '../client/queries';



function ExamItem({data: exam, onDelete, isSelected}: ItemComponentProps<Exam>) {

    const params = useParams();
    const navigate = useNavigate();

    const examClient = new ExamApiService();

    // Context: Delete and edit options, anchor for context location
    const [contextOpen, setContextOpen] = React.useState<number | null>(null);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handleContextClose = () => {
        setAnchorEl(null);
        setContextOpen(null);
    }

    const handleContextOpen = (e, examId) => {
        e.preventDefault();
        setAnchorEl(e.currentTarget);
        setContextOpen(examId);
    }

    const deleteExamById = useMutation( async (id: number) => {
        await examClient.delete(id)
        .then(() => {
            if (Number(params.examId) === id) {
                // Reset router path if this exam id is in the path
                navigate(`/patients/${params.patientId}`)
            }
            onDelete();
        })
    })

    // Debug content of exam.procedure
    // React.useEffect( () => console.log(exam.procedures), [exam]);

    return (
        <ListItem>
            <ListItemButton 
                id="exam-item"
                component={ RouterLink }
                // If examId exists in parameters, we redirect to this exam id, otherwise exam id is appended
                // to={ params.examId ? `../${exam.id}` : String(exam.id)
                to={ `/patients/${params.patientId}/${exam.id}` }
                relative='path'
                selected={ isSelected } 
                variant={(isSelected || exam.id === contextOpen)? "soft" : "plain"}
            >
                <ListItemDecorator sx={{ align: 'center', justify: 'center'}}>
                    <SnippetFolderSharpIcon />
                </ListItemDecorator>

                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%'}}>

                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Typography>{exam.name}</Typography>
                        <IconButton 
                            variant='plain' 
                            sx={{ "--IconButton-size": "25px" }}
                            onClick={ (e) => handleContextOpen(e, exam.id) }
                        >
                            <MoreHorizIcon />
                        </IconButton>
                    </Box>

                    <Typography level="body2" textColor="text.tertiary">{ `Issuer: ${exam.creator}, ${exam.site}`}</Typography>
                    <Typography level="body2" textColor="text.tertiary">{exam.status}</Typography>
                    <Typography level="body2" textColor="text.tertiary">{ `Created: ${new Date(exam.datetime_created).toDateString()}` }</Typography>
                    <Typography level="body2" textColor="text.tertiary">{ `Updated: ${exam.datetime_updated ? new Date(exam.datetime_updated).toDateString() : '-'}` }</Typography>
                
                </Box>

                <Menu   
                    id='context-menu'
                    variant='plain'
                    anchorEl={anchorEl}
                    open={exam.id === contextOpen}
                    onClose={() => handleContextClose()}
                    sx={{ zIndex: 'snackbar' }}
                >
                    <MenuItem key='edit' onClick={() => { console.log('To be implemented...') }}>
                        Edit
                    </MenuItem>
                    <MenuItem key='delete' onClick={() => { deleteExamById.mutate(exam.id) }}>
                        Delete
                    </MenuItem>
                </Menu>
                
            </ListItemButton>   
        </ListItem>
    )
};

export default ExamItem;