
import type { AnalysisOption } from './types';
import { AnalysisType } from './types';

export const ANALYSIS_OPTIONS: AnalysisOption[] = [
  { id: AnalysisType.FOLDER_STRUCTURE, label: '폴더 구조', description: '프로젝트의 폴더 및 파일 구조를 분석합니다.' },
  { id: AnalysisType.ENTRY_POINTS, label: '시작점 분석', description: '애플리케이션의 주요 진입점을 식별합니다.' },
  { id: AnalysisType.CODING_STANDARDS, label: '코딩 표준', description: '일반적인 코딩 표준 및 관례 준수 여부를 평가합니다.' },
  { id: AnalysisType.CRUD_MATRIX, label: 'CRUD 매트릭스', description: '데이터와 기능 간의 생성/읽기/수정/삭제 관계를 생성합니다.' },
  { id: AnalysisType.CALL_STRUCTURE, label: '호출 구조', description: '컴포넌트 또는 함수 간의 호출 흐름을 분석합니다.' },
  { id: AnalysisType.RELATIONSHIPS, label: '연관 관계', description: '모듈, 데이터, 컴포넌트 간의 핵심 연관 관계를 도식화합니다.' },
  { id: AnalysisType.RECURSIVE_ANALYSIS, label: '재귀 분석', description: '주요 컴포넌트를 식별하고 각각에 대해 심층 분석을 반복적으로 수행합니다.' },
  { id: AnalysisType.SUGGESTIONS, label: '개선 제안', description: '관례에서 벗어난 부분을 찾아 수정 및 개선안을 제안합니다.' },
];

export const ANALYSIS_TYPE_MAP: { [key in AnalysisType]: string } = {
    [AnalysisType.FOLDER_STRUCTURE]: 'Folder Structure Analysis',
    [AnalysisType.ENTRY_POINTS]: 'Entry Point Analysis',
    [AnalysisType.CODING_STANDARDS]: 'Coding Standards Evaluation',
    [AnalysisType.CRUD_MATRIX]: 'CRUD Matrix Generation',
    [AnalysisType.CALL_STRUCTURE]: 'Call Structure Analysis',
    [AnalysisType.RELATIONSHIPS]: 'Relationship and Dependency Analysis',
    [AnalysisType.RECURSIVE_ANALYSIS]: 'Recursive Analysis',
    [AnalysisType.SUGGESTIONS]: 'Improvement Suggestions',
};