import React, { useState } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import SettingsModal from "../components/SettingsModal";
import { JiraData } from "../components/JiraData";


const Main: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAlertInvalidIssue, setShowAlertInvalidIssue] = useState(false);
  const [showAlertNoToken, setShowAlertNoToken] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const alertEmptyJiraIssue = () => {
    return (
      <div className="fade-in-out fixed bottom-4 right-4 p-4 text-sm text-red-800 rounded-lg bg-red-50 bg-gray-100 text-red-400" role="alert">
        <span className="font-medium">Issue de Jira vacia!</span> Por favor, introduce una issue de Jira válida.
      </div>
    )
  }

  const alertNoToken = () => {
    return (
      <div className="fade-in-out fixed bottom-4 right-4 p-4 text-sm text-red-800 rounded-lg bg-red-50 bg-gray-100 text-red-400" role="alert">
        <span className="font-medium">Por favor, recarga la pagina y vuelve a hacer login</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen min-w-[900px] bg-gray-100">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white shadow-md rounded-lg">
          <header className="flex justify-between items-center p-6 border-b border-gray-200">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Jira Test Generator</h1>
            <button
              onClick={openModal}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-label="Settings"
            >
              <Cog6ToothIcon className="h-6 w-6" />
            </button>
          </header>

          <main className="p-6 flex flex-col gap-4">
            <JiraData invalidIssue={setShowAlertInvalidIssue} noToken={setShowAlertNoToken} />

            {/* Test Type Selector */}
            <section className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">⚙️ Generar Tests</h3>
              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <select
                  name="test-type"
                  id="test-type-selector"
                  className="flex-grow px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecciona el tipo de test
                  </option>
                  <option value="api">API</option>
                  <option value="web">Web</option>
                </select>
                <button className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                  Generar
                </button>
              </div>
            </section>

            {/* Generated Tests Section */}
            <section className="space-y-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-gray-800">Título del Test {index + 1}</h4>
                      <p className="text-gray-600"><span className="font-medium text-gray-700">Descripción:</span> Pequeña descripción del caso de uso.</p>
                      <p className="text-gray-600"><span className="font-medium text-gray-700">Resultado Esperado:</span> El sistema debe responder adecuadamente.</p>
                    </div>
                    <div className="flex items-center h-5">
                      <input
                        id={`test-checkbox-${index}`}
                        name="test-checkbox"
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Submit Button */}
            <section className="flex justify-end">
              <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                Enviar
              </button>
            </section>
          </main>
        </div>
      </div>

      {/* Render empty iussue alert */}
      {showAlertInvalidIssue && alertEmptyJiraIssue()}
      {showAlertNoToken && alertNoToken()}

      <SettingsModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Main;