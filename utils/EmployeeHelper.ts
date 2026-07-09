import { Page } from '@playwright/test';
import { AddEmployeePage, EmployeeFormData } from '../pages/AddEmployeePage';
import { NavigationPage } from '../pages/NavigationPage';

export interface CreatedEmployee {
  firstName: string;
  middleName: string;
  lastName: string;
  employeeId: string;
  empNumber: string;
}

export class EmployeeHelper {
  static async createEmployee(page: Page, data: EmployeeFormData): Promise<CreatedEmployee> {
    const navigation = new NavigationPage(page);
    const addEmployeePage = new AddEmployeePage(page);

    await navigation.navigateToAddEmployee();
    const assignedEmployeeId = await addEmployeePage.fillAndSave(data);
    await addEmployeePage.waitForPersonalDetailsPage();

    const url = page.url();
    const empNumberMatch = url.match(/\/empNumber\/(\d+)/);
    const empNumber = empNumberMatch ? empNumberMatch[1] : '';

    return {
      firstName: data.firstName,
      middleName: data.middleName ?? '',
      lastName: data.lastName,
      employeeId: assignedEmployeeId,
      empNumber,
    };
  }

  static generateUniqueEmployeeId(prefix: string = 'EMP'): string {
    const timestamp = Date.now().toString().slice(-6);
    return `${prefix}-${timestamp}`;
  }
}
