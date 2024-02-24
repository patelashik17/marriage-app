export interface UserDetails {
  husbandDetails: {
    name: string;
    surname: string;
    mobileNumber: number;
  };
  wifeDetails: {
    name: string;
    surname: string;
  };
  applicationStatus: string;
}

export interface userData {
  data: {
    totalUsers: number;
    totalUsersApprove: number;
    totalUsersReject: number;
  };
}

export interface downloadUserData {
  data: string;
  message: string;
  statusCode: number;
  success: boolean;
}

export interface merriage {
  location: string;
  marriageDate: string;
  marriageAddress: string;
}

export interface husband {
  surname: string;
  name: string;
  birthDate: string;
  age: number;
  statusBride: string;
  Religions: string;
  location: string;
  address: string;
  mobile: string;
  email: string;
}

export interface wife {
  surname: string;
  name: string;
  birthDate: string;
  age: number;
  statusBride: string;
  Religions: string;
  location: string;
  address: string;
  wifemobile: string;
  wifeemail: string;
}

export interface husbandGardian {
  surname: string;
  name: string;
  age: number;
  location: string;
  address: string;
  landline: string;
  // mobile: string;
  // email: string;
}

export interface priest {
  name: string;
  birthDate: string;
  age: number;
  location: string;
  address: string;
}

export interface witness {
  name: string;
  birthDate: string;
  age: number;
  address: String;
}

export interface UserAllDetail {
  data: {
    agreementStampStatus: boolean;
    applicationStatus: string;
    approveAppointmentDate: string;
    approveMessage: string;
    approveRequestCertificate: string;
    husbandDetails: {
      address: string;
      age: number;
      dateOfBirth: Date;
      emailId: string;
      guardianDetails: {
        address: string;
        age: number;
        contactNumber: string;
        location: string;
        name: string;
        surname: string;
      };
      location: string;
      mobileNumber: string;
      name: string;
      religious: string;
      statusOfBridegroom: string;
      surname: string;
    };
    husbandPhotoIdProofStatus: boolean | null;
    husbandSchoolLeavingCertificateStatus: boolean | null;
    marriageDetails: {
      applicationDate: Date;
      location: string | null;
      marriageAddress: string;
      marriageDate: Date;
    };
    marriageEvidenceStatus: boolean;
    priestDetails: {
      address: string;
      age: number;
      dateOfBirth: Date;
      location: string;
      name: string;
    };
    priestPhotoIdProofStatus: boolean;
    rejectedMessage: string;
    role: string;
    setPasswordToken: string;
    wifeDetails: {
      address: string;
      age: number;
      dateOfBirth: Date;
      emailId: string;
      guardianDetails: {
        address: string;
        age: number;
        contactNumber: string;
        location: string;
        name: string;
        surname: string;
      };
      location: string;
      mobileNumber: string;
      name: string;
      religious: string;
      statusOfBridegroom: string;
      surname: string;
    };
    wifePhotoIdProofStatus: boolean;
    wifeSchoolLeavingCertificate: string;
    wifeSchoolLeavingCertificateStatus: boolean;
    witnessOneDetails: {
      address: string;
      age: number;
      dateOfBirth: Date;
      name: string;
    };
    witnessOnePhotoProofStatus: boolean;
    witnessTwoDetails: {
      address: string;
      age: number;
      dateOfBirth: Date;
      name: string;
    };
    witnessTwoPhotoProofStatus: boolean;
    __v: number;
    _id: string;
  };
}

export interface checkUserDocument {
  husbandSchoolLeavingCertificateStatus: boolean;
  wifeSchoolLeavingCertificateStatus: boolean;
  witnessOnePhotoProofStatus: boolean;
  witnessTwoPhotoProofStatus: boolean;
  agreementStampStatus: boolean;
  husbandPhotoIdProofStatus: boolean;
  wifePhotoIdProofStatus: boolean;
  priestPhotoIdProofStatus: boolean;
  marriageEvidenceStatus: boolean;
}

export interface userResponse {
  agreementStampStatus: boolean;
  applicationStatus: string;
  approveAppointmentDate: string;
  approveMessage: string;
  approveRequestCertificate: string;
  husbandDetails: {
    address: string;
    age: number;
    dateOfBirth: Date;
    emailId: string;
    guardianDetails: {
      address: string;
      age: number;
      contactNumber: string;
      location: string;
      name: string;
      surname: string;
    };
    location: string;
    mobileNumber: string;
    name: string;
    religious: string;
    statusOfBridegroom: string;
    surname: string;
  };
  husbandPhotoIdProofStatus: boolean | null;
  husbandSchoolLeavingCertificateStatus: boolean | null;
  marriageDetails: {
    applicationDate: Date;
    location: string | null;
    marriageAddress: string;
    marriageDate: Date;
  };
  marriageEvidenceStatus: boolean;
  priestDetails: {
    address: string;
    age: number;
    dateOfBirth: Date;
    location: string;
    name: string;
  };
  priestPhotoIdProofStatus: boolean;
  rejectedMessage: string;
  role: string;
  setPasswordToken: string;
  wifeDetails: {
    address: string;
    age: number;
    dateOfBirth: Date;
    emailId: string;
    guardianDetails: {
      address: string;
      age: number;
      contactNumber: string;
      location: string;
      name: string;
      surname: string;
    };
    location: string;
    mobileNumber: string;
    name: string;
    religious: string;
    statusOfBridegroom: string;
    surname: string;
  };
  wifePhotoIdProofStatus: boolean;
  wifeSchoolLeavingCertificate: string;
  wifeSchoolLeavingCertificateStatus: boolean;
  witnessOneDetails: {
    address: string;
    age: number;
    dateOfBirth: Date;
    name: string;
  };
  witnessOnePhotoProofStatus: boolean;
  witnessTwoDetails: {
    address: string;
    age: number;
    dateOfBirth: Date;
    name: string;
  };
  witnessTwoPhotoProofStatus: boolean;
  __v: number;
  _id: string;
}

export interface PayloadType {
  loginToken: string | null;
  userId?: string;
  fromDate?: string;
  toDate?: string;
}

export interface modalPayload {
  approveAppointmentDate?: string | null;
  approveMessage?: string | null;
  approveRequestCertificate?: string | null;
  loginToken?: string | null;
  userId?: string | null;
  agreementStampStatus?: boolean;
  husbandPhotoIdProofStatus?: boolean;
  husbandSchoolLeavingCertificateStatus?: boolean;
  marriageEvidenceStatus?: boolean;
  priestPhotoIdProofStatus?: boolean;
  rejectedMessage?: string;
  wifePhotoIdProofStatus?: boolean;
  wifeSchoolLeavingCertificateStatus?: boolean;
  witnessOnePhotoProofStatus?: boolean;
  witnessTwoPhotoProofStatus?: boolean;
}

export interface password {
  password: string;
}

export interface loginPayload {
  email: string;
  password: string;
}
