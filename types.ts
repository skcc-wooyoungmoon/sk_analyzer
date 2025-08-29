
export enum AnalysisType {
  FOLDER_STRUCTURE = 'FOLDER_STRUCTURE',
  ENTRY_POINTS = 'ENTRY_POINTS',
  CODING_STANDARDS = 'CODING_STANDARDS',
  CRUD_MATRIX = 'CRUD_MATRIX',
  CALL_STRUCTURE = 'CALL_STRUCTURE',
  RELATIONSHIPS = 'RELATIONSHIPS',
  RECURSIVE_ANALYSIS = 'RECURSIVE_ANALYSIS',
  SUGGESTIONS = 'SUGGESTIONS',
}

export interface AnalysisOption {
  id: AnalysisType;
  label: string;
  description: string;
}

export interface FileData {
    path: string;
    content: string;
}
