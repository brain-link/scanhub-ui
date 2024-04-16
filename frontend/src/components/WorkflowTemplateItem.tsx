// Copyright (C) 2023, BRAIN-LINK UG (haftungsbeschränkt). All Rights Reserved.
// SPDX-License-Identifier: GPL-3.0-only OR LicenseRef-ScanHub-Commercial
// PatientTable.tsx is responsible for rendering the patient table view.
import Typography from '@mui/joy/Typography'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import * as React from 'react'
import { WorkflowOut } from "../generated-client/exam";
import { TemplateItemInterface } from '../interfaces/components.interface'


export default function WorkflowTemplateItem(prop: TemplateItemInterface<WorkflowOut>) {

  return (
    <Card variant="outlined">
        <CardContent>
        <Typography level="title-md">Workflow</Typography>

        <Typography level='body-sm' textColor='text.tertiary'>ID: { prop.item.id }</Typography>
        <Typography level='body-sm' textColor='text.tertiary'>Exam ID: { prop.item.exam_id }</Typography>
        <Typography level='body-sm' textColor='text.tertiary'>Comment: { prop.item.comment }</Typography>
        <Typography level='body-sm' textColor='text.tertiary'>Created: { new Date(prop.item.datetime_created).toDateString() }</Typography>
        <Typography level='body-sm' textColor='text.tertiary'>Updated: { prop.item.datetime_updated ? new Date(prop.item.datetime_updated).toDateString() : '-'}</Typography>

        </CardContent>
    </Card>
  )
}

