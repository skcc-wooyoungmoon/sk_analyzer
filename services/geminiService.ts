import { GoogleGenAI } from "@google/genai";
import type { AnalysisType } from '../types';
import { ANALYSIS_TYPE_MAP } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const analyzeSystem = async (userInput: string, analyses: AnalysisType[], githubUrl?: string, folderContent?: string): Promise<string> => {
    const selectedAnalysesText = analyses.map(type => `<li><b>${ANALYSIS_TYPE_MAP[type]}</b></li>`).join('');
    
    const escapeHtml = (unsafe: string) => {
        return unsafe
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
    }

    const contextPrompt = `
You are an expert software architect and senior developer tasked with analyzing an existing system.
Your entire response must be in Korean.

Based on the GitHub repository, uploaded folder, and/or the code, file structure, or system description provided, please provide a detailed analysis.
If a GitHub repository URL is provided, please base your analysis on the typical structure and conventions for a project of that nature, in addition to any specific code or description provided.
If folder content is provided, this is the primary source of truth for the analysis.

The user has requested the following specific analyses:
<ul>
${selectedAnalysesText}
</ul>

Please structure your entire response in a single block of well-formatted, beautiful HTML. Use appropriate tags like <h1>, <h2>, <p>, <ul>, <li>, <table>, <pre>, <code>, etc. Do not wrap your response in markdown fences like \`\`\`html. The visual presentation of the report is very important.

For each requested analysis, create a clear section with an <h2> heading. Here are the guidelines for each analysis type:

- <b>폴더 구조 (Folder Structure):</b> 제공된 폴더/파일 구조를 분석합니다. 조직, 강점, 잠재적 약점을 설명하세요.
- <b>시작점 분석 (Entry Points):</b> 애플리케이션의 주요 진입점을 식별하고 설명하세요.
- <b>코딩 표준 (Coding Standards):</b> 관련 언어/프레임워크의 일반적인 모범 사례 및 표준에 대해 코드를 평가하세요.
- <b>CRUD 매트릭스 (CRUD Matrix):</b> 해당되는 경우, HTML <table> 형식으로 CRUD(생성, 읽기, 업데이트, 삭제) 매트릭스를 생성하여 구성 요소/모듈을 데이터 엔터티에 연결하세요.
- <b>호출 구조 (Call Structure):</b> 높은 수준의 호출 계층 또는 구성 요소 상호 작용 흐름을 설명하세요. **추가적으로, Mermaid.js 'graph' 문법을 사용하여 시각적인 순서도를 생성하세요. Mermaid 코드는 반드시 \`<div class="mermaid">\` 태그로 감싸야 합니다. 태그 안에는 Mermaid 그래프 정의(예: 'graph TD; A-->B;')만 포함되어야 하며, 다른 텍스트나 코드 블록 마커는 없어야 합니다. 예시: \`<div class="mermaid">graph TD; A[클라이언트] --> B[API]; B --> C[데이터베이스];</div>\`**. 이렇게 하면 순서도로 렌더링됩니다.
- <b>연관 관계 (Relationships):</b> 시스템의 다른 부분 간의 주요 관계 및 종속성을 설명하세요.
- <b>재귀 분석 (Recursive Analysis):</b> 다단계 계층적 분석을 수행합니다. 시스템의 주요 구성 요소 또는 모듈을 식별하는 것으로 시작하세요. 그런 다음 각 상위 수준 구성 요소에 대해 내부 구조, 핵심 논리 및 다른 구성 요소와의 관계에 대한 자세한 분석을 제공하세요. 이 프로세스는 시스템의 각 부분에 대한 "확대된" 보기를 만들어야 합니다.
- <b>개선 제안 (Improvement Suggestions):</b> 관례에서 벗어난 부분을 나열하고 개선을 위한 구체적이고 실행 가능한 제안을 제공하세요. 필요한 경우 <pre><code>...</code></pre> 태그 안에 수정된 코드 스니펫을 포함하세요.

Your analysis must be thorough, professional, and easy to understand for a Korean-speaking developer.

<hr>
<h3>사용자가 제공한 시스템 정보:</h3>
${githubUrl ? `<p><b>GitHub Repository:</b> <a href="${githubUrl}" target="_blank">${githubUrl}</a></p>` : ''}
${folderContent ? `<p><b>업로드된 폴더 내용:</b></p><pre><code>${escapeHtml(folderContent)}</code></pre>` : ''}
${userInput ? `<p><b>추가 코드/설명:</b></p><pre><code>${escapeHtml(userInput)}</code></pre>` : ''}
${!githubUrl && !folderContent && !userInput ? '<p>추가 코드나 설명이 제공되지 않았습니다.</p>' : ''}
<hr>
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contextPrompt,
        });
        
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get analysis from Gemini API.");
    }
};