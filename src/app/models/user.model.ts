export interface User {
  UserID: number;
  TenantID: number;
  SchoolID: number;
  PersonID: number;
  UserName: string;
  FK_RoleID: number;
  IsActive: boolean;
}

export interface UserListsResponse{
  UserList:User[]
}

export interface UserRole {
  RoleID: number;
  TenantID: number;
  SchoolID: number;
  Role: string;
  RoleDescription: string;
  LoginPage: string;
  IsSystemRole: boolean;
  IsPayroll: boolean;
  IsOTPLogin: boolean;
}

export interface UserRoleResponse {
  UserRoleList: UserRole[];
}

export interface Person {
  PersonID: number;
  TenantID: number;
  SchoolID: number;
  PersonProfile: string;
  StudentID: number;
  StaffID: number;
  VendorID: number;
  ParentID: number;
  EKYC: string;
  DateAdded: string;
  DateModified: string;
  IsActive: boolean;
  UpdatedByUser:string;
  AccountID: number;
}

export interface PersonResponse {
  PersonList: Person[];
}