import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { jiraService } from "../api/JiraService";
import type { IJiraIssue } from "../interfaces";

interface JiraDataProps {
    invalidIssue: (value: boolean) => void;
    noToken: (value: boolean) => void;
}

export const JiraData: React.FC<JiraDataProps> = ({
    invalidIssue,
    noToken
}) => {
    const [jiraIssueKey, setJiraIssueKey] = useState<string>("");
    const [jiraIssueData, setJiraIssueData] = useState<IJiraIssue | null>(null);
    const accessToken = localStorage.getItem('accessToken');

    const validateIssueKey = (issueKey: string): boolean => {
        if (issueKey.length === 0) {
            invalidIssue(true);
            setTimeout(() => invalidIssue(false), 5000);
            return false;
        }

        const issueKeyPattern = /^[A-Z]{2,4}-\d+$/;
        if (!issueKeyPattern.test(issueKey)) {
            throw new Error('Invalid issue key format. Expected format: XXXX-123');
        }

        fetchJiraIssue(issueKey);
        return true;
    };

    const fetchJiraIssue = async (issueKey: string): Promise<IJiraIssue | false> => {
        if (!accessToken) {
            noToken(true);
            setTimeout(() => noToken(false), 5000);
            return false;
        }
        try {
            const issueData = await jiraService.getJiraIssue(issueKey, accessToken);
            setJiraIssueData(issueData);
            return issueData;
        } catch (error) {
            throw error;
        }
    };
    
    return (
        <>
            {/* Input Section */}
            <section className="flex flex-col sm:flex-row items-stretch gap-3">
                <input
                    type="text"
                    id="jiraIssueInput"
                    value={jiraIssueKey}
                    onChange={(e) => setJiraIssueKey(e.target.value)}
                    placeholder="Jira Issue E.g PIA-30"
                    className="flex-grow px-4 py-2 text-gray-700 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    onClick={async () => {
                        validateIssueKey(jiraIssueKey);
                    }}
                >
                    Fetch Issue
                </button>
            </section>

            {/* Issue Info */}
            <section className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Issue Details</h2>
                <div className="space-y-2">
                    <p className="text-gray-600">
                        <span className="font-semibold text-gray-700">Title: </span>{jiraIssueData?.title}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold text-gray-700">Status: </span>{jiraIssueData?.status}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold text-gray-700">Type: </span>{jiraIssueData?.type}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold text-gray-700">Assignee: </span>{jiraIssueData?.assignee}
                    </p>
                </div>
            </section>

            {/* Description */}
            <section className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Descripción</h3>
                <p className="text-gray-600 leading-relaxed">{jiraIssueData?.description}</p>
            </section>

        </>
    );
}