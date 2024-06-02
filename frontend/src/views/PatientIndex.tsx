// Copyright (C) 2023, BRAIN-LINK UG (haftungsbeschränkt). All Rights Reserved.
// SPDX-License-Identifier: GPL-3.0-only OR LicenseRef-ScanHub-Commercial
// PatientIndex.tsx is responsible for rendering the patient view. It is the entry point for the patient view.
import AddSharpIcon from '@mui/icons-material/AddSharp'
// import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp'
// import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp'
import Badge from '@mui/joy/Badge'
// Mui Joy
import Box from '@mui/joy/Box'
import IconButton from '@mui/joy/IconButton'
import List from '@mui/joy/List'
import ListDivider from '@mui/joy/ListDivider'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import Accordion from '@mui/joy/Accordion'
import Tooltip from '@mui/joy/Tooltip'
import AccordionDetails from '@mui/joy/AccordionDetails'
import AccordionGroup from '@mui/joy/AccordionGroup'
import AccordionSummary from '@mui/joy/AccordionSummary'
import * as React from 'react'
import { useQuery } from 'react-query'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'

import client from '../client/exam-tree-queries'
import ExamItem from '../components/ExamInstanceItem'
import WorkflowItem from '../components/WorkflowInstanceItem'
import ExamModal from '../components/ExamModal'
import JobList from '../components/JobList'
import ExamInstanceInfo from '../components/ExamInstanceInfo'
import WorkflowInstanceInfo from '../components/WorkflowInstanceInfo'
import ExamFromTemplateButton from '../components/ExamFromTemplateButton'
// Import sub components
import PatientInfo from '../components/PatientInfo'
// Import interfaces, api services and global variables
import { navigation, patientView } from '../utils/size_vars'

import { examApi, patientApi } from '../api'
import { ExamOut } from '../generated-client/exam'
import { PatientOut } from '../generated-client/patient'
import { WorkflowOut } from '../generated-client/exam'

function PatientIndex() {

  const params = useParams()

  // Visibility of side panel containing patient info and exam list
  // const [sidePanelOpen, setSidePanelOpen] = React.useState(true)
  // Modal states for exam
  const [examModalOpen, setExamModalOpen] = React.useState(false)
  // List of jobs
  const [workflows, setWorkflows] = React.useState<WorkflowOut[] | undefined>(undefined)

  // useQuery for caching the fetched data
  const {
    data: patient,
    // refetch: refetchPatient,
    isLoading: patientLoading,
    isError: patientError,
  } = useQuery<PatientOut, Error>({
    queryKey: ['patient', params.patientId],
    queryFn: async () => { return await patientApi.getPatientPatientIdGet(Number(params.patientId)).then((result) => {return result.data})}
  })

  React.useEffect(() => {
    console.log("Patient ID: ", params.patientId)
  }, [params.patientId])

  // Query all exams of the patient
  const {
    data: exams,
    refetch: refetchExams,
    // isLoading: examsLoading,
    // isError: examsError,
  } = useQuery<ExamOut[], Error>({
    queryKey: ['exam', params.patientId],
    queryFn: async () => { return await examApi.getAllPatientExamsApiV1ExamAllPatientIdGet(Number(params.patientId)).then((result) => {return result.data})}
  })

  // This useEffect hook is executed when either exams or params.examId change
  React.useEffect(() => {
    if (params.examId && exams) {
      // Get the selected exam
      const exam = exams.filter((exam) => exam.id === String(params.examId))[0]
      // Set jobs if exam exists
      if (exam) {
        setWorkflows(exam.workflows)
      }
    }
  }, [exams, params.examId])


  return (
    <Stack 
      direction='row' 
      sx={{
        height: `calc(100vh - ${navigation.height})`,
        width: '100%',
        overflow: 'clip'
      }}
    >
      <Box
        sx={{
          // minWidth: sidePanelOpen ? patientView.drawerWidth : 0,
          // width: sidePanelOpen ? patientView.drawerWidth : 0,
          width: patientView.drawerWidth,
          overflow: 'clip',
          bgcolor: 'background.componentBg',
          borderRight: '1px solid',
          borderColor: 'divider',
        }}
      >
        {/* Conditional rendering: Only rendered if patient exists */}
        {patient && <PatientInfo patient={patient} isLoading={patientLoading} isError={patientError} />}

        <ListDivider />

        {/* Exam list header */}
        <Box
          sx={{
            p: 1.5,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            alignItems: 'center',
            overflow: 'scroll'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Typography level='title-md'> Exams </Typography>
            <Badge badgeContent={exams?.length} color='primary' />
          </Box>
        </Box>

        <ListDivider />

        {/* List of exams */}
        <List sx={{ pt: 0 }}>
          {
            exams?.map((exam) => (

              <Tooltip
                placement="right"
                variant="outlined"
                arrow
                title={<ExamInstanceInfo exam={exam} />}
              >

                <Accordion key={`exam-${exam.id}`}>

                  <AccordionSummary>
                    <ExamItem data={exam} refetchParentData={refetchExams} isSelected={false} />
                  </AccordionSummary>

                  <AccordionDetails>
                    {
                      exam.workflows?.map(workflow => (

                        <Tooltip
                          placement="right"
                          variant="outlined"
                          arrow
                          title={<WorkflowInstanceInfo workflow={workflow} />}
                        >

                          <Accordion key={`workflow-${workflow.id}`}>

                            <AccordionSummary>
                              <WorkflowItem data={workflow} refetchParentData={refetchExams} isSelected={false} />
                            </AccordionSummary>

                            <AccordionDetails>
                              <Typography>Task 1</Typography>
                            </AccordionDetails>

                          </Accordion>

                        </Tooltip>

                      ))
                    }

                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', pt: 1 }}>
                      {/* TODO: Workflow from template button */}
                    </Box>

                  </AccordionDetails>
                </Accordion>

              </Tooltip>

            ))
          }

          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', pt: 1 }}>
            <ExamFromTemplateButton onSubmit={() => {refetchExams()}}/>
          </Box>
          
        </List>
      </Box>

      {/* job view controller */}
      <Box sx={{ width: '100%', bgcolor: 'background.componentBg' }}>
        {/* <JobList
          // Implementation of new interface may be required
          data={workflows ? workflows : []}
          refetchParentData={refetchExams}
          isSelected={params.examId ? true : false}
        /> */}
      </Box>

    </Stack>
  )
}

export default PatientIndex
