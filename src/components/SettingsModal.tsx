import React, { useEffect, useState } from "react";
import { userService } from "../api/userService";
import type { IUserUpdateRequest } from "../interfaces";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [jiraToken, setJiraToken] = useState("");
  const [jiraServerType, setJiraServerType] = useState("cloud");
  const [jiraUrl, setJiraUrl] = useState("");
  const [geminiToken, setGeminiToken] = useState("");

  useEffect(() => {
    userService.getUser().then(user => {
      setJiraToken(user.jiraToken);
      setJiraServerType(user.jiraVersion === 1 ? "cloud" : "server");
      setJiraUrl(user.jiraUrl);
      setGeminiToken(user.geminiToken);
    });
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const userData: IUserUpdateRequest = {
      geminiToken,
      jiraToken,
      jiraUrl,
      jiraVersion: jiraServerType === "cloud" ? 1 : 0,
    };
    userService.updateUser(userData);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-6 pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl cursor-pointer">&times;</button>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div>
            <label htmlFor="jira-api-token" className="block text-sm font-medium text-gray-700">Jira API Token</label>
            <input
              type="password"
              id="jira-api-token"
              value={jiraToken}
              onChange={(e) => setJiraToken(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="jira-server-type" className="block text-sm font-medium text-gray-700">Jira Server Type</label>
            <select
              id="jira-server-type"
              value={jiraServerType}
              onChange={(e) => setJiraServerType(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
            >
              <option>Cloud</option>
              <option>Server</option>
            </select>
          </div>
          <div>
            <label htmlFor="jira-url" className="block text-sm font-medium text-gray-700">Jira URL</label>
            <input
              type="text"
              value={jiraUrl}
              onChange={(e) => setJiraUrl(e.target.value)}
              id="jira-url" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="gemini-api-token" className="block text-sm font-medium text-gray-700">Gemini API Token</label>
            <input
              type="password"
              id="gemini-api-token"
              value={geminiToken}
              onChange={(e) => setGeminiToken(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;