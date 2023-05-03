import * as React from 'react';
import { Outlet, useParams, Link as RouterLink } from 'react-router-dom';
import { useQueryClient, useQuery } from 'react-query';
// MUI
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
// Icons import
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import TuneSharpIcon from '@mui/icons-material/TuneSharp';
import PreviewSharpIcon from '@mui/icons-material/PreviewSharp';
import PlayArrowSharpIcon from '@mui/icons-material/PlayArrowSharp';
// Import sub components
import Exams from '../components/Exams';
import Procedures from '../components/exam-mainview/procedures';
import PatientInfo from '../components/exam-mainview/PatientInfo';
// import PatientPageMainView from './PatientPageMainView';
import ExamViewController from '../components/exam-mainview/ExamViewController';
import config from '../utils/config';

import { Patient } from '../interfaces/data.interface';
import { PatientApiService } from '../client/queries';

import { patientView, navigation } from '../utils/size_vars';


const Main = styled('div', { shouldForwardProp: (prop) => prop !== 'open' }) <{ open?: boolean }>
(
    ({ theme, open }) => (
        {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100%',
            transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: 0,
            ...(open && {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: patientView.drawerWidth     //theme.patientView.drawerWidth
            })
        }
    )
);

function PatientIndex() {

    // pass patient as argument ?

    const patientClient = new PatientApiService()

    // const theme = useTheme();
    // const queryClient = useQueryClient();
    const params = useParams();
    // const recordRef = React.useRef<any>(null);
    const [activeTool, setActiveTool] = React.useState<string | undefined>(undefined);
    const [sidePanelOpen, setSidePanelOpen] = React.useState(true);

    // Set active tool if component is rendered
    if (params.examViewId && params.examViewId.toString() !== activeTool) {
        setActiveTool(params.examViewId.toString())
    }

    // const [patient, setPatient] = React.useState<Patient | undefined>(undefined);

    // async function fetchPatient() {
    //     await client.patients.get(Number(params.patientId)).then((data) => {setPatient(data)})
    // }

    // // fetch patient
    // React.useEffect(() => {
    //     fetchPatient();
    // }, []);

    // useQuery for caching the fetched data
    const { data: patient, isLoading: patientLoading, isError: patientError } = useQuery<Patient, Error>(
        ['patient', params.patientId], 
        () => patientClient.get(Number(params.patientId))
    );


    return (    
        <div id="page-container" style={{ width: '100%', position: 'relative', height: `calc(100vh - ${navigation.height})` }}>
            <Drawer
                sx={{
                    width: patientView.drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: patientView.drawerWidth,
                    }
                }}
                PaperProps={{ style: { position: 'absolute' } }}
                BackdropProps={{ style: { position: 'absolute' } }}
                ModalProps={{
                    container: document.getElementById('page-container'),
                    style: { position: 'absolute' }
                }}
                variant="persistent"
                anchor="left"
                open={sidePanelOpen}
            >
                <Box sx={{ overflow: 'auto', bgcolor: 'background.componentBg' }}>

                    {/* Conditional rendering: Only rendered if patient exists */}
                    { patient && <PatientInfo patient={patient} isLoading={patientLoading} isError={patientError}/> }
                    <Divider />
                    <Exams />

                </Box>
                

            </Drawer>

            <Main open={sidePanelOpen}>
                <Box sx={{ display: 'grid', gridTemplateRows: `${patientView.toolbarHeight} auto`, gridTemplateColumns: '1fr', bgcolor: 'background.componentBg'}}>
                    
                    {/* Toolbar */}
                    <Box sx={{ 
                        p: 1.5,
                        gap: 1,
                        display: 'flex', 
                        flexDirection: 'row', 
                        bgcolor: 'background.componentBg',
                        justifyContent: 'space-between',
                        alignItem: 'center', 
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        top: 0,
                        position: 'sticky',
                    }}>
                        <IconButton
                            id="toggle-mode"
                            size="sm"
                            variant="outlined"
                            color="primary"
                            onClick={() => { setSidePanelOpen(!sidePanelOpen) }}
                        >
                            {/* <MenuIcon /> */}
                            { sidePanelOpen ? <KeyboardArrowLeftSharpIcon /> : <KeyboardArrowRightSharpIcon/> }
                        </IconButton>

                        <Box sx={{ pr: 1.5, gap: 1, display: 'flex', flexDirection: 'row', justifyContent: 'right', width: '100%' }}>

                            {/* Start Record */}
                            <IconButton
                                id="toggle-sequence"
                                size="sm"
                                color="danger"
                                variant="outlined"
                                disabled={!params.procedureId}
                                // onClick={() => {axios.post('http://localhost:8080/api/v1/workflow/control/start/')}}
                            >
                                <PlayArrowSharpIcon />
                            </IconButton>
                            {/* Open sequence handler */}
                            <IconButton
                                id="toggle-sequence"
                                size="sm"
                                variant={activeTool == config.tools.configuration ? "soft" : "outlined"}
                                color="primary"
                                disabled={!params.procedureId}
                                component={RouterLink}
                                to={`${params.procedureId}/${params.procedureId}/${config.tools.configuration}`}
                                onClick={() => setActiveTool('sequence-view')}
                            >
                                <TuneSharpIcon />
                            </IconButton>
                            {/* Open data viewer */}
                            <IconButton
                                id="toggle-dataview"
                                size="sm"
                                variant={activeTool == config.tools.dataview ? "soft" : "outlined"}
                                color="primary"
                                disabled={!params.procedureId}
                                component={RouterLink}
                                to={`${params.procedureId}/${params.procedureId}/${config.tools.dataview}`}
                                onClick={() => setActiveTool('dicom-view')}
                            >
                                <PreviewSharpIcon />
                            </IconButton>
                            
                        </Box>

                        {/* TODO: Insert Breadcrumbs here */}

                    </Box>

                    {/* Main Content */}
                    <Box sx={{ display: 'flex', height: `calc(100vh - ${patientView.toolbarHeight} - ${navigation.height})` }}>
                        <Box sx={{ 
                            overflow: 'auto', 
                            width: patientView.recordsWidth, 
                            bgcolor: 'background.componentBg',
                            borderRight: '1px solid',
                            borderColor: 'divider',
                        }}> 
                            {/* <Outlet context={{ ref: recordRef }} /> */}
                            <Procedures />
                        </Box>

                        <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center', bgcolor: 'background.componentBg' }}>
                            <ExamViewController/>
                        </Box>
                        
                    </Box>
                </Box>
            </Main>
        </div>
    );      
}

export default PatientIndex;