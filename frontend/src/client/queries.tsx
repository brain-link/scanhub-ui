import { Patient } from '../interfaces/data.interface';
import { Device } from '../interfaces/data.interface';
import { Workflow } from '../interfaces/data.interface';
import { Exam } from '../interfaces/data.interface';
import { Procedure } from '../interfaces/data.interface';
import { Job } from '../interfaces/data.interface';
import { Record } from '../interfaces/data.interface';

import baseUrls from './urls';

import { ApiService } from './abstract-query-client';


export class PatientApiService extends ApiService<Patient> {
    constructor() {
      super(baseUrls.patientService);
    }
}

export class DeviceApiService extends ApiService<Device> {
    constructor() {
      super(baseUrls.deviceService);
    }
}

export class WorkflowApiService extends ApiService<Workflow> {
    constructor() {
      super(baseUrls.workflowService);
    }
}

export class ExamApiService extends ApiService<Exam> {
    constructor() {
      super(baseUrls.examService);
    }
}

export class ProcedureApiService extends ApiService<Procedure> {
    constructor() {
      super(baseUrls.procedureService);
    }
}
  
export class JobApiService extends ApiService<Job> {
    constructor() {
      super(baseUrls.jobService);
    }
}


const patientService = new PatientApiService();
const workflowService = new WorkflowApiService();
const deviceService = new DeviceApiService();
const examService = new ExamApiService();
const procedureService = new ProcedureApiService();
const jobService = new JobApiService();


// Export all services in one client
export default {
    patientService,
    workflowService,
    deviceService,
    examService,
    procedureService,
    jobService,
}