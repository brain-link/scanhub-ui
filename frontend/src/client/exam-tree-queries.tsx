// Copyright (C) 2023, BRAIN-LINK UG (haftungsbeschränkt). All Rights Reserved.
// SPDX-License-Identifier: GPL-3.0-only OR LicenseRef-ScanHub-Commercial
// Definition of global variables
import { Patient } from '../interfaces/data.interface'
import { Workflow } from '../interfaces/data.interface'
import { Exam } from '../interfaces/data.interface'
import { Procedure } from '../interfaces/data.interface'
import { Job } from '../interfaces/data.interface'
import { ApiService } from './abstract-query-client'
import baseUrls from './urls'

class PatientApiService extends ApiService<Patient> {
  constructor() {
    super(baseUrls.patientService)
  }
}

class WorkflowApiService extends ApiService<Workflow> {
  constructor() {
    super(baseUrls.workflowService)
  }
}

class ExamApiService extends ApiService<Exam> {
  constructor() {
    super(baseUrls.examService)
  }
}

class ProcedureApiService extends ApiService<Procedure> {
  constructor() {
    super(baseUrls.procedureService)
  }
}

class JobApiService extends ApiService<Job> {
  constructor() {
    super(baseUrls.jobService)
  }
}

const patientService = new PatientApiService()
const workflowService = new WorkflowApiService()
const examService = new ExamApiService()
const procedureService = new ProcedureApiService()
const jobService = new JobApiService()

// Export all services in one client
export default {
  patientService,
  workflowService,
  examService,
  procedureService,
  jobService,
}
