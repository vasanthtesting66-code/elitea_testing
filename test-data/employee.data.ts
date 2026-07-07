export const employeeData = {
  fullDetailsEmployee: {
    firstName: 'John',
    middleName: 'William',
    lastName: 'Smith',
    employeeId: 'EMP-1001',
    expectedSuccessMessage: 'Successfully Saved',
    expectedRedirectPageTitle: 'Personal Details',
  },
  mandatoryOnlyEmployee: {
    firstName: 'Emily',
    middleName: '',
    lastName: 'Johnson',
    employeeId: 'EMP-1002',
    expectedSuccessMessage: 'Successfully Saved',
    expectedRedirectPageTitle: 'Personal Details',
  },
  maxLengthEmployee: {
    firstName: 'Alexandertonybrown1234567890',
    middleName: '',
    lastName: 'Christophersonwilliamsjohns',
    characterLimitFirstName: 30,
    characterLimitLastName: 30,
  },
  emptyEmployee: {
    firstName: '',
    middleName: '',
    lastName: '',
    employeeId: '',
    expectedValidationMessageFirstName: 'Required',
    expectedValidationMessageLastName: 'Required',
  },
  middleNameOnlyEmployee: {
    firstName: '',
    middleName: 'Marie',
    lastName: '',
    expectedValidationMessageFirstName: 'Required',
    expectedValidationMessageLastName: 'Required',
  },
  searchEmployee: {
    searchFirstName: 'John',
    searchLastName: 'Smith',
    expectedEmployeeId: 'EMP-1001',
    expectedFirstName: 'John',
    expectedMiddleName: 'William',
    expectedLastName: 'Smith',
  },
};

export const pimNavigation = {
  navigationMenu: 'PIM',
  employeeListSubMenu: 'Employee List',
  addEmployeeSubMenu: 'Add Employee',
  expectedAddEmployeeUrl: '/pim/addEmployee',
  expectedEmployeeListUrl: '/pim/viewEmployeeList',
  expectedAddEmployeeHeading: 'Add Employee',
};

export const securityData = {
  protectedUrls: {
    employeeList: '/pim/viewEmployeeList',
    addEmployee: '/pim/addEmployee',
  },
  expectedRedirectUrl: '/auth/login',
};
